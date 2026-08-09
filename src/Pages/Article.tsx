import React, { useEffect } from 'react'
import { BreadCrumbs } from '../Components/Page/BreadCrumbs'
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useGetArticleNewByMenuIdQuery, useGetArticleNewByTemplateQuery } from '../Apis/articleNewApi';
import { setArticleNew } from '../Storage/Redux/articleNewSlice';
import { MainLoader } from '../Components/Page/MainLoader';
import { useGetShopCategoriesQuery, useGetshopProductQuery, useGetShopSubCategoriesQuery } from '../Apis/shopProductApi';
import { shopCategoryModel } from '../Interface/shopCategoryModel';
import { shopSubCategoryModel } from '../Interface/shopSubCategoryModel';
import { shopProductModel } from '../Interface/shopProductModel';
import { SD_Url } from '../Utility/SD';

export const Article = () => {
   const dispatch = useDispatch();
   const {menuId}=useParams();
   const {data:article_data,isLoading:article_loading}=useGetArticleNewByMenuIdQuery(menuId);

    useEffect(() => {
           if(article_data) dispatch(setArticleNew(article_data));
         }, [article_data, dispatch]);
   
    if (article_loading) {
        return <MainLoader />;
      }
  return (
    <>
    <BreadCrumbs article={article_data?.result}/>
     <section className="tracking_box_area section_gap">
        <div className="container">
            <div   dangerouslySetInnerHTML={{
    __html: article_data.result.pageContent??""
  }}>
               
              
            </div>
        </div>
    </section>
    </>
  )
}
