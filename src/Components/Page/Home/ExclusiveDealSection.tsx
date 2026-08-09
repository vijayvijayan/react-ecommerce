import React, { useEffect } from "react";
import { useGetDealQuery } from "../../../Apis/dealApi";
import { MainLoader } from "../MainLoader";
import { dealProductModel } from "../../../Interface";
import { SD_Url } from "../../../Utility/SD";
import { Link } from "react-router-dom";

export const ExclusiveDealSection = () => {

  const{data:deal_data,isLoading:deal_loading}=useGetDealQuery(1);
  // =========================
  // Owl Carousel Effect
  // =========================
  useEffect(() => {
    if (!deal_data || !deal_data.result || deal_data.result.length === 0)
    return;
    const $ = (window as any).$;
    if (!$) return;

    const $slider = $(".active-exclusive-product-slider");

    if ($slider.length === 0) return;

    // Destroy if already initialized (StrictMode safe)
    if ($slider.hasClass("owl-loaded")) {
      $slider.trigger("destroy.owl.carousel");
      $slider.removeClass("owl-loaded");
      $slider.find(".owl-stage-outer").children().unwrap();
    }

    $slider.owlCarousel({
      items: 1,
      autoplay: false,
      autoplayTimeout: 5000,
      loop: true,
      nav: true,
      navText: [
        "<img src='img/product/prev.png' />",
        "<img src='img/product/next.png' />"
      ],
      dots: false
    });

    return () => {
      if ($slider.hasClass("owl-loaded")) {
        $slider.trigger("destroy.owl.carousel");
      }
    };
  }, [deal_data]);

  // =========================
  // Countdown Effect
  // =========================
  useEffect(() => {
  const counter = document.getElementById("js-countdown");
  if (!counter) return;

   //if (!deal_data || !deal_data.result || deal_data.result.length === 0)
    //return;

  const endDate = new Date(deal_data?.result[0]?.deal?.endDate);
  const countdown = new Date(endDate.toISOString().split("T")[0]);
  
  function getRemainingTime(endtime: Date) {
    const total =
      Date.parse(endtime.toString()) - Date.parse(new Date().toString());

    return {
      total,
      days: Math.floor(total / (1000 * 60 * 60 * 24)),
      hours: Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((total / 1000 / 60) % 60),
      seconds: Math.floor((total / 1000) % 60)
    };
  }

  const _daysSpan = counter.querySelector(".js-countdown-days");
  const _hoursSpan = counter.querySelector(".js-countdown-hours");
  const _minutesSpan = counter.querySelector(".js-countdown-minutes");
  const _secondsSpan = counter.querySelector(".js-countdown-seconds");

  if (
    !_daysSpan ||
    !_hoursSpan ||
    !_minutesSpan ||
    !_secondsSpan
  ) {
    return;
  }

  // ✅ Freeze non-null references (THIS is the key)
  const daysSpan = _daysSpan as HTMLElement;
  const hoursSpan = _hoursSpan as HTMLElement;
  const minutesSpan = _minutesSpan as HTMLElement;
  const secondsSpan = _secondsSpan as HTMLElement;

  function updateClock() {
    const t = getRemainingTime(countdown);

    daysSpan.innerHTML = String(t.days);
    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

    if (t.total <= 0) clearInterval(timer);
  }

  updateClock();
  const timer = setInterval(updateClock, 1000);

  return () => clearInterval(timer);
}, [deal_data]);


if(deal_loading)
{
  return <MainLoader/>
}
  // =========================
  // JSX
  // =========================
  return (
    <>
    {
      deal_data!=null && deal_data?.result?.length>0 
      ?
      (
        <section className="exclusive-deal-area" style={{margin:"100px 0"}}>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">

          <div className="col-lg-6 no-padding exclusive-left">
            <div className="row clock_sec clockdiv" id="js-countdown">

              <div className="col-lg-12">
                <h1>Exclusive Hot Deal Ends Soon!</h1>
                <p>Who are in extremely love with eco friendly system.</p>
              </div>

              <div className="col-lg-12">
                <div className="row clock-wrap">
                  <div className="col clockinner">
                    <h1 className="js-countdown-days">0</h1>
                    <span className="smalltext">Days</span>
                  </div>
                  <div className="col clockinner">
                    <h1 className="js-countdown-hours">00</h1>
                    <span className="smalltext">Hours</span>
                  </div>
                  <div className="col clockinner">
                    <h1 className="js-countdown-minutes">00</h1>
                    <span className="smalltext">Mins</span>
                  </div>
                  <div className="col clockinner">
                    <h1 className="js-countdown-seconds">00</h1>
                    <span className="smalltext">Secs</span>
                  </div>
                </div>
              </div>

            </div>

            <a href="#" className="primary-btn">Shop Now</a>
          </div>

          <div className="col-lg-6 no-padding exclusive-right">
            <div className="active-exclusive-product-slider">
 { 
  deal_data!=null && deal_data?.result?.length>0 && deal_data.result.map((item:dealProductModel,index:number)=>(
     <div className="single-exclusive-slider" key={index}>
                <img className="img-fluid" src={SD_Url.FileUploadPath+item.shopProduct?.productImage} alt="" />
                <div className="product-details">
                  <div className="price">
                    <h6>${item.shopProduct?.productSellingPrice?.toFixed(2)}</h6>
                    <h6 className="l-through">${item.shopProduct?.productPrice?.toFixed(2)}</h6>
                  </div>
                  <h4>{item.shopProduct?.productName}</h4>
                  <div className="add-bag d-flex align-items-center justify-content-center">
                    <Link className="add-btn" to={`/productDetails/${item.shopProductId}`}><span className="lnr lnr-move"></span></Link>
                    <Link to={`/productDetails/${item.shopProductId}`}><span className="add-text text-uppercase">View More</span></Link>
                  </div>
                </div>
              </div>
  )
  )
} 
             

             

            </div>
          </div>

        </div>
      </div>
    </section>
      )
      :
      ""
    }
    
    </>
  );
};
