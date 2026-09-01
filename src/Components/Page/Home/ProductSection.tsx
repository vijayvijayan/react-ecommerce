import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetshopProductQuery } from "../../../Apis/shopProductApi";
import { setShopProduct } from "../../../Storage/Redux/shopProductSlice";
import { MainLoader } from "../MainLoader";
import { shopProductModel } from "../../../Interface/shopProductModel";
import { SD_Url } from "../../../Utility/SD";
import { count } from "console";
import { Link, NavLink } from "react-router-dom";

declare const $: any;

const ProductSection = () => {
  const dispatch= useDispatch();
  const{data:product_data,isLoading:product_loading,error:product_error}=useGetshopProductQuery({count:8,subCategoryId:0});
  
  useEffect(() => {
    const $slider = $(".single-product-slider.owl-carousel");

    // 🔴 destroy if already initialized
    if ($slider.hasClass("owl-loaded")) {
      $slider.trigger("destroy.owl.carousel");
      $slider.removeClass("owl-loaded");
      $slider.find(".owl-stage-outer").children().unwrap();
    }

    // ✅ init ONLY ONCE
    $slider.owlCarousel({
      items: 4,
      loop: true,
      margin: 30,
      nav: true,
      dots: false,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        992: { items: 4 },
      },
    });

    // cleanup on unmount
    return () => {
      if ($slider.hasClass("owl-loaded")) {
        $slider.trigger("destroy.owl.carousel");
      }
    };
    dispatch(setShopProduct(product_data));
  }, []);

  if(product_loading)
  {
    <MainLoader/>
  }

  return (
  <section className="owl-carousel active-product-area section_gap" style={{paddingBottom:"0px"}}>

  {/* single product slide */}
  <div className="single-product-slider">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center">
          <div className="section-title">
            <h1>Latest Products</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      <div className="row">

        {/* single product */}
      {product_data!=null && product_data.result.length>0 && product_data.result.map((item:shopProductModel)=>(
        <div className="col-lg-3 col-md-6">
          <div className="single-product">
            <Link to={`/productDetails/${item.shopProductId}`}><img className="img-fluid" src={SD_Url.FileUploadPath+item.productImage} alt="" /></Link>
            
            <div className="product-details">
              <h6>
               <Link to={`/productDetails/${item.shopProductId}`}>{item.productName}</Link> 
              </h6>
              <div className="price">
                <h6>${item.productSellingPrice?.toFixed(2)}</h6>
                <h6 className="l-through">${item.productPrice?.toFixed(2)}</h6>
              </div>

              {/* <div className="prd-bottom">
                <a href="#" className="social-info">
                  <span className="ti-bag"></span>
                  <p className="hover-text">add to bag</p>
                </a>
                <a href="#" className="social-info">
                  <span className="lnr lnr-heart"></span>
                  <p className="hover-text">Wishlist</p>
                </a>
                <a href="#" className="social-info">
                  <span className="lnr lnr-sync"></span>
                  <p className="hover-text">compare</p>
                </a>
                <a href="#" className="social-info">
                  <span className="lnr lnr-move"></span>
                  <p className="hover-text">view more</p>
                </a>
              </div> */}

            </div>
          </div>
        </div>
      ))}
        

        {/* remaining products kept IDENTICAL – only TSX syntax applied */}

      </div>
    </div>
  </div>

</section>
  );
};

export default ProductSection;
