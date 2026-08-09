import React, { useRef, useState } from 'react'
import { BreadCrumbs } from '../Components/Page/BreadCrumbs'
import { useGetArticleNewByTemplateQuery } from '../Apis/articleNewApi';
import { MainLoader } from '../Components/Page/MainLoader';
import { useNavigate } from 'react-router-dom';
import { useGetStatesByCountryIdQuery, useGetCountriesQuery } from '../Apis/countryApi';
import { countryModel, shopProductModel, stateModel, userModel } from '../Interface';
import { inputHelper, toastNotify } from '../Helper';
import apiResponse from '../Interface/apiResponse';
import { useOrderInsertMutation } from '../Apis/orderApi';
import { useGetCartQuery } from '../Apis/shoppingCartApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Storage/Redux/store';
import { clearCart } from '../Storage/Redux/shoppingCartSlice';
import { SD_Status } from '../Utility/SD';

type PageProps = {
  page_template: string;
};

export const Checkout = ({page_template}:PageProps) => {

  const dispatch=useDispatch();
  const userAuthFromStore:userModel = useSelector(
      (state: RootState) => state.userAuthStore
    );
    const[loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const navigate=useNavigate();
    
    const [userInput,setUserInput]=useState(
       {
         fullName:"",
         phoneNumber:"",
         emailAddress:"",
         street:"",
         town:"",
         countryId:"",
         stateId:"",
         postCode:""
       }
     );
     
     const rfvFullname= useRef<HTMLParagraphElement | null>(null); 
     const rfvPhoneNumber= useRef<HTMLParagraphElement | null>(null); 
     const rfvEmailAddress= useRef<HTMLParagraphElement | null>(null); 
     const rfvStreet= useRef<HTMLParagraphElement | null>(null); 
     const rfvTown= useRef<HTMLParagraphElement | null>(null); 
     const rfvCountry= useRef<HTMLParagraphElement | null>(null); 
     const rfvState= useRef<HTMLParagraphElement | null>(null); 
     const rfvPostCode= useRef<HTMLParagraphElement | null>(null); 

const [orderInsert]=useOrderInsertMutation();
  const [countryId, setCountryId] = useState<number | null>(null);
  const {data:article_data,isLoading:article_loading}=useGetArticleNewByTemplateQuery(page_template);
  const {data:country_data,isLoading:country_loading}=useGetCountriesQuery(null);
  const shoppingCartFromStore = useSelector(
         (state: RootState) => state.shoppingCartStore.cartItems
       );
const {data:cart_data,isLoading:cart_loading,error:cart_error}=useGetCartQuery(shoppingCartFromStore);
  const handleUserInput=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
  const tempData=inputHelper(e,userInput);
        setUserInput(tempData);
    }

   const orderDetailsDTO: any = [];
    cart_data?.result.forEach((item: shopProductModel) => {

      const productItem: any = {};
      productItem["shopProductId"]=item.shopProductId;
      productItem["count"]= item.tempProductRequestedQuantity;
      productItem["price"]=item.productSellingPrice;
      productItem["productName"]=item.productName;
      orderDetailsDTO.push(productItem);
    });   

  const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      
        if(!handleValidation())
        {
          return;
        }
        
         setLoading(true); 
         const response: apiResponse= await orderInsert(
          {
            "id": 0,
            "createdBy": userAuthFromStore.id,
            "orderDate": "2026-01-25T08:33:26.117Z",
            "shippingDate": "2026-01-25T08:33:26.117Z",
            "finalOrderTotal": totalPrice,
            "orderStatus": SD_Status.StatusOrderPlaced,
            "paymentDate": "2026-01-25T08:33:26.117Z",
            "transactionId": "string",
            "phoneNumber": userInput.phoneNumber,
            "streetAddress": userInput.street,
            "city": userInput.town,
            "stateId":userInput.stateId,
            "postalCode": userInput.postCode,
            "fullName": userInput.fullName,
            "email": userInput.emailAddress,
            "orderDetailsDTO": orderDetailsDTO
         }
         )
         
          if(response.data?.isSuccess)
          {
              toastNotify("Ordered Successfully!");
              //localStorage.removeItem("token");
              dispatch(clearCart());
              navigate(`/confirmation/${response.data.result.orderId}`);
          }
          else if(response.error){
          
          setError(response.error.data.errorMessages[0]);
          }
          setLoading(false);

  }
  
  const handleValidation=()=>{
    var isValid=true;
      if (userInput.fullName === '') {
          if(rfvFullname.current) {
              rfvFullname.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
         if(rfvFullname.current) {
              rfvFullname.current.style.display = 'none'; 
            }
      }

      if (userInput.phoneNumber === '') {
          if(rfvPhoneNumber.current) {
              rfvPhoneNumber.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
            if(rfvPhoneNumber.current) {
              rfvPhoneNumber.current.style.display = 'none'; 
            }
      } 

      if (userInput.emailAddress === '') {
          if(rfvEmailAddress.current) {
              rfvEmailAddress.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
        if(rfvEmailAddress.current) {
              rfvEmailAddress.current.style.display = 'none'; 
            }
      } 

      if (userInput.street === '') {
          if(rfvStreet.current) {
              rfvStreet.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
        if(rfvStreet.current) {
              rfvStreet.current.style.display = 'none'; 
            }
      } 

       if (userInput.town === '') {
          if(rfvTown.current) {
              rfvTown.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
        if(rfvTown.current) {
              rfvTown.current.style.display = 'none'; 
            }
      } 

        if (userInput.countryId === '') {
          if(rfvCountry.current) {
              rfvCountry.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
        if(rfvCountry.current) {
              rfvCountry.current.style.display = 'none'; 
            }
      }

      if (userInput.stateId === '') {
          if(rfvState.current) {
              rfvState.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
        if(rfvState.current) {
              rfvState.current.style.display = 'none'; 
            }
      }

       if (userInput.postCode === '') {
          if(rfvPostCode.current) {
              rfvPostCode.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
        if(rfvPostCode.current) {
              rfvPostCode.current.style.display = 'none'; 
            }
      }
return isValid;
  }

  const {
  data: state_data,
  isLoading: state_loading
} = useGetStatesByCountryIdQuery(countryId!, {
  skip: countryId === null
});

const handleGetState=(e:React.ChangeEvent<HTMLSelectElement>)=>{
      handleUserInput(e);
      setCountryId(Number(e.target.value));
  } 

const totalPrice =
  cart_data?.result?.reduce((sum:number, item:shopProductModel) => {
    return sum +
      (item.productSellingPrice ?? 0) *
      (item.tempProductRequestedQuantity ?? 0);
  }, 0) ?? 0;  

  

    if(article_loading || country_loading || cart_loading) 
    {
      return <MainLoader/>
    }
   
 
  return (
  <>
   <BreadCrumbs article={article_data?.result} />    
  <section className="checkout_area section_gap">
  <div className="container">
    <div className="billing_details">
      <div className="row">
<form className="row contact_form" onSubmit={handleSubmit} method="post">
        <div className="col-lg-8">
          <h3>Billing Details</h3>
          
            <div className="col-md-12 form-group p_star">
              <input type="text" className="form-control" onChange={handleUserInput} value={userInput.fullName} autoComplete="new-aaa" name="fullName" placeholder="Name"/>
              <p ref={rfvFullname}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Full Name Required</p>
            </div>
            <div className="col-md-12 form-group">
             <input type="text" className="form-control" onChange={handleUserInput} value={userInput.phoneNumber} autoComplete="new-bbb" name="phoneNumber" placeholder="Phone Number"/>
             <p ref={rfvPhoneNumber}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Phone Number Required</p>
            </div>
            <div className="col-md-12 form-group p_star">
              <input type="text" className="form-control" onChange={handleUserInput} value={userInput.emailAddress} autoComplete="new-ccc" name='emailAddress' placeholder="Email Address"/>
              <p ref={rfvEmailAddress}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Email Address Required</p>
            </div>
            <div className="col-md-6 form-group p_star">
               <input type="text" className="form-control" onChange={handleUserInput} value={userInput.street} autoComplete="new-ddd" name='street' placeholder="Street Address"/>
               <p ref={rfvStreet}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Street Address Required</p>
            </div>
            <div className="col-md-12 form-group p_star">
              <input type="text" className="form-control" onChange={handleUserInput} value={userInput.town} autoComplete="new-eee" name='town' placeholder="Town/City"/>
              <p ref={rfvTown}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Town/City Required</p>
            </div>
            <div className="col-md-12 form-group p_star">
              <select className="country_select form-control" value={userInput.countryId} name='countryId' onChange={handleGetState}>
                <option value="">-Select-</option>
                {country_data?.result?.length>0 && country_data?.result.map((item:countryModel)=>(
                    <option value={item.id}>{item.countryName}</option>
                )
                )}
                
              </select>
              <p ref={rfvCountry}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Country Required</p>
            </div>
            <div className="col-md-12 form-group p_star">
              <select className="country_select form-control" onChange={handleUserInput} value={userInput.stateId} name='stateId'>
                 <option value="">-Select-</option>
                {state_data?.result?.length>0 && state_data?.result.map((item:stateModel)=>(
                    <option value={item.stateId}>{item.stateName}</option>
                )
                )}
              </select>
              <p ref={rfvState}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>State Required</p>
            </div>
            <div className="col-md-12 form-group">
             <input type="text" className="form-control" onChange={handleUserInput} value={userInput.postCode} name='postCode' autoComplete="new-fff" placeholder="Postcode/ZIP"/>
             <p ref={rfvPostCode}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Postcode Required</p>
            </div>
         
          
        </div>

        <div className="col-lg-4">
          <div className="order_box">
            <h2>Your Order</h2>
            <ul className="list">
              <li>
                <a href="#">
                  Product <span>Total</span>
                </a>
              </li>
{
cart_data?.result?.length>0 && cart_data.result.map((item:shopProductModel)=>(
        <li>
          <a href="#">
            {item.productName} <span className="middle">x {item.tempProductRequestedQuantity}</span>{" "}
            <span className="last">${((item.tempProductRequestedQuantity??0) * (item.productSellingPrice??0)).toFixed(2)}</span>
          </a>
        </li>
)
)
}
            </ul>
            <ul className="list list_2">
              <li>
                <a href="#">
                  Total <span>${totalPrice.toFixed(2)}</span>
                </a>
              </li>
            </ul>
           
            {/* <a className="primary-btn" href="#">
              Proceed to Paypal
            </a> */}
            <button type="submit"  className="primary-btn">Proceed to Payment</button>
          </div>
        </div>
</form>
      </div>
    </div>
  </div>
  </section>
  </>
 
  )
}
