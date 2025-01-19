import React from "react";
import Chart from "react-apexcharts";
import { Transaction } from "@/types/type";

const AreaChart = ({ data }: { data: Transaction[] }) => {
  const options = {
    chart: {
      type: "area",
      height: 350
    },
    xaxis: {
      categories: data.map(item => item.date), // Assuming data has a date field
    },
    title: {
      text: 'Transaction Trends',
      align: 'left'
    },
  };

  const series = [{
    name: 'Transactions',
    data: data.map(item => item.amount)
  }];
//@ts-ignore
  return <Chart options={options} series={series} type="area" height={350} />;
};

export default AreaChart;
