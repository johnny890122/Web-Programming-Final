import React from "react";
import Table from "../components/Table";
import Template from "../components/Template";

const TeamScoreDetail = () => {
  let columnName = ["", "ECON (Loss)", "土木 (Win)"];
  let data = [
    ["總比分", "0", "2"],
    ["第一局比數", "20", "25"],
    ["第二局比數", "20", "25"],
    ["第三局比數", "-", "-"],
  ];
  
  let scoreDetail = <Table columnName={columnName} data={data} />;
  return (
    <div className="Wrapper">
      <Template content={scoreDetail} />
    </div>
  );
};

export default TeamScoreDetail;
