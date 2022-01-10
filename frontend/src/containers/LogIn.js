import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { ExitToApp } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { InputLabel } from "@mui/material";
import { NavLink, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER_LOGIN } from "../graphql";

const LogIn = (props) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [me, setMe] = useState("");
  const ME_KEY = "me";
  const [dataCorrect, setDataCorrect] = useState(false);
  const [login, setLogin] = useState(false);

  const [errorVisibility, setErrorVisibility] = useState("none");
  const [errorSeverity, setErrorSeverity] = useState("");
  const [errorMessageTitle, setErrorMessageTitle] = useState("");
  const [errorMessageBody, setErrorMessageBody] = useState("");

  const { data, error, loading, subscribeToMore } = useQuery(USER_LOGIN, {
    variables: { userAccount: account, userPassword: password },
  });

  const submitLogin = () => {
    if (error === "Error: Account not existed!") {
      localStorage.setItem(ME_KEY, "");
    } else if (dataCorrect) {
    }
    {
      setLogin(true);
      localStorage.setItem(ME_KEY, me);
    }
    setErrorVisibility("block");
  };

  useEffect(() => {
    if (data) {
      setMe(data.userLogin.userID);
      setDataCorrect(true);
    }
  });

  useEffect(() => {
    setErrorVisibility("none");
  }, [account, password]);

  const errorBlock = error
    ? error.graphQLErrors.map((i) => (
        <Alert
          severity="error"
          style={{ display: errorVisibility, width: "20%" }}
        >
          {i.message}
        </Alert>
      ))
    : [];

  return (
    <Box sx={{ display: "flex" }}>
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
            LogIn
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
          marginTop: "10rem",
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
            onChange={(e) => setAccount(e.target.value)}
            label="帳號"
            color="primary"
            focused
            style={{ margin: "0.75rem", width: "20%" }}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="密碼"
            color="primary"
            focused
            style={{ margin: "0.75rem", width: "20%" }}
          />

          {errorBlock}
          <Link
            to={
              dataCorrect
                ? data.userLogin.userBirthday
                  ? "/user/Dashboard"
                  : "/user/Settings"
                : "/"
            }
            state={{ me: localStorage.getItem(ME_KEY) }}
            style={{ width: "20%" }}
          >
            <Button
              onClick={submitLogin}
              variant="contained"
              style={{ margin: "0.75rem 0", width: "100%" }}
            >
              Log In
            </Button>
          </Link>
          <p>
            no account? <NavLink to="/SignUp">sign up</NavLink>
          </p>
        </div>
      </Box>
    </Box>
  );
};

export default LogIn;
