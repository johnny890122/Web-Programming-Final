import React from "react";
import Template from "../components/Template";
import Table from "../components/Table";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { TEAM_MEMBER_INIT, IS_MANAGING } from "../graphql";
import { useQuery } from "@apollo/client";

const TeamMember = (props) => {
  const members = useQuery(TEAM_MEMBER_INIT, {
    variables: { teamID: props.nowTeam },
  });
  const isManager = useQuery(IS_MANAGING, {
    variables: { userID: props.me, teamID: props.nowTeam },
  });

  const columnName = ["Name", "Account", "Email", ""];
  const MemberData = [];
  if (!members.loading && !isManager.loading) {
    for (let i = 0; i < members.data.initMember.length; i++) {
      let aMember = [
        members.data.initMember[i].userName,
        members.data.initMember[i].userAccount,
        members.data.initMember[i].userEmail,
        isManager ? (
          <DeleteOutlineOutlinedIcon style={{ color: "red" }} />
        ) : null,
      ];
      MemberData.push(aMember);
    }
  }
  let memberTable = <Table columnName={columnName} data={MemberData} />;

  return (
    <div className="Wrapper">
      <Template content={memberTable} />
    </div>
  );
};

export default TeamMember;
