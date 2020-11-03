import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../Components/Input";
import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "../Context/UserContext";
import logo from "./In-Quire.png";

class Login extends Component {
  static contextType = UserContext;

  state = {
    account: { email: "", password: "" },
    errors: {},
    userList: {},
    teams: [],
  };

  schema = {
    email: Joi.string().required().label("email"),
    password: Joi.string().required().label("password"),
  };

  async componentDidMount() {
    http.get(config.apiEndpoint + "/user/").then((res) => {
      console.log(res.data);
      this.setState({ userList: res.data });
    });

    http.get(config.apiEndpoint + "/team/").then((res) => {
      this.setState({ teams: res.data });
      console.log(res);
    });
  }

  //used in do submit to send successfully logged in user to quiz
  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };
  /* token do submit 
  doSubmit = async () => {
    try {
      const { account } = this.state;
      const { data } = await login(account.username, account.password);
      localStorage.setItem("token", data.token);
      //this.props.history.push("/quiz");
      window.location = "/quiz";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.account;
        this.setState({ errors });
      }
    }
  }; */

  // do submit from bas
  doSubmit = async () => {
    const { userList, account, teams } = this.state;
    const { history } = this.props;

    for (let x in userList) {
      if (
        account.email === userList[x].email &&
        account.password === userList[x].password
      ) {
        this.context.currentUser.email = userList[x].email;
        this.context.currentUser.teamID = userList[x].team_id;
        this.context.currentUser.isManager = userList[x].manager;
        this.context.currentUser.isMarketing = userList[x].marketing;
        this.context.currentUser.isEngineer = userList[x].engineer;
        this.context.currentUser.isConsultant = userList[x].consultant;

        http
          .post(config.apiEndpoint + "/login/", {
            user_id: userList[x].user_id,
          })
          .then((res) => {
            console.log(res);
          });

        //tracks user log in
        /*
        http
          .post(config.apiEndpoint + "/logintracking/", {
            user_id: userList[x].id,
          })
          .then((res) => {
            console.log(res);
          });      
*/
        for (let x in teams) {
          if (this.context.currentUser.teamID === teams[x].team_id) {
            this.context.currentUser.budget = teams[x].budget;
            this.context.currentUser.round = teams[x].round_num;
            this.context.currentUser.period = teams[x].period_num;

            break;
          }
        }
        toast.success(`Logged in successfully!`);

        await this.sleep(2000);

        history.push("/overview");
      } else {
        toast.error("Email and Password doesn't match");
      }
    }
  };

  render() {
    const { account, errors } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <div align="center">
          <img src={logo} alt="inquire logo" width="320px" height="155px"></img>
        </div>

        <div className="login-body">
          <div className="login-page ">
            <div className="login-css">
              <div className="form">
                <div className="login">
                  <div className="Login Header">
                    <h1>
                      <b>SAS User Login</b>
                    </h1>
                  </div>
                </div>
                <form className="login-form " onSubmit={this.handleSubmit}>
                  <Input
                    className="login-input"
                    name="email"
                    value={account.email}
                    label="Email"
                    onChange={this.handleChange}
                    error={errors.email}
                  />
                  <Input
                    className="login-input"
                    name="password"
                    value={account.password}
                    label="Password"
                    onChange={this.handleChange}
                    error={errors.password}
                  />
                  <button
                    disabled={this.validate()}
                    className="btn btn-primary login-button"
                  >
                    Login
                  </button>
                </form>
              </div>
              <p>
                By clicking login, you agree to InQuire's
                <a
                  //class="list-group-item list-group-item-action"
                  //onClick={this.notRoundOne}
                  href="https://in-quire.com/terms-of-service-sas/"
                >
                  {" "}
                  terms of service.
                </a>
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
