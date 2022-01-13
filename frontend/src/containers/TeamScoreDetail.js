import React from "react";
import { useState } from "react";
//import Table from "../components/Table";
import Template from "../components/Template";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, Button } from "@mui/material";
import { Modal } from "antd";

const TeamScoreDetail = () => {

  const data = {
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
        setPlayerDetail: []
      },
      {
        setID: "2",
        setNumber: 2,
        setScore: "xoxoxooxxoooxxooxoxoxxxxxxoxxoooxxoxxoxxxx",
        setMyPoint: 21,
        setOppoPoint: 25,
        setOppoErrServe: 4,
        setOppoErrAttack: 5,
        setOppoErrOther: 6,
        setPlayerDetail: []
      }
    ],
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    console.log("show");
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  }
  
  const SetModal = () => {
    return (
      <Modal
        title="Set Detail"
        visible={isModalVisible}
        //confirmLoading={isEdit}
        onOk={handleCancel}
        onCancel={handleCancel}>
      </Modal>
    )
  }

  const SetTable = ({ data }) => {
    return (
      <>
        <SetModal></SetModal>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#f2f2f2" }}>
              <TableRow>
                <TableCell align="left" key = 'setNumber'>局數</TableCell>
                <TableCell align="left" key = 'myteam'>{data.contestMyTeam}</TableCell>
                <TableCell align="left" key = 'opponent'>{data.contestOpponent}</TableCell>
                <TableCell align="left" key = 'button'>詳細記錄</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.contestSetDetail.map((set) => (
                <TableRow key={(set.setNumber)} 
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="left">第 {set.setNumber} 局</TableCell>
                  <TableCell align="left">{set.setMyPoint}</TableCell>
                  <TableCell align="left">{set.setOppoPoint}</TableCell>
                  <TableCell align="left">
                    <Button onClick = {showModal}>Detail</Button>
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
