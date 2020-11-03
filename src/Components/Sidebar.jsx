import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "./In-Quire.png";

import Icon from "@material-ui/core/Icon";
import {
  Dashboard,
  LocationOnOutlined,
  StarRounded,
  MailOutline,
  CloudDownloadOutlined,
  AttachMoneyOutlined,
  CheckBoxOutlined,
} from "@material-ui/icons";

const sideBar = ({ activePage, onFinishPeriod }) => {
  return (
    <React.Fragment>
      <ToastContainer />
      <div id="sidebar-wrapper" className="box-shadow bg-white">
        <div class="sidebar-heading">
          <img src={logo} alt="inquire logo" width="120px" height="55px"></img>
        </div>
        <center>
          <div class="sidebar-items">
            <Link
              class={`sidebar-item ${
                activePage === "overview" ? "active" : ""
              }`}
              to="/overview"
            >
              <Dashboard />
              <p>Overview</p>
            </Link>
            <Link
              class={`sidebar-item ${activePage === "map" ? "active" : ""}`}
              //class="sidebar-item"
              to="/map"
            >
              <LocationOnOutlined fontSize="large" />
              <p>Map</p>
            </Link>
            <Link
              class={`sidebar-item ${activePage === "rides" ? "active" : ""}`}
              to="/buyRide"
            >
              <Icon className="fa fa-fort-awesome" />
              <p>Rides</p>
            </Link>
            <Link
              class={`sidebar-item ${activePage === "tickets" ? "active" : ""}`}
              to="/tickets"
            >
              <StarRounded fontSize="large" />
              <p>Tickets</p>
            </Link>
            <Link
              class={`sidebar-item ${
                activePage === "messages" ? "active" : ""
              }`}
              to="/messages"
            >
              <MailOutline fontSize="large" />
              <p>Messages</p>
            </Link>
            <Link
              class={`sidebar-item ${activePage === "inbox" ? "active" : ""}`}
              to="/inbox"
            >
              <Icon className="fa fa-inbox" fontSize="large" />
              <p>Inbox</p>
            </Link>
            <Link
              class={`sidebar-item ${activePage === "buydata" ? "active" : ""}`}
              to="/buydata"
            >
              <CloudDownloadOutlined fontSize="large" />
              <p>Buy Data</p>
            </Link>
            <Link
              class={`sidebar-item ${
                activePage === "features" ? "active" : ""
              }`}
              to="/features"
            >
              <AttachMoneyOutlined fontSize="large" />
              <p>Features</p>
            </Link>
            <Link
              class={`sidebar-item ${
                activePage === "finances" ? "active" : ""
              }`}
              to="/finances"
            >
              <Icon className="fa fa-calculator" />
              <p>Finances</p>
            </Link>
            <Link
              class={`sidebar-item ${activePage === "finish" ? "active" : ""}`}
              onClick={onFinishPeriod}
            >
              <CheckBoxOutlined fontSize="large" />
              <p>Finish Period</p>
            </Link>
          </div>
        </center>
      </div>
    </React.Fragment>
  );
};
export default sideBar;
