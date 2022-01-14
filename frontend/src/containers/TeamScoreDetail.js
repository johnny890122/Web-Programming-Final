import React from "react";
import { useState } from "react";
//import Table from "../components/Table";
import Template from "../components/Template";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, Typography } from "@mui/material";
import { Row, Col, Modal, Form, Input, Button, Space, InputNumber, Select } from 'antd';
import ContestSetDetail from "../components/ContestSetDetail";
//import CreateSetForm from "../components/CreateSetForm";


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

  const players = [
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Yoga2', value: 'Yoga2' },
  ];
  const [form] = Form.useForm();
  const onFinish = values => {
    console.log('Received values of form:', values);
  };
  const handleChange = () => {
    form.setFieldsValue({ detail: [] });
  };

  const showModal = (set) => {
    console.log(set.setPlayerDetail);
    setComponentInModal(ContestSetDetail(set));
    setSetNow(set);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setComponentInModal("");
    setSetNow(null);
    setIsModalVisible(false);
  }
  
  const handleCreate = () => {
    setComponentInModal(CreateSetForm());
    setIsModalVisible(true);
  }
  
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

  const SetModal = (set) => {

    return (
      <Modal
        title={set? `第${set.setNumber}局紀錄` : '新紀錄單'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
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
