import React from 'react'
import { BreadCrumbs } from '../Components/Page/BreadCrumbs';
import { MainLoader } from '../Components/Page/MainLoader';
import { useGetArticleNewByTemplateQuery } from '../Apis/articleNewApi';
import { useGetOrderByOrderIdQuery } from '../Apis/orderApi';
import { useParams } from 'react-router-dom';
import { orderDetailsModel } from '../Interface';

type PageProps={
  page_template:string
};

export const Confirmation = ({page_template}:PageProps) => {
  const { orderId } = useParams<{ orderId: string }>();
const orderIdNumber = Number(orderId);
const {data:article_data,isLoading:article_loading}=useGetArticleNewByTemplateQuery(page_template);
const {data:order_data,isLoading:order_loading}=useGetOrderByOrderIdQuery(orderIdNumber);
if(article_loading || order_loading)
{
  return <MainLoader/>
}
else
{
  console.log(order_data.result);
}
  return (
    <>
    <BreadCrumbs article={article_data?.result} />
    
<section className="order_details section_gap">
  <div className="container">
    <h3 className="title_confirmation">
      Thank you. Your order has been received.
    </h3>
  
    <div className="row order_d_inner">
      <div className="col-lg-4">
        <div className="details_item">
          <h4>Order Info</h4>
          <ul className="list">
            <li>
              <a href="#">
                <span>Order number</span> : {order_data?.result.orderHeader.id}
              </a>
            </li>
            <li>
              <a href="#">
                <span>Date</span> : {
  order_data?.result?.orderHeader?.orderDate &&
  new Date(order_data.result.orderHeader.orderDate)
    .toLocaleDateString("en-GB")
}

              </a>
            </li>
            <li>
              <a href="#">
                <span>Total</span> : USD {order_data?.result.orderHeader.finalOrderTotal?.toFixed(2)}
              </a>
            </li>
            <li>
              <a href="#">
                <span>Payment method</span> : Online
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="details_item">
          <h4>Billing Address</h4>
          <ul className="list">
            <li>
              <a href="#">
                <span>Street</span> : {order_data?.result.orderHeader.streetAddress}
              </a>
            </li>
            <li>
              <a href="#">
                <span>City</span> : {order_data?.result.orderHeader.city}
              </a>
            </li>
            <li>
              <a href="#">
                <span>Country</span> : {order_data?.result.orderHeader.state.country.countryName}
              </a>
            </li>
            <li>
              <a href="#">
                <span>Postcode</span> : {order_data?.result.orderHeader.postalCode}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="details_item">
          <h4>Shipping Address</h4>
          <ul className="list">
            <li>
              <a href="#">
                <span>Street</span> : {order_data?.result.orderHeader.streetAddress}
              </a>
            </li>
            <li>
              <a href="#">
                <span>City</span> : {order_data?.result.orderHeader.city}
              </a>
            </li>
            <li>
              <a href="#">
                <span>Country</span> : {order_data?.result.orderHeader.state.country.countryName}
              </a>
            </li>
            <li>
              <a href="#">
                <span>Postcode</span> : {order_data?.result.orderHeader.postalCode}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="order_details_table">
      <h2>Order Details</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>

          <tbody>
            {order_data?.result?.shopProductList.length>0 && order_data?.result?.shopProductList.map((item:orderDetailsModel)=>(
               <tr>
              <td>
                <p>{item.productName}</p>
              </td>
              <td>
                <h5>x {item.count}</h5>
              </td>
              <td>
                <p>${item.price}</p>
              </td>
            </tr>
            )

            )}
           

            <tr>
              <td>
                <h4>Total</h4>
              </td>
              <td></td>
              <td>
                <p>${order_data?.result?.orderHeader.finalOrderTotal.toFixed(2)}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

    </>
  )
}
