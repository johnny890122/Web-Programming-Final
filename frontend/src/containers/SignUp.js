import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import { MeetingRoom } from "@mui/icons-material";
import { TextField, InputLabel } from "@mui/material";
import { NavLink, Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { CREATE_USER } from "../graphql";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import { useQuery, useMutation } from "@apollo/client";
import {
  USER_LOGIN,
  USER_ACHEIEVEMENT_UPDATE,
  USER_ACHEIEVEMENT_INIT,
} from "../graphql";
import bcryptjs from "bcryptjs";

const SignUp = () => {
  const [addAchievement] = useMutation(USER_ACHEIEVEMENT_UPDATE);

  // 後端的訊息
  const [alert, setAlert] = useState(null);

  // 信箱
  const [email, setEmail] = useState("");
  const [emailFormatWrong, setEmailFormatWrong] = useState(false);
  const [emailFormatHelperText, setEmailFormatHelperText] = useState("");

  // 帳號
  const [account, setAccount] = useState("");
  const [accountFormatWrong, setAccountFormatWrong] = useState(false);
  const [accountFormatHelperText, setAccountFormatHelperText] = useState("");

  // 密碼
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordFormatWrong, setPasswordFormatWrong] = useState(false);
  const [passwordCheckIsWrong, setPasswordCheckIsWrong] = useState(false);
  const [passwordFormatHelperText, setPasswordFormatHelperText] = useState("");
  const [passwordCheckIsWrongHelperText, setPasswordCheckIsWrongHelperText] =
    useState("");
  // 顯示 password or not
  const [showPassword, setShowPassword] = useState(false);

  // alert message block
  const [alertVisibility, setAlertVisibility] = useState("none");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [alertMessageBody, setAlertMessageBody] = useState("");

  const bcrypt = require("bcryptjs");
  const salt = bcrypt.genSaltSync(10);

  // 按下繳交
  const submitSignUp = async () => {
    if (
      !emailFormatWrong &&
      !accountFormatWrong &&
      !passwordFormatWrong &&
      !passwordCheckIsWrong &&
      email.length != 0 &&
      account.length != 0 &&
      password.length != 0 &&
      passwordCheck.length != 0
    ) {
      await addUser({
        variables: {
          userAccount: account,
          userPassword: bcrypt.hashSync(password, salt),
          userEmail: email,
        },
      });
    } else {
      setAlertVisibility("inline-block");
      setAlertSeverity("error");
      setAlertMessageBody("請完整填寫正確格式的資訊！");
    }
  };

  function accountIsLatinString(s) {
    var c,
      whietlist =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (c in s) {
      if (!whietlist.includes(s[c])) {
        setAccountFormatHelperText("帳戶名稱須為中英組合");
        setAccountFormatWrong(true);
        return;
      }
    }

    if (s.length <= 6 && s.length != 0) {
      setAccountFormatHelperText("帳戶長度需大於 6 個字元。");
      setAccountFormatWrong(true);
      return;
    } else if (account === password && s.length != 0) {
      setAccountFormatHelperText("帳號不可和密碼相同");
      setAccountFormatWrong(true);
      return;
    }
    setAccountFormatHelperText("");
    setAccountFormatWrong(false);
  }

  function passwordIsLatinString(s) {
    var c,
      whietlist =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (c in s) {
      if (!whietlist.includes(s[c])) {
        setPasswordFormatHelperText("密碼須為中英組合");
        setPasswordFormatWrong(true);
        return;
      }
    }

    if (s.length <= 6 && s.length != 0) {
      setPasswordFormatHelperText("密碼長度需大於 6 個字元。");
      setPasswordFormatWrong(true);
      return;
    } else if (account === password && s.length != 0) {
      setPasswordFormatHelperText("密碼不可和帳號相同");
      setPasswordFormatWrong(true);
      return;
    }
    setPasswordFormatHelperText("");
    setPasswordFormatWrong(false);
  }

  function validatePasswordCheck(s) {
    if (password != passwordCheck) {
      setPasswordCheckIsWrongHelperText("密碼不相符");
      setPasswordCheckIsWrong(true);
      return;
    }
    setPasswordCheckIsWrongHelperText("");
    setPasswordCheckIsWrong(false);
  }

  const checkIfEmailIsWrong = (email) => {
    if (!email) {
      setEmailFormatHelperText("");
      setEmailFormatWrong(false);
      return;
    } else if (
      email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setEmailFormatHelperText("");
      setEmailFormatWrong(false);
      return;
    }

    setEmailFormatWrong(true);
    setEmailFormatHelperText("Email 格式錯誤");
    return;
  };

  const handleClickShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // useEffect
  useEffect(() => {
    checkIfEmailIsWrong(email);
  }, [email]);

  useEffect(() => {
    accountIsLatinString(account);
  }, [account]);

  useEffect(() => {
    passwordIsLatinString(password);
  }, [password]);

  useEffect(() => {
    validatePasswordCheck(passwordCheck);
  }, [passwordCheck]);

  useEffect(() => {
    if (alert) {
      alert.graphQLErrors.map((i) => setAlertMessageBody(i.message));
    }
  }, [alert]);

  // add user
  const [addUser] = useMutation(CREATE_USER, {
    onCompleted: () => {
      setEmail("");
      setAccount("");
      setPassword("");
      setPasswordCheck("");
      setAlertSeverity("success");
      setAlertMessageBody("註冊成功，請回到登入頁面重新登入");
      setAlertVisibility("block");
      setAlert(null);
      console.log("成功");
    },
    onError: (err) => {
      setAlert(err);
      setAlertSeverity("error");
      setAlertVisibility("block");
    },
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ backgroundColor: "#2e4c6d" }}>
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
            Sign Up
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          marginLeft: "2.5rem",
          marginTop: "7rem",
        }}
      >
        <div
          className="main"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            value={email}
            error={emailFormatWrong}
            helperText={emailFormatHelperText}
            onChange={(e) => setEmail(e.target.value)}
            label="信箱"
            color="primary"
            focused
            style={{ margin: "0.75rem", width: "20%" }}
          />
          <TextField
            value={account}
            error={accountFormatWrong}
            helperText={accountFormatHelperText}
            onChange={(e) => setAccount(e.target.value)}
            label="帳號"
            color="primary"
            focused
            style={{ margin: "0.75rem", width: "20%" }}
          />
          <TextField
            value={password}
            type={showPassword ? "text" : "password"}
            error={passwordFormatWrong}
            helperText={passwordFormatHelperText}
            onChange={(e) => setPassword(e.target.value)}
            label="密碼"
            color="primary"
            focused
            style={{ margin: "0.75rem", width: "20%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            value={passwordCheck}
            type={showPassword ? "text" : "password"}
            error={passwordCheckIsWrong}
            helperText={passwordCheckIsWrongHelperText}
            onChange={(e) => setPasswordCheck(e.target.value)}
            label="確認密碼"
            color="primary"
            focused
            style={{ margin: "0.75rem", width: "20%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Alert
            severity={alertSeverity}
            style={{ display: alertVisibility, width: "20%" }}
          >
            <p>{alertMessageBody}</p>
          </Alert>
          <Button
            onClick={submitSignUp}
            variant="contained"
            style={{ margin: "0.75rem", width: "20%" }}
          >
            Sign Up
          </Button>
          <p>
            have an account? <NavLink to="/">log in</NavLink>
          </p>
        </div>
      </Box>
    </Box>
  );
};

export default SignUp;
