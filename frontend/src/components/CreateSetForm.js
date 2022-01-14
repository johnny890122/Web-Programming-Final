import { Row, Col, Modal, Form, Input, Button, Space, InputNumber, Select } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const CreateSetForm = (players, form, handleChange, onFinish) => {
        
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

                <MinusCircleOutlined onClick={() => remove(name)} />
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

export default CreateSetForm;