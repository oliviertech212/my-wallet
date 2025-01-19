import { Account, Transaction } from "@/types/type";
import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ data }:  { data: Account[] }) => {
  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: data.map(item => item.name), // Assuming data has an accountName field
    },
    title: {
      text: 'Account Transactions',
      align: 'left'
    },
  };

  const series = [{
    name: 'Transactions',
    data: data.map(item => item.balance)
  }];

  //@ts-ignore

  return <Chart options={options} series={series} type="bar" height={350} />;
};

export default BarChart;
