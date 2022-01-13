import React from "react";
import { Typography } from "@mui/material";
import { Input, DatePicker, Tag, Avatar } from "antd";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import moment from "moment";
import { USER_ACCOUNT } from "../graphql";
import { useQuery } from "@apollo/client";

const UserSettings = (props) => {
  const dateFormat = "YYYY/MM/DD";
  const [userName, setUserName] = React.useState("");

  const { data, error, loading, subscribeToMore } = useQuery(USER_ACCOUNT, {
    variables: { userID: props.me },
  });

  return (
    <Box sx={{ display: "flex" }}>
      <MuiAppBar position="fixed" style={{ backgroundColor: "#2e4c6d" }}>
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
            Settings
          </Typography>
        </Toolbar>
      </MuiAppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          marginTop: "13rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="title-block">
          <Typography variant="h5">協助完成更多設定</Typography>
        </div>
        <br />
        <div
          className="main"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "2rem",
          }}
        >
          <div className="container" style={{ display: "flex" }}>
            <Avatar
              size={150}
              src="https://live.staticflickr.com/65535/51540870993_055876bd65_k.jpg"
            />
            <div className="text-block" style={{ marginLeft: "2rem" }}>
              <div className="row" style={{ display: "flex" }}>
                <Tag color="geekblue">
                  <Typography>Account</Typography>
                </Tag>
                <Input
                  disabled={true}
                  value={!loading ? data.myUserAccount.userAccount : ""}
                  style={{ width: "70%" }}
                  size="small"
                />
              </div>
              <br />
              <div className="row" style={{ display: "flex" }}>
                <Tag color="geekblue">
                  <Typography>Email</Typography>
                </Tag>
                <Input
                  disabled={true}
                  value={!loading ? data.myUserAccount.userEmail : ""}
                  style={{ width: "76%" }}
                  size="small"
                />
              </div>
              <br />
              <div className="row" style={{ display: "flex" }}>
                <Tag color="geekblue">
                  <Typography>Display Name</Typography>
                </Tag>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{ width: "58%" }}
                  size="small"
                />
              </div>
              <br />
              <div className="row" style={{ display: "flex" }}>
                <Tag color="geekblue">
                  <Typography>Birthday</Typography>
                </Tag>
                <DatePicker
                  addonBefore="Birthday"
                  format={dateFormat}
                  style={{ width: "70%" }}
                  size="small"
                />
              </div>
            </div>
          </div>
          <Link to="/user/Dashboard" style={{ width: "10%" }}>
            <Button
              variant="contained"
              style={{ marginTop: "2rem", width: "7rem" }}
            >
              Complete
            </Button>
          </Link>
        </div>
      </Box>
    </Box>
  );
};

export default UserSettings;
