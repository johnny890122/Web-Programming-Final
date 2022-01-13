import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, Button, Typography } from "@mui/material";

const ContestSetDetail = (set) => {
        
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
                <TableCell align="center" style={{width: '10%'}}>對方失誤</TableCell>             
                <TableCell align="center">發球</TableCell>
                <TableCell align="center">處理</TableCell>
                <TableCell align="center">攻擊</TableCell>
                <TableCell align="center" style={{width: '60%'}}>備註</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center" style={{width: '10%'}}></TableCell>
                <TableCell align="center">{set.setOppoErrServe}</TableCell>
                <TableCell align="center">{set.setOppoErrOther}</TableCell>
                <TableCell align="center">{set.setOppoErrAttack}</TableCell>
                <TableCell align="center" style={{width: '60%'}}>{set.setNote}</TableCell>
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

export default ContestSetDetail;