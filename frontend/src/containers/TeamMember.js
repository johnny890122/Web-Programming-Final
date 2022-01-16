import React from "react";
import Template from "../components/Template";
import Table from "../components/Table";
import { Button, Typography, TextField } from "@mui/material";
import { Modal } from "antd";
import Alert from "@mui/material/Alert";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  TEAM_MEMBER_INIT,
  TEAM_THIS_INIT,
  DELETE_TEAM_MEMBER,
  ADD_TEAM_MEMBER,
} from "../graphql";
import { useQuery, useMutation } from "@apollo/client";

const TeamMember = (props) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [createModalVisible, setCreateModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);
  const [IDToBeDeleted, setIDToBeDeleted] = React.useState("");
  const [inviteAccount, setInviteAccount] = React.useState("");
  const [alertVisibility, setAlertVisibility] = React.useState("none");
  const [alertSeverity, setAlertSeverity] = React.useState("error");
  const [alertMessageBody, setAlertMessageBody] = React.useState("");

  const handleClose = () => {
    setIsModalVisible(false);
  };
  const members = useQuery(TEAM_MEMBER_INIT, {
    variables: { teamID: props.nowTeam },
  });
  const teamDetails = useQuery(TEAM_THIS_INIT, {
    variables: { teamID: props.nowTeam },
  });
  const [isManager, setIsManager] = React.useState(false);
  React.useEffect(() => {
    if (!teamDetails.loading) {
      if (props.me === teamDetails.data.team.teamManager[0].userID)
        setIsManager(true);
    }
  }, [teamDetails.loading]);

  const [deleteMember] = useMutation(DELETE_TEAM_MEMBER, {
    refetchQueries: [TEAM_MEMBER_INIT, "initTeamMember"],
  });
  const submitDelete = async () => {
    await deleteMember({
      variables: {
        teamID: props.nowTeam,
        memberID: IDToBeDeleted,
      },
    });
    setIsModalVisible(false);
  };
  const [addMember, { data, loading, error }] = useMutation(ADD_TEAM_MEMBER, {
    refetchQueries: [TEAM_MEMBER_INIT, "initTeamMember"],
  });
  const submitInvite = async () => {
    try {
      await addMember({
        variables: {
          teamID: props.nowTeam,
          memberAccount: inviteAccount,
        },
      });
      setCreateModalVisible(false);
    } catch (e) {
      setAlertMessageBody("Account not exists.");
      setAlertSeverity("error");
      setAlertVisibility("inline-block");
    }
  };

  const columnName = ["Name", "Account", "Email", "Role", ""];
  const MemberData = [];
  if (!members.loading && !teamDetails.loading) {
    for (let i = 0; i < members.data.initMember.length; i++) {
      let aMember = [
        members.data.initMember[i].userName,
        members.data.initMember[i].userAccount,
        members.data.initMember[i].userEmail,
        teamDetails.data.team.teamManager[0].userID ===
        members.data.initMember[i].userID
          ? "manager"
          : "member",
        isManager &&
        members.data.initMember[i].userID !==
          teamDetails.data.team.teamManager[0].userID ? (
          <DeleteOutlineOutlinedIcon
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              setIsModalVisible(true);
              setModalContent(members.data.initMember[i].userAccount);
              setIDToBeDeleted(members.data.initMember[i].userID);
            }}
          />
        ) : null,
      ];
      MemberData.push(aMember);
    }
  }

  let memberContent = (
    <div>
      <Table columnName={columnName} data={MemberData} />
      {isManager ? (
        <div className="icon-container" style={{ marginTop: "1.5rem" }}>
          <Button
            variant="outlined"
            color="success"
            onClick={() => setCreateModalVisible(true)}
          >
            Add Member
          </Button>
        </div>
      ) : null}
      <Modal
        title="Remove Member"
        visible={isModalVisible}
        onCancel={handleClose}
        style={{ zIndex: 1200 }}
        footer={[
          <Button
            key="ok"
            variant="contained"
            color="error"
            onClick={submitDelete}
            style={{ margin: "0 0.5rem" }}
          >
            Remove
          </Button>,
          <Button
            key="close"
            variant="contained"
            onClick={handleClose}
            style={{ margin: "0 0.5rem" }}
          >
            Cancel
          </Button>,
        ]}
      >
        <Typography>
          Are you sure to remove user <b>{modalContent}</b>?
        </Typography>
      </Modal>
      <Modal
        title="Add Member"
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={[
          <Button
            key="ok"
            variant="contained"
            color="success"
            onClick={submitInvite}
            style={{ margin: "0 0.5rem" }}
          >
            Add
          </Button>,
          <Button
            key="close"
            variant="contained"
            onClick={() => setCreateModalVisible(false)}
            style={{ margin: "0 0.5rem" }}
          >
            Cancel
          </Button>,
        ]}
      >
        <div>
          <div className="container" style={{ display: "flex" }}>
            <TextField
              id="invite-account"
              value={inviteAccount}
              label="Invite Account"
              onChange={(e) => setInviteAccount(e.target.value)}
            />
            <Alert
              severity={alertSeverity}
              style={{
                display: alertVisibility,
                marginLeft: "1rem",
                width: "70%",
              }}
            >
              <p>{alertMessageBody}</p>
            </Alert>
          </div>
        </div>
      </Modal>
    </div>
  );

  return (
    <div className="Wrapper">
      <Template content={memberContent} />
    </div>
  );
};

export default TeamMember;
