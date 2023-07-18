import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {CardProduct} from '../Product/cardProduct/CardProduct';
import style from "../moduleCss/CardsProduct.module.css";
import { showProducts } from '../../redux/actions/actions';
import {SearchBar} from '../Product/searchBar/SearchBar';
import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";


export const Home = () => {
  //-----------------------------------------------------------------------------
  const category = [
    { id: 1, name: "hardware", description: "Perifericos fisicos" },
    { id: 2, name: "software", description: "Programa de computación" },
  ];
  //---------------------------------------
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  useEffect(() => {dispatch(showProducts())}, []);
  const products = useSelector((state) => state.products)
  const productsFiltered = useSelector((state) => state.productsFiltered)
  
  const [optionProducts, setOptionProducts] = useState([]);
  
  useEffect(() => {
    setOptionProducts(productsFiltered.length ? productsFiltered : products);
  }, [productsFiltered, products]);
  
  return (
    <div className={style.cards}>
     {(productsFiltered.length) 
     ? 
     <div><Link to="/" onClick={() => { navigate.push('/'); dispatch(showProducts()); }}>🏠</Link></div> : ''}
   
    <SearchBar />  
      {optionProducts?.map((product) => (
        <CardProduct
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
          category={product.category}
        />
      ))}
    </div>
  )
}


