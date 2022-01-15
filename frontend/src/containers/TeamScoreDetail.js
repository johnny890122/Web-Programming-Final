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
         CREATE_SET_DETAIL } from "../graphql";
import { MinusCircleOutlined } from '@ant-design/icons';


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
    console.log('players', queryMembers.data.initMember);
    console.log(data.contestSetDetail);
  };
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
  const [setCreate, setSetCreate] = useState({});
  const [addSet] = useMutation(CREATE_SET_DETAIL);


  const onCreate = async(values) => {
    /*await addSet(
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
      }})*/
    const vars = {
      contestID: props.nowContest,
      setNumber: values.setNumber,
      setScore: values.setScore || "",
      setMyPoint: values.setMyPoint,
      setOppoPoint: values.setOppoPoint,
      setOppoErrServe: values.setOppoErrServe || 0,
      setOppoErrAttack: values.setOppoErrAttack || 0,
      setOppoErrOther: values.setOppoErrOther || 0,
      setNote: values.setNote || "",
    };
    await addSet(
      {variables: vars})
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
<<<<<<< HEAD
    setComponentInModal(CreateSetForm(onCreate, players));
    setModalMode("new");
    setIsModalVisible(true);
  }
<<<<<<< HEAD
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


  const CreateSetForm = () => {

    return (
      <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
        <Row>
          <Form.Item label="局數"
                    name='setNumber'
                    rules={[{ required: true, message: '必填局數' }]}
                    onChange={handleChange} >
                <InputNumber min={1}/>
          </Form.Item>
          <Form.Item label="我方得分"
                    name='setMyPoint'
                    rules={[{ required: true, message: '必填我方得分' }]}
                    onChange={handleChange} >
                <InputNumber min={0}/>
          </Form.Item>
          <Form.Item label="對方得分"
                    name='setOppoPoint'
                    rules={[{ required: true, message: '必填對方得分' }]}
                    onChange={handleChange} >
          <InputNumber min={0}/>
          </Form.Item>
        </Row>
        <Row>
          <Form.Item label="對方發球失誤"
                    name='setOppoErrServe'
                    onChange={handleChange} >
                <InputNumber min={1}/>
          </Form.Item>
          <Form.Item label="對方攻擊失誤"
                    name='setOppoErrAttack'
                    onChange={handleChange} >
                <InputNumber min={0}/>
          </Form.Item>
          <Form.Item label="對方處理失誤"
                    name='setOppoErrOther'
                    onChange={handleChange} >
                <InputNumber min={0}/>
          </Form.Item>
        </Row>
        <Form.List name="setPlayerDetails"// 球員紀錄
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ field, index, key, name, ...restField }) => (
                <Space key={key} align="baseline">
                  <Row key={index*10+1}
                       style={{ width: 300 }}>
                    <Form.Item label="球員"
                      {...restField}
                      name={[name, 'player']}
                      style={{ width: 300 }}>
                      <Select options={players}/>
                    </Form.Item>
                  </Row>
                  <Row key={index*10+2}
                       style={{ width: 450 }}>
                    <Form.Item label="發球得分"
                      {...restField}
                      name={[name, 'detailPointServe']}>
                      <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label="攻擊得分"
                      {...restField}
                      name={[name, 'detailPointAttack']}>
                      <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label="吊球得分"
                      {...restField}
                      name={[name, 'detailPointTip']}>
                      <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label="攻擊次數"
                      {...restField}
                      name={[name, 'detailTimeAttack']}>
                      <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label="傳球到位次數"
                      {...restField}
                      name={[name, 'detailTimePass']}>
                      <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label="傳球不到位次數"
                      {...restField}
                      name={[name, 'detailTimeNoPass']}>
                      <InputNumber min={0}/>
                    </Form.Item>
                  </Row>
                  <Row key={index*10+3}
                       style={{ width: 450 }}>
                    <Form.Item label="接發失誤"
                      {...restField}
                      name={[name, 'detailErrPassS']}>
                      <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label="接扣失誤"
                      {...restField}
                      name={[name, 'detailErrPassA']}>
                      <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label="一傳失誤"
                      {...restField}
                      name={[name, 'detailErrPass1']}>
                      <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label="二傳失誤"
                      {...restField}
                      name={[name, 'detailErrSet']}>
                      <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label="處理失誤"
                      {...restField}
                      name={[name, 'detailErrOther']}>
                      <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label="攻擊失誤"
                      {...restField}
                      name={[name, 'detailErrAttack']}>
                      <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label="發球失誤"
                      {...restField}
                      name={[name, 'detailErrServe']}>
                      <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label="連續發球"
                              name='detailComboServe'
                              onChange={handleChange} >
                          <Input placeholder="ex : 2 4 1 ( 每次間隔一空格 )"/>
                    </Form.Item>
                  </Row>

                  <Button onClick={() => remove(name)} style={{ width: 20 }}>-</Button>
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block style={{ width: '40%', marginTop: '20px' }}>
                  Add Player
                </Button>
              </Form.Item>


            </>
          )}
        </Form.List>
        <Form.Item label="備註"
                   name='setNote'
                   onChange={handleChange} >
              <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="得分紀錄"
                   name='setScore'
                   onChange={handleChange} >
              <Input placeholder="ex : oxoox ( 我方得分 : o ，對方得分 : x )"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    )
  };
=======
    setComponentInModal(CreateSetForm(players, form, handleChange, onFinish));
    setIsModalVisible(true);
  }


>>>>>>> 1d7e2c0... Update TeamScoreDetail.js

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
