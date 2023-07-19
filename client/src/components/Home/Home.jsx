import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {CardProduct} from '../Product/cardProduct/CardProduct';
import { showProducts } from '../../redux/actions/actions';
import { NavLink } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import styles from './Home.module.css'


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
    <div className={styles.cards}>
     {(productsFiltered.length) 
     ? 
     <div><NavLink to="/home" style={{textDecoration: "none"}} onClick={() => { navigate.push('/home'); dispatch(showProducts()); }}> <h3>&#8592;</h3> </NavLink></div> : ''}
   
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


