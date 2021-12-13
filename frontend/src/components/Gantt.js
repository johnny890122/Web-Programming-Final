import React from "react";
import { Component } from "react";
import { Chart } from "react-google-charts";

const Gantt = ({ data }) => {
  return (
    <div className={"my-pretty-chart-container"}>
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="Gantt"
        loader={<div>Loading Chart</div>}
        data={data}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default Gantt;
