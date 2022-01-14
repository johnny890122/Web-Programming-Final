import React from "react";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import Template from "../components/Template";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, Typography } from "@mui/material";
import { Row, Col, Modal, Form, Input, Button, Space, InputNumber, Select } from 'antd';
import ContestSetDetail from "../components/ContestSetDetail";
import CreateSetForm from "../components/CreateSetForm";
import UpdateSetForm from "../components/UpdateSetForm";
import { TEAM_PLAYERNAME_INIT } from "../graphql";


const TeamScoreDetail = (props) => {

  const data = { // TeamContest資料
    contestID: "1",
    contestTitle: "台大盃",
    contestDate: "2022/01/11",
    contestMyTeam: "Econ",
    contestOpponent: "土木",
    contestIsWin: "lose",
    contestMySet: 0,
    contestOppoSet: 2,
    contestSetDetail: [
      {
        setID: "1",
        setNumber: 1,
        setScore: "xoxoxooxxoooxxooxoxoxxxxxxoxxoooxxoxxoxxxx",
        setMyPoint: 20,
        setOppoPoint: 25,
        setOppoErrServe: 3,
        setOppoErrAttack: 4,
        setOppoErrOther: 7,
        setNote: "耶!\n成功了!",
        setPlayerDetail: [
          {
            setID: "1",
            playerID: "Yooga",
            detailPointServe: 1,
            detailPointAttack: 2,
            detailPointTip: 3,
            detailTimeAttack: 4,
            detailTimePass: 4,
            detailTimeNoPass: 4,
            detailErrPassS: 2,
            detailErrPassA: 2,
            detailErrPass1: 2,
            detailErrSet: 1,
            detailErrOther: 1,
            detailErrAttack: 2,
            detailErrServe: 1,
            detailComboServe: "3 4 5"
          },
          {
            setID: "1",
            playerID: "Yoga",
            detailPointServe: 1,
            detailPointAttack: 2,
            detailPointTip: 3,
            detailTimeAttack: 4,
            detailTimePass: 4,
            detailTimeNoPass: 888,
            detailErrPassS: 2,
            detailErrPassA: 2,
            detailErrPass1: 2,
            detailErrSet: 1,
            detailErrOther: 1,
            detailErrAttack: 2,
            detailErrServe: 1,
            detailComboServe: "3 4"
          }
        ]
      },
      {
        setID: "2",
        setNumber: 2,
        setScore: "",
        setMyPoint: 21,
        setOppoPoint: 25,
        setOppoErrServe: 4,
        setOppoErrAttack: 5,
        setOppoErrOther: 6,
        setNote: "",
        setPlayerDetail: [
          
        ]
      }
    ],
  }
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
    console.log(players);
  };

  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [componentInModal, setComponentInModal] = useState("");
  const [modalMode, setModalMode] = useState("new");
  const [setNow, setSetNow] = useState({});


  const onCreate = values => {
    console.log('create');
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
                <TableCell align="center">{data.contestMyTeam}</TableCell>
                <TableCell align="center">{data.contestOpponent}</TableCell>
                <TableCell align="center">詳細記錄</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.contestSetDetail.map(set => (
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
            </TableBody>
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
