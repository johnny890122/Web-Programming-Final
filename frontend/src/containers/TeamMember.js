import React from "react";
import Template from "../components/Template";
import Table from "../components/Table";

const TeamMember = () => {
  const columnName = ["編號", "姓名", "帳號名稱", "信箱"];
  let data = [
    [1, "張祥賢", "Johnny", "b07303000@ntu.edu.tw"],
    [2, "陳又加", "Yogaaa", "b07303000@ntu.edu.tw"],
    [3, "錢紫翎", "Lynn", "b07303000@ntu.edu.tw"],
  ];
  let memberTable = <Table columnName={columnName} data={data} />;

  return (
    <div className="Wrapper">
      <Template content={memberTable} />
    </div>
  );
};

export default TeamMember;
