import { Form, Input, InputNumber, Select, DatePicker } from "antd";
import { Button } from "@mui/material";
import moment from "moment";

const UpdateContestForm = (contest, onUpdate) => {
  const WinOption = [
    { label: "win", value: "win" },
    { label: "lose", value: "lose" },
    { label: "tie", value: "tie" },
  ];

  return (
    <Form
      name="update-contest-form"
      onFinish={onUpdate}
      initialValues={{
        contestTitle: contest.contestTitle,
        contestDate: moment(contest.contestDate),
        contestIsWin: contest.contestIsWin,
        contestOpponent: contest.contestOpponent,
        contestMySet: contest.contestMySet,
        contestOppoSet: contest.contestOppoSet,
      }}
      autoComplete="off"
      onKeyPress={(e) => {
        e.key === "Enter" && e.preventDefault();
      }}
    >
      <Form.Item
        label="比賽名稱"
        name="contestTitle"
        rules={[{ required: true, message: "必填比賽名稱" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="比賽日期"
        name="contestDate"
        rules={[{ required: true, message: "必填比賽日期" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="比賽輸贏"
        name="contestIsWin"
        style={{ width: 200 }}
        rules={[{ required: true, message: "必填比賽輸贏" }]}
      >
        <Select options={WinOption} />
      </Form.Item>
      <Form.Item
        label="對手名稱"
        name="contestOpponent"
        rules={[{ required: true, message: "必填對手名稱" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="我方局數" name="contestMySet">
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item label="對方局數" name="contestOppoSet">
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item>
        <Button color="success" variant="contained" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateContestForm;
