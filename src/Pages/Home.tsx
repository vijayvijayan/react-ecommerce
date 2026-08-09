import React, { useEffect } from 'react'
import ProductSection from '../Components/Page/Home/ProductSection';
import { ExclusiveDealSection } from '../Components/Page/Home/ExclusiveDealSection';
import { BrandSection } from '../Components/Page/Home/BrandSection';
import { RelatedProductSection } from '../Components/Page/Home/RelatedProductSection';
import { BannerSection } from '../Components/Page/Home/BannerSection';
import { CategorySection } from '../Components/Page/Home/CategorySection';
import { FeaturesSection } from '../Components/Page/Home/FeaturesSection';


export const Home = () => {


  return (
  <>
    <BannerSection/>
    <FeaturesSection/>
    <CategorySection/>
    <ProductSection/>
    <ExclusiveDealSection/>
    <BrandSection/>
    <RelatedProductSection/>
  </>

  )
}
