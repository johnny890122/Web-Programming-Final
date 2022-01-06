import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
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

  const [login, setLogin] = useState(false)

  const { data, error, loading, subscribeToMore } = useQuery(USER_LOGIN, {
    variables: { userAccount: account, userPassword: password },
  });

  const submitLogin = () => {
    if (error === "Error: Account not existed!") {
        localStorage.setItem(ME_KEY, "");
        console.log(error);
    }
    else if (dataCorrect) {} {
        setLogin(true);
        localStorage.setItem(ME_KEY, me);
    }
  };

  useEffect(() => {
    if (data) {
      setMe(data.userLogin.userID)
      setDataCorrect(true);
    }
  })


  // console.log(localStorage.getItem(ME_KEY));

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
        style={{ display: "flex", margin: "10rem 23rem" }}
      >
        <ExitToApp style={{ fontSize: "20rem" }} />
        <div
          className="input-container"
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0.5rem 3rem",
          }}
        >
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

          <Link 
            to={ dataCorrect ? "/user/Dashboard" : "/"}
            state= {{ me: localStorage.getItem(ME_KEY) }}
          >
            <Button
              onClick={submitLogin}
              variant="contained"
              style={{ margin: "0.75rem" }}
            >
              Log In
            </Button>
          </Link>

          <NavLink to= {{ pathname: "/SignUp" }}>
            <Button
              variant="contained"
              style={{ margin: "0.75rem" }}
            >
              No account? Sign up right now!
            </Button>
          </NavLink>
        </div>
      </div>
    </Box>
  );
};

export default LogIn;
