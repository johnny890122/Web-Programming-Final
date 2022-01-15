import React from "react";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Template from "../components/Template";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, Typography } from "@mui/material";
import { Row, Col, Modal, Form, Input, Button, Space, InputNumber, Select } from 'antd';
import ContestSetDetail from "../components/ContestSetDetail";
import CreateSetForm from "../components/CreateSetForm";
import UpdateSetForm from "../components/UpdateSetForm";
import { TEAM_PLAYERNAME_INIT, TEAM_CONTEST_DETAIL, FIND_TEAM_NAME,
         CREATE_SET_DETAIL, CREATE_DETAIL_PLAYER } from "../graphql";


const TeamScoreDetail = (props) => {
  
  // TeamContest資料
  const queryData = useQuery(TEAM_CONTEST_DETAIL, {
    variables: { contestID: props.nowContest },
  });
  if (!queryData.loading) {
    var data = queryData.data.teamContestDetail;
  } else var data = {};
  // TeamMember資料
  const queryMembers = useQuery(TEAM_PLAYERNAME_INIT, {
    variables: { teamID: props.nowTeam },
  });
  const players = [];
  if (!queryMembers.loading) {
    queryMembers.data.initMember.map((i) =>
      players.push({
        label: i.userName,
        value: i.userName,
        userID: i.userID
      })
    );
  };
  console.log('players', players);
  // TeamName資料
  const queryTeamName = useQuery(FIND_TEAM_NAME, {
    variables: { teamID: props.nowTeam },
  })
  if (!queryTeamName.loading) {
    var teamName = queryTeamName.data.findTeamName
  } else var teamName = "me";
  
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [componentInModal, setComponentInModal] = useState("");
  const [modalMode, setModalMode] = useState("new");
  const [setNow, setSetNow] = useState({});
  const [addSet] = useMutation(CREATE_SET_DETAIL, {refetchQueries: [ TEAM_CONTEST_DETAIL, "teamContestDetail" ]});
  const [addPlayer] = useMutation(CREATE_DETAIL_PLAYER, {refetchQueries: [ TEAM_CONTEST_DETAIL, "teamContestDetail" ]});

  const onCreate = async(values) => {
    const newSet = await addSet(
      {variables: {
        contestID: props.nowContest,
        setNumber: values.setNumber,
        setScore: values.setScore || "",
        setMyPoint: values.setMyPoint,
        setOppoPoint: values.setOppoPoint,
        setOppoErrServe: values.setOppoErrServe || 0,
        setOppoErrAttack: values.setOppoErrAttack || 0,
        setOppoErrOther: values.setOppoErrOther || 0,
        setNote: values.setNote || "",
      }});
    console.log(values.setPlayerDetail)
    const newSetID =  newSet.data.createSetDetail.setID
    if (values.setPlayerDetail) {await values.setPlayerDetail.map((player) =>{
      addPlayer(
        {variables: {
          setID: newSetID,
          playerID: players.filter(e => e.label === player.playerID)[0].userID,
          detailPointServe: player.detailPointServe || 0,
          detailPointAttack: player.detailPointAttack|| 0,
          detailPointTip: player.detailPointTip|| 0,
          detailTimeAttack: player.detailTimeAttack|| 0,
          detailTimePass: player.detailTimePass|| 0,
          detailTimeNoPass: player.detailTimeNoPass|| 0,
          detailErrPassS: player.detailErrPassS|| 0,
          detailErrPassA: player.detailErrPassA|| 0,
          detailErrPass1: player.detailErrPass1|| 0,
          detailErrSet: player.detailErrSet|| 0,
          detailErrOther: player.detailErrOther|| 0,
          detailErrAttack: player.detailErrAttack|| 0,
          detailErrServe: player.detailErrServe|| 0,
          detailComboServe: player.detailComboServe|| ""
        }}
      )}
    )}
  };
  const onUpdate = values => {
    console.log('save set');
    if (values.setPlayerDetail.length > 0) {
      console.log('save playerDetail')
    };
  };
  const showModal = (set) => {
    setComponentInModal(ContestSetDetail(set));
    setSetNow(set);
    setModalMode("detail");
    setIsModalVisible(true);    
  };

  const handleCancel = () => {
    setComponentInModal("");
    setSetNow({});
    setIsModalVisible(false);
  }  
  const handleCreate = () => {
    setComponentInModal(CreateSetForm(onCreate, players));
    setModalMode("new");
    setIsModalVisible(true);
  }
  const handleEdit = () => {
    console.log(setNow);
    setModalMode("edit");
    setComponentInModal(UpdateSetForm(setNow, onUpdate, players));
  }   
  const handleBack = () => {
    setModalMode("detail");
    setComponentInModal(ContestSetDetail(setNow));
  } 

  const detailFooter = ([
    <Button key="edit" onClick={handleEdit}>
      Edit
    </Button>,
    <Button key="close" onClick={handleCancel}>
      Close
    </Button>
  ]); 
  const editFooter = ([
    <Button key="back" onClick={handleBack}>
      Back
    </Button>,
    <Button key="close" onClick={handleCancel}>
      Cancel
    </Button>
  ]);  
  const createFooter = ([
    <Button key="close" onClick={handleCancel}>
      Cancel
    </Button>
  ]); 


  const SetModal = (set) => {

    return (
      <Modal
        title={set.setNumber ? `第${set.setNumber}局紀錄` : '新紀錄單'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={(modalMode == 'detail' ? detailFooter: (
                 modalMode == 'edit' ? editFooter :
                 createFooter))}
        width={1400}>
          {componentInModal}
      </Modal>
    )
  }
  
  const SetTable = ({ data }) => {

    return (
      <>
        {SetModal(setNow)}
        <Button onClick={handleCreate}>Create</Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#f2f2f2" }}>
              <TableRow>
                <TableCell align="center" style={{width: '20%'}}>局數</TableCell>
                <TableCell align="center">{teamName}</TableCell>
                <TableCell align="center">{data.contestOpponent}</TableCell>
                <TableCell align="center">詳細記錄</TableCell>
              </TableRow>
            </TableHead>
            {(data.contestSetDetail) ? 
              <TableBody>
                {(data.contestSetDetail).map(set => (
                  <TableRow key={(set.setNumber)} 
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center" style={{width: '20%'}}>第 {set.setNumber} 局</TableCell>
                    <TableCell align="center">{set.setMyPoint}</TableCell>
                    <TableCell align="center">{set.setOppoPoint}</TableCell>
                    <TableCell align="center">
                      <Button onClick = {() => showModal(set)}>Detail</Button>
                    </TableCell>
                  </TableRow> 
                ))}
              </TableBody> :
              <TableBody></TableBody>
            }
          </Table>
        </TableContainer>
      </>
    );
  };

  let setDetail = <SetTable data={data} />;
  return (
    <div className="Wrapper">
      <Template content={setDetail} />
    </div>
  );
};

export default TeamScoreDetail;
