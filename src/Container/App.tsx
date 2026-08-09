import React, { useEffect } from 'react';
import { Footer, Header } from '../Components/Layout';
import {Routes,Route} from "react-router-dom";
import { Home } from '../Pages/Home';
import { ProductDetails } from '../Pages/ProductDetails';
import { ShopProduct } from '../Pages/ShopProduct';
import { Login } from '../Pages/Login';
import { Register } from '../Pages/Register';
import ShoppingCart from '../Pages/ShoppingCart';
import PageResolver from '../Pages/PageResolver';
import { Article } from '../Pages/Article';
import { RootState } from '../Storage/Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { userModel } from '../Interface';
import { setLoggedInUser } from '../Storage/Redux/userAuth';
import jwt_decode from 'jwt-decode';
import { Confirmation } from '../Pages/Confirmation';
import { BlogUpsert } from '../Pages/BlogUpsert';
import { BlogDetails } from '../Pages/BlogDetails';

function App() {

 const dispatch=useDispatch();
 useEffect(()=>{
const localtoken=localStorage.getItem("token");
if(localtoken){
  const {fullName,id,email,role}:userModel=jwt_decode(localtoken);
  dispatch(setLoggedInUser({fullName,id,email,role}));
}
},[])

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/productDetails/:shopProductId" element={<ProductDetails page_template={"shopProduct"}/>}></Route>
        <Route path="/article/:menuId" element={<Article />} />
      <Route path="/:page_template" element={<PageResolver />} />
       <Route path="/blogupsert/:blogId?" element={<BlogUpsert page_template={"Blog"}/>}></Route>
        <Route path="/shopProduct/:subCategoryId?" element={<ShopProduct page_template={"shopProduct"}/>}></Route>
        <Route path="/blogDetails/:blogId" element={<BlogDetails page_template={"Blog"}/>}></Route>
        <Route path="/confirmation/:orderId?" element={<Confirmation page_template={"confirmation"}/>}></Route>
      </Routes>
      <Footer/>
    </>
   
  );
}

export default App;
