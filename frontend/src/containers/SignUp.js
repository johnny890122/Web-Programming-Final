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
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';

const SignUp = () => {
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
  const [passwordCheckIsWrongHelperText, setPasswordCheckIsWrongHelperText] = useState("");
  // 顯示 password or not 
  const [showPassword, setShowPassword] = useState(false);

  // alert message block
  const [alertVisibility, setAlertVisibility] = useState("none");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [alertMessageBody, setAlertMessageBody] = useState("");

  // 按下繳交
  const submitSignUp = async () => {
    if (!emailFormatWrong & !accountFormatWrong & !passwordFormatWrong & !passwordCheckIsWrong & 
        email.length != 0 & account.length != 0 & password.length!=0 & passwordCheck.length != 0 
    ) { 
      await addUser({ variables: { userAccount: account, userPassword: password,userEmail: email }, })
    } else {
      setAlertVisibility("block");
      setAlertSeverity("error");
      setAlertMessageBody("有資訊未填！");
    }
  };

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

  function validatePasswordCheck(s) {
    if (password != passwordCheck) {
      setPasswordCheckIsWrongHelperText("密碼不相符");
      setPasswordCheckIsWrong(true);
      return
    }
    setPasswordCheckIsWrongHelperText("");
    setPasswordCheckIsWrong(false);
  }

  const checkIfEmailIsWrong = (email) => {
    if (!email) { 
      setEmailFormatHelperText("")
      setEmailFormatWrong(false)
      return; 
    }
    
    else if (email.match(
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

  const handleClickShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // useEffect 
  useEffect( () => {
    checkIfEmailIsWrong(email); 
  }, [email]);

  useEffect( () => {
    accountIsLatinString(account); 
  }, [account]);

  useEffect( () => {
    passwordIsLatinString(password); 
  }, [password]);

  useEffect( () => {
    validatePasswordCheck(passwordCheck); 
  }, [passwordCheck]);

  useEffect( () => {
    if (alert) {
      alert.graphQLErrors.map( i=> setAlertMessageBody(i.message));
    }
  }, [alert]);


  // add user 
  const [addUser] = useMutation(CREATE_USER, {
    onCompleted: () => {
      setEmail("") 
      setAccount("") 
      setPassword("") 
      setPasswordCheck("") 
      setAlertSeverity("success") 
      setAlertMessageBody("註冊成功") 
      setAlertVisibility("block")
      setAlert(null);
      console.log("成功")
    },
    onError: (err) => {
      setAlert(err) 
      setAlertSeverity("error") 
      setAlertVisibility("block") 
    }
  });


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
            value={email}
            error={emailFormatWrong}
            helperText= {emailFormatHelperText}
            onChange={(e) => setEmail(e.target.value)}
            label="信箱"
            color="primary"
            focused
            style={{ margin: "0.75rem" }}
          />
          <TextField
            value={account}
            error = {accountFormatWrong}
            helperText= {accountFormatHelperText}
            onChange={(e) => setAccount(e.target.value)}
            label="帳號"
            color="primary"
            focused
            style={{ margin: "0.75rem" }}
          />
          <TextField
            value={password}
            type={showPassword ? 'text' : 'password' }
            error = {passwordFormatWrong}
            helperText= {passwordFormatHelperText}
            onChange={(e) => setPassword(e.target.value)}
            label="密碼"
            color="primary"
            focused
            style={{ margin: "0.75rem" }}
            InputProps={{
              endAdornment: 
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
            }}
          />

          <TextField
            value={passwordCheck}
            type={showPassword ? 'text' : 'password' }
            error={passwordCheckIsWrong}
            helperText={passwordCheckIsWrongHelperText}
            onChange={(e) => setPasswordCheck(e.target.value)}
            label="確認密碼"
            color="primary"
            focused
            style={{ margin: "0.75rem" }}
            InputProps={{
              endAdornment: 
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
            }}
          />

          <Button
            onClick={submitSignUp}
            variant="contained"
            style={{ margin: "0.75rem" }}
          >
            Sign Up
          </Button>

          <NavLink to="/">

            <Alert severity={alertSeverity} style={{ display : alertVisibility }}>
              {alertMessageBody}
            </Alert>

            <Button
              variant="contained"
              style={{ margin: "0.75rem" }}
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
