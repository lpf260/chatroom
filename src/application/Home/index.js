import React from "react";
import { renderRoutes } from "react-router-config";

import Layout from "../../components/Layout/Layout";

import data from "./data";

function Home(props) {
  const { route } = props;

  return <Layout friendsData={data}>{renderRoutes(route.routes)}</Layout>;
}

export default React.memo(Home);
