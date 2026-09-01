import React, { useEffect } from 'react'
import DOMPurify from "dompurify";
import { useGetHomePageBannersQuery } from '../../../Apis/homePageBannerApi';
import { useDispatch } from 'react-redux';
import { setHomePageBanner } from '../../../Storage/Redux/homePageBannerSlice';
import { MainLoader } from '../MainLoader';
import { homePageBannerModel } from '../../../Interface';
import { SD_Url } from '../../../Utility/SD';

export const BannerSection = () => {
  const dispatch=useDispatch();
const{data:banner_data,isLoading:banner_loading}=useGetHomePageBannersQuery(null);

  useEffect(() => {
  const $ = (window as any).$;
  if (!$) return;

  const $window = $(window);
  const windowHeight = window.innerHeight;

  const headerHeight =
    $(".default-header").length > 0
      ? $(".default-header").outerHeight() || 0
      : 0;

  const fitScreen = windowHeight - headerHeight;

  $(".fullscreen").css("height", windowHeight);
  $(".fitscreen").css("height", fitScreen);

  const $slider = $(".active-banner-slider");
  if ($slider.length === 0) return;

  // Destroy first (StrictMode safe)
  if ($slider.hasClass("owl-loaded")) {
    $slider.trigger("destroy.owl.carousel");
    $slider.find(".owl-stage-outer").children().unwrap();
  }

  $slider.owlCarousel({
    items: 1,
    loop: true,
    autoplay: false,
    nav: true,
    navText: [
      "<img src='img/banner/prev.png'>",
      "<img src='img/banner/next.png'>"
    ],
    dots: false
  });

  dispatch(setHomePageBanner(banner_data));

  return () => {
    if ($slider.hasClass("owl-loaded")) {
      $slider.trigger("destroy.owl.carousel");
    }
  };
}, [banner_data]);

if(banner_loading)
{
  return <MainLoader/>
}


  return (
    <section className="banner-area">
  <div className="container">
    <div className="row fullscreen align-items-center justify-content-start">
      <div className="col-lg-12">
        <div className="active-banner-slider owl-carousel">

          {/* single-slide */}
          {banner_data!=null && banner_data.result.length>0 && banner_data.result.map((item:homePageBannerModel,index:number)=>{
             const slideClass =index !== 0
                ? "row single-slide"
                : "row single-slide align-items-center d-flex";
              
              const colClass=index !== 0
                ? "col-lg-5"
                : "col-lg-5 col-md-6";
            return(
              <div className={slideClass}>
            <div className={colClass}>
              <div className="banner-content">
                <h1
  dangerouslySetInnerHTML={{
    __html: item.title??""
  }}
/>

                <p>
                 {item.shortDescription}
                </p>
                {/* <div className="add-bag d-flex align-items-center">
                  <a className="add-btn" href="#">
                    <span className="lnr lnr-cross"></span>
                  </a>
                  <span className="add-text text-uppercase">Add to Bag</span>
                </div> */}
              </div>
            </div>

            <div className="col-lg-7">
              <div className="banner-img">
                <img
                  className="img-fluid"
                  src={SD_Url.FileUploadPath+item.image}
                  alt="img"
                />
              </div>
            </div>
          </div>
            )
          } 
          )}
         

          {/* single-slide */}
          {/* <div className="row single-slide">
            <div className="col-lg-5">
              <div className="banner-content">
                <h1>
                  Nike New <br />Collection!
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                </p>
                <div className="add-bag d-flex align-items-center">
                  <a className="add-btn" href="#">
                    <span className="lnr lnr-cross"></span>
                  </a>
                  <span className="add-text text-uppercase">Add to Bag</span>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="banner-img">
                <img
                  className="img-fluid"
                  src="img/banner/banner-img.png"
                  alt=""
                />
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </div>
  </div>
</section>
  )
}
