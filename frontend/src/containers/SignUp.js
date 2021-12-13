import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MeetingRoom } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { InputLabel } from "@mui/material";
import { NavLink } from "react-router-dom";

const SignUp = () => {
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
            label="信箱"
            color="primary"
            focused
            style={{ margin: "0.75rem" }}
          />
          <TextField
            label="帳號"
            color="primary"
            focused
            style={{ margin: "0.75rem" }}
          />
          <TextField
            label="密碼"
            color="primary"
            focused
            style={{ margin: "0.75rem" }}
          />
          <TextField
            label="確認密碼"
            color="primary"
            focused
            style={{ margin: "0.75rem" }}
          />
          <NavLink to="/Dashboard">
            <Button variant="contained" style={{ margin: "0.75rem" }}>
              Sign Up
            </Button>
          </NavLink>
          <NavLink to="/">
            <Button variant="contained" style={{ margin: "0.75rem" }}>
              have an account? log in!
            </Button>
          </NavLink>
        </div>
      </div>
    </Box>
  );
};

export default SignUp;
