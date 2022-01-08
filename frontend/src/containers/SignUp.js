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

import { useState, useEffect } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [addUser] = useMutation(CREATE_USER);

  // 檢查帳號格式是否正確
  const [accountFormatWrong, setAccountFormatWrong] = useState(false);
  const [accountFormatHelperText, setAccountFormatHelperText] = useState("");
  
  function accountIsLatinString(s) {
    var c, whietlist = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for( c in s ) {
      if( !whietlist.includes(s[c]) ) {
        setAccountFormatHelperText("帳戶名稱須為中英組合");
        setAccountFormatWrong(true);
        return
      }
    }

    if (s.length <= 6 & s.length != 0) {
      setAccountFormatHelperText("帳戶長度需大於 6 個字元。")
      setAccountFormatWrong(true);
      return
    }
    else if (account === password & s.length != 0) {
      setAccountFormatHelperText("帳號不可和密碼相同");
      setAccountFormatWrong(true);
      return
    }
    setAccountFormatHelperText("");
    setAccountFormatWrong(false);
  }

  // 檢查密碼格式是否正確
  const [passwordFormatWrong, setPasswordFormatWrong] = useState(false);
  const [passwordFormatHelperText, setPasswordFormatHelperText] = useState("");
  
  function passwordIsLatinString(s) {
    var c, whietlist = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for( c in s ) {
      if( !whietlist.includes(s[c]) ) {
        setPasswordFormatHelperText("密碼須為中英組合");
        setPasswordFormatWrong(true);
        return
      }
    }

    if (s.length <= 6 & s.length != 0) {
      setPasswordFormatHelperText("密碼長度需大於 6 個字元。")
      setPasswordFormatWrong(true);
      return
    }
    else if (account === password & s.length != 0) {
      setPasswordFormatHelperText("密碼不可和帳號相同");
      setPasswordFormatWrong(true);
      return
    }
    setPasswordFormatHelperText("");
    setPasswordFormatWrong(false);
  }

  // 密碼 check 是否正確
  const [passwordCheckIsWrong, setPasswordCheckIsWrong] = useState(false);
  const [passwordCheckIsWrongHelperText, setPasswordCheckIsWrongHelperText] = useState("");
  function validatePasswordCheck(s) {
    if (password != passwordCheck) {
      setPasswordCheckIsWrongHelperText("密碼不相符");
      setPasswordCheckIsWrong(true);
      return
    }
    setPasswordCheckIsWrongHelperText("");
    setPasswordCheckIsWrong(false);
  }

  // 檢查信箱是否格式正確
  const [emailFormatWrong, setEmailFormatWrong] = useState(false);
  const [emailFormatHelperText, setEmailFormatHelperText] = useState("");
  const checkIfEmailIsWrong = (email) => {
    if (!email) { 
      setEmailFormatHelperText("")
      setEmailFormatWrong(false)
      return; 
    }
    
    if (email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) { 
      setEmailFormatHelperText("")
      setEmailFormatWrong(false);
      return
    };

    setEmailFormatWrong(true);
    setEmailFormatHelperText("Email 格式錯誤")
    return;
  };

  useEffect( () => {
    checkIfEmailIsWrong(email); }, [email]);

  useEffect( () => {
    accountIsLatinString(account); 
  }, [account])

  useEffect( () => {
    passwordIsLatinString(password); 
  }, [password])

  useEffect( () => {
    validatePasswordCheck(passwordCheck); 
  }, [passwordCheck])

  const submitSignUp = () => {
    addUser({
      variables: {
        userAccount: account,
        userPassword: password,
        userEmail: email,
      },
    });
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
            error={emailFormatWrong}
            helperText= {emailFormatHelperText}
            onChange={(e) => setEmail(e.target.value)}
            label="信箱"
            color="primary"
            focused
            style={{ margin: "0.75rem" }}
          />
          <TextField
            error = {accountFormatWrong}
            helperText= {accountFormatHelperText}
            onChange={(e) => setAccount(e.target.value)}
            label="帳號"
            color="primary"
            focused
            style={{ margin: "0.75rem" }}
          />
          <TextField
            error = {passwordFormatWrong}
            helperText= {passwordFormatHelperText}
            onChange={(e) => setPassword(e.target.value)}
            label="密碼"
            color="primary"
            focused
            style={{ margin: "0.75rem" }}
          />
          <TextField
            error={passwordCheckIsWrong}
            helperText={passwordCheckIsWrongHelperText}
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
              // onClick={() s=> setNoAccount(false)}
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
