import { Transaction } from "@/types/type";
import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({ data }: { data: Transaction[] }) => {
  const options = {
    chart: {
      type: 'donut',
      height: 500
    },
    title: {
      text: 'Transaction Distribution',
      align: 'left'
    },
  };

  const series = data.map(item => parseInt(item.amount.toString()));
 
  const labels = data
    .map(item => item.category?.name)
    .filter((label): label is string => label !== undefined);

    //@ts-ignore
  return <Chart options={{ ...options, labels }} series={series} type="donut" height={350} />;
};

export default PieChart;
