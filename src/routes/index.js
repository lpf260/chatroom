import React from "react";
import { Redirect } from "react-router-dom";
import Home from "../application/Home";
import Login from "../application/Login";

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => <Redirect to={"/login"} />,
      },
      {
        path: "/login",
        component: Login,
      },
    ],
  },
];
