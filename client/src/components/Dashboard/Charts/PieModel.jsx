import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProvider } from "../../../redux/actions/actions";

ChartJS.register(Tooltip, Legend, ArcElement);

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

const PieChart = () => {
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.provider);

  // Get countries
  const countries = [...new Set(providers.map(item => item.country))];

  // Count
  const countByCountry = providers.reduce((acc, person) => {
    acc[person.country] = (acc[person.country] || 0) + 1;
    return acc;
}, {});

  useEffect(() => {
    dispatch(getProvider());
  }, []);

  // Data Sales Products //
  const dataProducts = {
    labels: countries,
    datasets: [
      {
        label: "Count Providers",
        data: countries.map(country => countByCountry[country]),
        borderWidth: 1,
        backgroundColor: ["rgba(15, 92, 192, 2)", "rgba(9, 324, 148, 22)", "rgba(95, 132, 364, 622)"],
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };
  

  return (
    <>
      <h2>Providers By Country</h2>
      <Pie options={options} data={dataProducts} />
    </>
  )
}

export default PieChart;