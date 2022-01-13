import React from "react";
import { useState } from "react";
//import Table from "../components/Table";
import Template from "../components/Template";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, Button, Typography } from "@mui/material";
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
        setScore: "xoxoxooxxoooxxooxoxoxxxxxxoxxoooxxoxxoxxxx",
        setMyPoint: 21,
        setOppoPoint: 25,
        setOppoErrServe: 4,
        setOppoErrAttack: 5,
        setOppoErrOther: 6,
        setPlayerDetail: [
          
        ]
      }
    ],
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setMedalMode] = useState("new"); //new, detail, edit
  const [isEdit, setIsEdit] = useState(false);
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

      const PlayerTable = (set) => {
        
        const myscore = []
        const opposcore = []
        var mypoint = 0;
        var oppopoint = 0;

        set.setScore.split("").map(point => {
          if (point == "o") {
            mypoint += 1; 
            myscore.push(mypoint);
            opposcore.push("-");
          } else {
            oppopoint += 1; 
            opposcore.push(oppopoint);
            myscore.push("-")}
          });

        return (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1300 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: "#f2f2f2" }}>
                  <TableRow>
                    <TableCell align="center" key = 'player'>球員</TableCell>
                    <TableCell align="center" key = 'pointServe'>發球得分</TableCell>
                    <TableCell align="center" key = 'pointAttack'>攻擊得分</TableCell>
                    <TableCell align="center" key = 'pointTip'>吊球得分</TableCell>
                    <TableCell align="center" key = 'timeAttack'>攻擊次數</TableCell>
                    <TableCell align="center" key = 'timePass'>傳球到位次數</TableCell>
                    <TableCell align="center" key = 'timeNoPass'>傳球不到位次數</TableCell>
                    <TableCell align="center" key = 'errPassS'>接發失誤</TableCell>
                    <TableCell align="center" key = 'errPassA'>接扣失誤</TableCell>
                    <TableCell align="center" key = 'errPass1'>一傳失誤</TableCell>
                    <TableCell align="center" key = 'errSet'>二傳失誤</TableCell>
                    <TableCell align="center" key = 'errOther'>處理失誤</TableCell>
                    <TableCell align="center" key = 'errAttack'>攻擊失誤</TableCell>
                    <TableCell align="center" key = 'errServe'>發球失誤</TableCell>
                    <TableCell align="center" key = 'comboServe'>連續發球數</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {set.setPlayerDetail.map((player) => (
                    <TableRow key={(player.playerID)} 
                              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell align="center" key = 'player'>{player.playerID}</TableCell>
                      <TableCell align="center" key = 'pointServe'>{player.detailPointServe}</TableCell>
                      <TableCell align="center" key = 'pointAttack'>{player.detailPointAttack}</TableCell>
                      <TableCell align="center" key = 'pointTip'>{player.detailPointTip}</TableCell>
                      <TableCell align="center" key = 'timeAttack'>{player.detailTimeAttack}</TableCell>
                      <TableCell align="center" key = 'timePass'>{player.detailTimePass}</TableCell>
                      <TableCell align="center" key = 'timeNoPass'>{player.detailTimeNoPass}</TableCell>
                      <TableCell align="center" key = 'errPassS'>{player.detailErrPassS}</TableCell>
                      <TableCell align="center" key = 'errPassA'>{player.detailErrPassA}</TableCell>
                      <TableCell align="center" key = 'errPass1'>{player.detailErrPass1}</TableCell>
                      <TableCell align="center" key = 'errSet'>{player.detailErrSet}</TableCell>
                      <TableCell align="center" key = 'errOther'>{player.detailErrOther}</TableCell>
                      <TableCell align="center" key = 'errAttack'>{player.detailErrAttack}</TableCell>
                      <TableCell align="center" key = 'errServe'>{player.detailErrServe}</TableCell>
                      <TableCell align="center" key = 'comboServe'>{player.detailComboServe.map(combo => `${combo} `)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer component={Paper}>
              <Table sx={{ maxWidth: 1400 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: "#f2f2f2" }}>
                  <TableRow>
                    <TableCell align="center" style={{width: '7%'}}>對方失誤</TableCell>             
                    <TableCell align="center">發球</TableCell>
                    <TableCell align="center">處理</TableCell>
                    <TableCell align="center">攻擊</TableCell>
                    <TableCell align="center" style={{width: '60%'}}>備註</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center" style={{width: '7%'}}></TableCell>
                    <TableCell align="center">3</TableCell>
                    <TableCell align="center">7</TableCell>
                    <TableCell align="center">4</TableCell>
                    <TableCell align="center" style={{width: '60%'}}></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer component={Paper}>
              <Table sx={{ maxWidth: 1400 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: "#f2f2f2" }}>
                  <TableRow>
                    <TableCell align="center" colSpan={set.setScore.length}>得分紀錄</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {myscore.map(score => (
                        <TableCell align="center">{score}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    {opposcore.map(score => (
                        <TableCell align="center">{score}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        );
      };

      return (
        <Modal
          title="Set Detail"
          visible={isModalVisible}
          //confirmLoading={isEdit}
          onOk={handleCancel}
          onCancel={handleCancel}
          width={1400}>
            {set? PlayerTable(set) :'null'}
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
                <TableCell align="left" key = 'setNumber'>局數</TableCell>
                <TableCell align="left" key = 'myteam'>{data.contestMyTeam}</TableCell>
                <TableCell align="left" key = 'opponent'>{data.contestOpponent}</TableCell>
                <TableCell align="left" key = 'button'>詳細記錄</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.contestSetDetail.map(set => (
                <TableRow key={(set.setNumber)} 
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="left">第 {set.setNumber} 局</TableCell>
                  <TableCell align="left">{set.setMyPoint}</TableCell>
                  <TableCell align="left">{set.setOppoPoint}</TableCell>
                  <TableCell align="left">
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
