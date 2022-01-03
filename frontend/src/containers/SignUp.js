import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MeetingRoom } from "@mui/icons-material";
import { TextField, InputLabel } from "@mui/material";
import { NavLink } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql";

import { useState } from "react";

const SignUp = ({ setLogin, setNoAccount }) => {
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [addUser] = useMutation(CREATE_USER);

  const submitSignUp = () => {
    // addUser({
    //   variables: {
    //     userAccount: account,
    //     userPassword: password,
    //     userEmail: email,
    //   },
    // });
    setLogin(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#2e4c6d" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LogIn
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        className="content"
        style={{ display: "flex", margin: "5rem 23rem" }}
      >
        <MeetingRoom style={{ fontSize: "20rem", marginTop: "5rem" }} />
        <div
          className="input-container"
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0.5rem 3rem",
          }}
        >
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            label="信箱"
            color="primary"
            focused
            style={{ margin: "0.75rem" }}
          />
          <TextField
            onChange={(e) => setAccount(e.target.value)}
            label="帳號"
            color="primary"
            focused
            style={{ margin: "0.75rem" }}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="密碼"
            color="primary"
            focused
            style={{ margin: "0.75rem" }}
          />
          <TextField
            onChange={(e) => setPasswordCheck(e.target.value)}
            label="確認密碼"
            color="primary"
            focused
            style={{ margin: "0.75rem" }}
          />
          {/* <NavLink to="/user/Dashboard"> */}
          <Button
            onClick={submitSignUp}
            variant="contained"
            style={{ margin: "0.75rem" }}
          >
            Sign Up
          </Button>
          {/* </NavLink> */}

          <NavLink to="/">
            <Button
              variant="contained"
              style={{ margin: "0.75rem" }}
              onClick={() => setNoAccount(false)}
            >
              have an account? log in!
            </Button>
          </NavLink>
        </div>
      </div>
    </Box>
  );
};

export default SignUp;
