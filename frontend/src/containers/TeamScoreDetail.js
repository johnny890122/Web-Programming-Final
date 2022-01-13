import React from "react";
import { useState } from "react";
//import Table from "../components/Table";
import Template from "../components/Template";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, Button, Typography } from "@mui/material";
import { Modal } from "antd";
import ContestSetDetail from "../components/ContestSetDetail";

const TeamScoreDetail = () => {

  const data = 
  {
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
        setNote: "好厲害!",
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
            detailComboServe: [3, 4, 5]
          },
          {
            setID: "1",
            playerID: "$$",
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
            detailComboServe: [3, 4]
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [componentInModal, setComponentInModal] = useState("");
  const [setNow, setSetNow] = useState(null);

  const showModal = (set) => {
    console.log(set.setPlayerDetail);
    setSetNow(set);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setSetNow(null);
    setIsModalVisible(false);
  }
  
  

  const SetTable = ({ data }) => {

    const SetModal = (set) => {

      return (
        <Modal
          title={set? `第${set.setNumber}局紀錄` : 'Create'}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="close" onClick={handleCancel}>
              Close
            </Button>,
          ]}
          width={1400}>
            {set? ContestSetDetail(set) :'null'}
        </Modal>
      )
    }

    return (
      <>
        {SetModal(setNow)}
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
