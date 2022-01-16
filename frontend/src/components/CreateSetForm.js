import { Row, Form, Input, Space, InputNumber, Select } from "antd";
import { Button } from "@mui/material";
import { MinusCircleOutlined } from "@ant-design/icons";

const CreateSetForm = (onCreate, players) => {
  return (
    <Form
      name="create-set-form"
      onKeyPress={(e) => {
        e.key === "Enter" && e.preventDefault();
      }}
      onFinish={onCreate}
      autoComplete="off"
    >
      <Row>
        <Form.Item
          label="局數"
          name="setNumber"
          rules={[{ required: true, message: "必填局數" }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          label="我方得分"
          name="setMyPoint"
          rules={[{ required: true, message: "必填我方得分" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="對方得分"
          name="setOppoPoint"
          rules={[{ required: true, message: "必填對方得分" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item label="對方發球失誤" name="setOppoErrServe">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="對方攻擊失誤" name="setOppoErrAttack">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="對方處理失誤" name="setOppoErrOther">
          <InputNumber min={0} />
        </Form.Item>
      </Row>
      <Form.List
        name="setPlayerDetail" // 球員紀錄
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ field, index, key, name, ...restField }) => (
              <Space
                key={key}
                align="baseline"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <Row key={index * 10 + 1} style={{ width: "200" }}>
                  <Form.Item
                    label="球員"
                    {...restField}
                    name={[name, "playerID"]}
                    style={{ width: 200 }}
                    rules={[{ required: true, message: "必填球員" }]}
                  >
                    <Select options={players} />
                  </Form.Item>
                </Row>
                <Row key={index * 10 + 2} style={{ width: "450" }}>
                  <Form.Item
                    label="發球得分"
                    {...restField}
                    name={[name, "detailPointServe"]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    label="攻擊得分"
                    {...restField}
                    name={[name, "detailPointAttack"]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    label="吊球得分"
                    {...restField}
                    name={[name, "detailPointTip"]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    label="攻擊次數"
                    {...restField}
                    name={[name, "detailTimeAttack"]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    label="傳球到位次數"
                    {...restField}
                    name={[name, "detailTimePass"]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    label="傳球不到位次數"
                    {...restField}
                    name={[name, "detailTimeNoPass"]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                </Row>
                <Row key={index * 10 + 3} style={{ width: "500" }}>
                  <Form.Item
                    label="接發失誤"
                    {...restField}
                    name={[name, "detailErrPassS"]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    label="接扣失誤"
                    {...restField}
                    name={[name, "detailErrPassA"]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    label="一傳失誤"
                    {...restField}
                    name={[name, "detailErrPass1"]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    label="二傳失誤"
                    {...restField}
                    name={[name, "detailErrSet"]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    label="處理失誤"
                    {...restField}
                    name={[name, "detailErrOther"]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    label="攻擊失誤"
                    {...restField}
                    name={[name, "detailErrAttack"]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    label="發球失誤"
                    {...restField}
                    name={[name, "detailErrServe"]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    label="連續發球"
                    name={[name, "detailComboServe"]}
                    style={{ width: 450 }}
                  >
                    <Input placeholder="ex : 2 4 1 ( 每次間隔一空格 )" />
                  </Form.Item>
                </Row>

                <MinusCircleOutlined
                  style={{ color: "red", fontSize: "1.25rem" }}
                  onClick={() => remove(name)}
                />
              </Space>
            ))}
            <Form.Item>
              <Button
                variant="outlined"
                onClick={() => add()}
                block
                style={{ width: "40%", marginTop: "20px" }}
              >
                Add Player
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item label="備註" name="setNote">
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item label="得分紀錄" name="setScore">
        <Input placeholder="ex : oxoox ( 我方得分 : o ，對方得分 : x )" />
      </Form.Item>
      <Form.Item>
        <Button color="success" variant="contained" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateSetForm;
