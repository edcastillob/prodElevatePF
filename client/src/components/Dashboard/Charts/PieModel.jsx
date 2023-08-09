// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement);

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

const PieChart = ({ currentLanguage }) => {
  const { t } = useTranslation('global');
  // Data Sales Products //
  const dataProducts = {
    labels: ["Dell", "Apple", "HP", "XIaomi", "Samsung", "Epson", "Cisco"],
    datasets: [
      {
        label: t("barchart.sales", { lng: currentLanguage }),
        data: [55, 28, 48, 80, 28, 48, 80],
        borderWidth: 1,
        backgroundColor: [
          "rgba(15, 92, 192, 2)",
          "rgba(9, 224, 34, 22)",
          "rgba(95, 132, 364, 622)",
          "rgba(29, 672, 189, 0.7)",
          "rgba(25, 153, 100, 0.8)",
          "rgba(40, 180, 99, 0.6)",
          "rgba(57, 385, 101, 0.7)"
        ],
        
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <>
      <Pie options={options} data={dataProducts} />
    </>
  )
}

export default PieChart;