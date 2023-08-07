import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { showProducts } from "../../../redux/actions/actions";


ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

const BarChart = ({ currentLanguage }) => {
  const { t } = useTranslation('global');
    /** Show Prodcuts */ 
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const [condition, setCondition] = useState({
      BrandNew: [],
      Used: [],
      LikeNew: []
    })
  
    useEffect(() => {
      dispatch(showProducts());
    }, []);

    useEffect(() => {
       const brandNewProducts = products.filter(product => product.condition === 'Brand New');
        const usedProducts = products.filter(product => product.condition === 'Used');
        const likeNewProducts = products.filter(product => product.condition === "Like New");

        setCondition({
          ...condition,
          BrandNew: brandNewProducts,
          Used: usedProducts,
          LikeNew: likeNewProducts
        })
    }, [products]);

  // Data Products By Condition //
  const dataSales = {
    labels: [
      t("barchart.brand-new", { lng: currentLanguage }),
      t("barchart.used", { lng: currentLanguage }),
      t("barchart.like-new", { lng: currentLanguage }),
    ],
    datasets: [
      {
        label: t("barchart.count-products", { lng: currentLanguage }),
        data: [ condition.BrandNew.length, condition.Used.length, condition.LikeNew.length],
        borderWidth: 1,
        backgroundColor: "rgb(75, 192, 141)",
        borderColor: "rgb(75, 192, 141)",
      },
    ],
  };

  return (
    <>
      <Bar
        style={{ padding: "20px", width: "80%" }}
        data={dataSales}
        options={options}
      />
    </>
  )
}

export default BarChart;