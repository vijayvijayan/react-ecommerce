import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetArticleNewByTemplateQuery } from '../Apis/articleNewApi';
import { BreadCrumbs } from '../Components/Page/BreadCrumbs';
import { MainLoader } from '../Components/Page/MainLoader';
import { inputHelper, toastNotify } from '../Helper';
import { useLoginUserMutation, useRegisterUserMutation } from '../Apis/authApi';
import { setLoggedInUser } from '../Storage/Redux/userAuth';
import { userModel } from '../Interface';
import jwt_decode from 'jwt-decode';
import apiResponse from '../Interface/apiResponse';
import { SD_Status, SD_Url } from '../Utility/SD';

type PageProps = {
  page_template: string;
};

export const Register = ({page_template}:PageProps) => {
    const dispatch = useDispatch();
     const [userInput,setUserInput]=useState(
    {
      fullName:"",
      userName:"",
      password:"",
    }
  ); 
    const[loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const navigate=useNavigate();
     const [registerUser]=useRegisterUserMutation();
    
    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!handleValidation())
        {
        return;
        } 
        setLoading(true);
        
        const response: apiResponse=await registerUser({  
        name:userInput.fullName,  
        userName:userInput.userName,
        password:userInput.password,
        role:"Customer"
        })

        if(response.data)
        {
            toastNotify("Registration Successful!.Please login to continue.");
            navigate("/login");
        }
        else if(response.error){
        
        setError(response.error.data.errorMessages[0]);
        }
        setLoading(false);
   }

    const handleUserInput=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const tempData=inputHelper(e,userInput);
        setUserInput(tempData);
    }

    const rfvFullname= useRef<HTMLParagraphElement | null>(null); 
    const rfvUsername= useRef<HTMLParagraphElement | null>(null); 
    const rfvPassword= useRef<HTMLParagraphElement | null>(null);

    const handleValidation=()=>{
      var isValid=true;
      if (userInput.userName === '') {
          if(rfvUsername.current) {
              rfvUsername.current.style.display = 'block'; 
            }
          
          isValid=false;
      } 
      if (userInput.password === '') {
          if (rfvPassword.current) {
            rfvPassword.current.style.display = 'block'; 
          }
           
          isValid=false;
      }
       if (userInput.fullName === '') {
          if (rfvFullname.current) {
            rfvFullname.current.style.display = 'block'; 
          }
           
          isValid=false;
      }
      return isValid; 
    };

    const {data:article_data,isLoading:article_loading}=useGetArticleNewByTemplateQuery(page_template);
    if(article_loading)
    {
       return <MainLoader/>
    }
  return (
    <>
     <BreadCrumbs article={article_data?.result}/> 
    <section className="login_box_area section_gap">
         {loading && <MainLoader/>}
      <div className="container">
        <div className="row">

          <div className="col-lg-6">
            <div className="login_box_img">
              <img className="img-fluid" src="img/login.jpg" alt="Login" />
            
            </div>
          </div>

          <div className="col-lg-6">
            <div className="login_form_inner">
              <h3>Register Here</h3>

              <form
                className="row login_form"
                onSubmit={handleSubmit}
                method="post"
                id="contactForm">
                   <div className="col-md-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    placeholder="Name"
                    onChange={handleUserInput}
                    value={userInput.fullName}
                  />
                  <p ref={rfvFullname}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Full Name Required</p>
                </div>
                <div className="col-md-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    name="userName"
                    placeholder="Username"
                    onChange={handleUserInput}
                    value={userInput.userName}
                  />
                  <p ref={rfvUsername}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Username Required</p>
                </div>

                <div className="col-md-12 form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                     onChange={handleUserInput}
                    value={userInput.password}
                  />
                  <p ref={rfvPassword}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Password Required</p>
                </div>

               

                <div className="col-md-12 form-group">
                     {error && <p className='text-danger'>{error}</p>}
                  <button type="submit" className="primary-btn">
                    Register
                  </button>
                  
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
    </>
    
  )
}
