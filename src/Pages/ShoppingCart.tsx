import React, { useEffect } from 'react'
import { withAuth } from '../HOC'
import { BreadCrumbs } from '../Components/Page/BreadCrumbs'
import { useGetArticleNewByMenuIdQuery, useGetArticleNewByTemplateQuery } from '../Apis/articleNewApi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { setArticleNew } from '../Storage/Redux/articleNewSlice'
import { MainLoader } from '../Components/Page/MainLoader'
import { RootState } from '../Storage/Redux/store';
import { shoppingCartModel, shopProductModel } from '../Interface'
import { useGetCartQuery } from '../Apis/shoppingCartApi'
import { SD_Url } from '../Utility/SD'

import { removeFromCart } from '../Storage/Redux/shoppingCartSlice'
type PageProps = {
  page_template: string;
};
function ShoppingCart({page_template}:PageProps) {
  
    const dispatch=useDispatch();
    const {data:article_data,isLoading:article_loading,error:article_error}=useGetArticleNewByTemplateQuery(page_template);
    

    //  useEffect(() => {
    //         if(article_data) dispatch(setArticleNew(article_data));
    //       }, [article_data, dispatch]);

    const shoppingCartFromStore = useSelector(
       (state: RootState) => state.shoppingCartStore.cartItems
     );

    const {data:cart_data,isLoading:cart_loading,error:cart_error}=useGetCartQuery(shoppingCartFromStore);

  //   const handleRemoveItem=(productId:number|undefined)=>{
  //     dispatch(removeShopProduct(productId));
  //     console.log(cart_data);
  // }

  const handleRemoveItem = (productId: number | undefined) => {
    console.log("productId:", productId);
    console.log("typeof productId:", typeof productId);

    if (productId === undefined) return;

    dispatch(removeFromCart(productId));
    console.log(cart_data);
};

    if(article_loading || cart_loading)
    {
        return <MainLoader/>
    }
  
   
   
  const totalPrice =
  cart_data?.result?.reduce((sum:number, item:shopProductModel) => {
    return sum +
      (item.productSellingPrice ?? 0) *
      (item.tempProductRequestedQuantity ?? 0);
  }, 0) ?? 0;  
     

     
       
  return (
    <>
    <BreadCrumbs article={article_data?.result} />
    

    {/* ================= Cart Area ================= */}
<section className="cart_area">
  <div className="container">
    <div className="cart_inner">
    {
      (cart_data!=null && cart_data?.result.length>0)?(
	  <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>

          <tbody>
            {
              cart_data!=null && cart_data?.result.length>0 && cart_data?.result.map((item:shopProductModel)=>{
                 
                return(
                   (
                    <tr>
                    <td>
                      <div className="media">
                        <div className="d-flex">
                          <img src={SD_Url.FileUploadPath+item.productImage} style={{width:"150px",height:"100px"}} alt="" />
                        </div>
                        <div className="media-body">
                          <p>{item.productName}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <h5>${item.productSellingPrice?.toFixed(2)}</h5>
                    </td>

                    <td>
                      <div className="product_count">
                        <input
                          type="text"
                          name="qty"
                          id="sst"
                          defaultValue="1"
                          value={item.tempProductRequestedQuantity}
                          title="Quantity:"
                          className="input-text qty"
                        />

                        <button
                          className="increase items-count"
                          type="button">
                          <i className="lnr lnr-chevron-up"></i>
                        </button>

                        <button
                          className="reduced items-count"
                          type="button">
                          <i className="lnr lnr-chevron-down"></i>
                        </button>
                      </div>
                    </td>

                    <td>
                      <h5>${((item.productSellingPrice ?? 0)* (item.tempProductRequestedQuantity ?? 0)).toFixed(2)}</h5>
                    </td>
                    <td>
                      <a className="btn btn-outline-danger Delete" onClick={()=>handleRemoveItem(item.shopProductId)}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </a>
                    </td>
                  </tr>
              )
                )
              }
               
                  )
            }
              

            <tr>
              <td></td>
              <td></td>
              <td><h5>Subtotal</h5></td>
              <td><h5>${totalPrice.toFixed(2)}</h5></td>
            </tr>

            

            <tr className="out_button_area">
              <td></td>
              <td></td>
              <td></td>
              <td>
                <div className="checkout_btn_inner d-flex align-items-center">
                  <Link className="gray_btn" to="/ShopProduct">Continue Shopping</Link>
                  <Link className="primary-btn" to="/checkout">Proceed to checkout</Link>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
        ):(<h3>Your cart is empty.<Link to="/ShopProduct"> Click here</Link> to continue shopping.</h3>)  
    }

 
    
    </div>
  </div>
</section>
{/* ================= End Cart Area ================= */}

    </>
  )
}

//export default withAuth(ShoppingCart) 
export default ShoppingCart
