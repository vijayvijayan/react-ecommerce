import React from 'react'
import { NavLink } from 'react-router-dom'

export const Thankyou = () => {
  return (
     <>
         <section className="banner-area organic-breadcrumb">
      <div className="container">
        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
          <div className="col-first">
            <h1>Thank you</h1>
            <nav className="d-flex align-items-center">
              <a href="/">
                Home <span className="lnr lnr-arrow-right"></span>
              </a>
              
              
              <a href="single-product.html">Thank you</a>
            </nav>
          </div>
        </div>
      </div>
    </section>
         <section className="tracking_box_area section_gap">
            <div className="container">
                <h3>Thank You for Contacting Us!</h3>

                <p>
                    Your message has been sent successfully. We appreciate you reaching out and will respond shortly.
                </p>

                <p>
                    <NavLink to="/">Click here</NavLink> to return to the home page.
                </p>
            </div>
        </section>
        </>
  )
}
