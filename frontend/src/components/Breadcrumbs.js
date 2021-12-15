import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
import UserDashboard from "../containers/UserDashboard";

const myBreadcrumbs = () => {
  const SimpleBreadcrumbs = () => {
    return (
      <Route>
        {({ location }) => {
          const pathnames = location.pathname.split("/").filter((x) => x);
          return (
            <Breadcrumbs aria-label="Breadcrumb">
              <Link color="inherit" to="/">
                Home
              </Link>
              {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                return last ? (
                  <Typography color="textPrimary" key={to}>
                    {value}
                  </Typography>
                ) : (
                  <Link color="inherit" to={to} key={to}>
                    {value}
                  </Link>
                );
              })}
            </Breadcrumbs>
          );
        }}
      </Route>
    );
  };
  return (
    <div>
      <Routes>
        <SimpleBreadcrumbs />
        <Route path="/user/Dashboard" element={<UserDashboard />} />

        {/* <Route path="/" exact component={Home}></Route>
        <Route path="/level1" exact component={Level1}></Route>
        <Route path="/level1/level2" exact component={Level2}></Route> */}
      </Routes>
    </div>
  );
};

export default myBreadcrumbs;
