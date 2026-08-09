import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useGetArticleNewByTemplateQuery } from '../Apis/articleNewApi';
import { BreadCrumbs } from '../Components/Page/BreadCrumbs';
import { MainLoader } from '../Components/Page/MainLoader';
import { inputHelper } from '../Helper';
import { useLoginUserMutation } from '../Apis/authApi';
import { setLoggedInUser } from '../Storage/Redux/userAuth';
import { userModel } from '../Interface';
import jwt_decode from 'jwt-decode';
import apiResponse from '../Interface/apiResponse';

type PageProps = {
  page_template: string;
};
export const Login = ({page_template}:PageProps) => {
    const dispatch = useDispatch();
    const [userInput,setUserInput]=useState(
    {
      userName:"",
      password:"",
    }
  ); 
    const[loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const navigate=useNavigate();
     const [loginUser]=useLoginUserMutation();
    
    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!handleValidation())
    {
      return;
    } 
    setLoading(true);
    const response: apiResponse=await loginUser({
      userName:userInput.userName,
      password:userInput.password,
    })

    if(response.data)
    {
      //console.log(response.data);
      const {token}=response.data.result;
       const {fullName,id,email,role}: userModel=jwt_decode(token);
       dispatch(setLoggedInUser({fullName,id,email,role}));
      localStorage.setItem("token",token);
      navigate("/");
    }
     else if(response.error){
       console.log(response.error.data.errorMessages[0]);
       setError(response.error.data.errorMessages[0]);
     }
    setLoading(false);
   }

    const handleUserInput=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const tempData=inputHelper(e,userInput);
        setUserInput(tempData);
    }

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
      return isValid; 
    };

    const {data:article_data,isLoading:article_loading}=useGetArticleNewByTemplateQuery("login");
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
              <div className="hover">
                <h4>New to our website?</h4>
                <p>
                  There are advances being made in science and technology everyday,
                  and a good example of this is the
                </p>
                <NavLink className="primary-btn" to="/register">
                  Create an Account
                </NavLink>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="login_form_inner">
              <h3>Log in to enter</h3>

              <form
                className="row login_form"
                onSubmit={handleSubmit}
                method="post"
                id="contactForm"
                
              >
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
                  <div className="creat_account">
                    <input type="checkbox" id="keepLoggedIn" name="keepLoggedIn" />
                    <label htmlFor="keepLoggedIn">Keep me logged in</label>
                  </div>
                </div>

                <div className="col-md-12 form-group">
                     {error && <p className='text-danger'>{error}</p>}
                  <button type="submit" className="primary-btn">
                    Log In
                  </button>
                  <a href="#">Forgot Password?</a>
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
