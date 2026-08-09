import React, { useRef, useState } from 'react'
import { BreadCrumbs } from '../Components/Page/BreadCrumbs';
import { useDispatch } from 'react-redux';
import { useGetArticleNewByTemplateQuery } from '../Apis/articleNewApi';
import { MainLoader } from '../Components/Page/MainLoader';
import { useBlogCommentInsertMutation, useGetBlogCommentsUsingParentIdQuery, useGetBlogItemByBlogIdQuery, useGetBlogItemWithNextPrevQuery } from '../Apis/blogApi';
import { Link, useParams } from 'react-router-dom';
import { blogModel } from '../Interface';
import { SD_Url } from '../Utility/SD';
import { inputHelper, toastNotify } from '../Helper';
import apiResponse from '../Interface/apiResponse';
import { BlogCommentCard } from '../Components/Page/BlogCommentCard';

type PageProps = {
  page_template: string;
};
export const BlogDetails = ({page_template}:PageProps) => {
  const dispatch=useDispatch();
  const { blogId } = useParams<{ blogId: string}>();
  const numericBlogId = Number(blogId) ;
  const {data:blog_data,isLoading:blog_loading,error:blog_error}=useGetBlogItemWithNextPrevQuery(numericBlogId);
  const {data:comment_data,isLoading:comment_loading,error:comment_error}=useGetBlogCommentsUsingParentIdQuery({parentId: 0,blogId: numericBlogId});
  const blogItem= blog_data?.result?.find((i:any)=>i.blogId===numericBlogId);
  const prevBlogItem= blog_data?.result?.find((i:any)=>i.blogId<numericBlogId);
  const nextBlogItem= blog_data?.result?.find((i:any)=>i.blogId>numericBlogId);
  const {data:article_data,isLoading:article_loading,error:article_error}=useGetArticleNewByTemplateQuery(page_template);
  const [blogCommentInsert]=useBlogCommentInsertMutation();
    const [userInput,setUserInput]=useState(
      {
        fullName:"",
        emailId:"",
        subject:"",
        message:""
      }
    ); 
const [senderDetail,setSenderDetail]=useState(
      {
        selectedSender:"",
        selectedParentId:0,
      }
    ); 

   
  const handleReply = (senderName: string, commentId: number) => {
  setSenderDetail(prev => ({
    ...prev,
    selectedSender: senderName,
    selectedParentId: commentId
  }));
};


    const[loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      if(!handleValidation())
      {
        return;
      }
        setLoading(true);
        
        const response:apiResponse=await blogCommentInsert({  
          blogId: blogId,
          senderName: userInput.fullName,
          emailId: userInput.emailId,
          subject: userInput.subject,
          message: userInput.message,
          parentId: senderDetail.selectedParentId,
          createdDate: "2026-02-13T10:12:23.977Z",
          replyCount: 0
        })

        if(response.data)
        {
            toastNotify("Submitted Successfully.");
           
        }
        else if(response.error){
        
        setError(response.error.data.errorMessages[0]);
        }
        setLoading(false);
    }

     const handleUserInput=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=>{
        const tempData=inputHelper(e,userInput);
        setUserInput(tempData);
    }

    const rfvFullname= useRef<HTMLParagraphElement | null>(null); 
    const rfvEmailId= useRef<HTMLParagraphElement | null>(null); 
    const rfvSubject= useRef<HTMLParagraphElement | null>(null);
    const rfvMessage= useRef<HTMLParagraphElement | null>(null);

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
      if (userInput.emailId === '') {
          if(rfvEmailId.current) {
              rfvEmailId.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
         if(rfvEmailId.current) {
              rfvEmailId.current.style.display = 'none'; 
            }
      }
      if (userInput.subject === '') {
          if(rfvSubject.current) {
              rfvSubject.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
         if(rfvSubject.current) {
              rfvSubject.current.style.display = 'none'; 
            }
      }
      if (userInput.message === '') {
          if(rfvMessage.current) {
              rfvMessage.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
         if(rfvMessage.current) {
              rfvMessage.current.style.display = 'none'; 
            }
      }
      return isValid;
    };
  
   if(article_loading || blog_loading || comment_loading)
   {
          return <MainLoader/>
   }
  
  
  return (
    <>
     <BreadCrumbs article={article_data?.result}/>
     {/* blog area begin */}
    <section className="blog_area single-post-area section_gap">
  <div className="container">
    <div className="row">
      <div className="col-lg-12 posts-list">

        <div className="single-post row">
          <div className="col-lg-12">
            <div className="feature-img" style={{ textAlign: "center" }}>
              <img className="img-fluid" src={SD_Url.FileUploadPath+blogItem.blogImage} alt="" />
            </div>
          </div>

          <div className="col-lg-3 col-md-3">
            <div className="blog_info text-right">
              <ul className="blog_meta list">
                <li><a href="#">{blogItem?.blogType?.blogTypeName}<i className="lnr lnr-book"></i></a></li>
                <li><a href="#">{blogItem?.applicationUser?.fullName} <i className="lnr lnr-user"></i></a></li>
                <li><a href="#">{blogItem?.createdDate} <i className="lnr lnr-calendar-full"></i></a></li>
                <li><a href="#">{blogItem?.viewCount} Views <i className="lnr lnr-eye"></i></a></li>
                <li><a href="#">06 Comments <i className="lnr lnr-bubble"></i></a></li>
              </ul>

              <ul className="social-links">
                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fa fa-github"></i></a></li>
                <li><a href="#"><i className="fa fa-behance"></i></a></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-9 col-md-9 blog_details">
            <h2>{blogItem?.blogName}</h2>
            <p className="excert"  dangerouslySetInnerHTML={{
              __html: blogItem?.blogContent??""
            }}>
             
            </p>
            
          </div>
        </div>

        <div className="navigation-area">
          <div className="row">

<div className="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
    {prevBlogItem!=null ?
    (
    
      <>
                  <div className="thumb">
                    <Link to={`/blogdetails/${prevBlogItem.blogId}`}><img className="img-fluid" style={{width:"60px",height:"60px"}} src={SD_Url.FileUploadPath+prevBlogItem.blogImage} alt="" /></Link>
                  </div>
                  <div className="arrow">
                    <Link to={`/blogdetails/${prevBlogItem.blogId}`}><span className="lnr text-white lnr-arrow-left"></span></Link>
                  </div>
                  <div className="detials">
                    <p>Prev Post</p>
                    <Link to={`/blogdetails/${prevBlogItem.blogId}`}><h4>{prevBlogItem.blogName}</h4></Link>
                  </div>
                  </>
                
    )
    :""
    }
</div>

  <div className="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
        {nextBlogItem!=null ?
        (
          <>
                      <div className="detials">
                        <p>Next Post</p>
                        <Link to={`/blogdetails/${nextBlogItem.blogId}`}><h4>{nextBlogItem.blogName}</h4></Link>
                      </div>
                      <div className="arrow">
                        <Link to={`/blogdetails/${nextBlogItem.blogId}`}><span className="lnr text-white lnr-arrow-right"></span></Link>
                      </div>
                      <div className="thumb">
                        <Link to={`/blogdetails/${nextBlogItem.blogId}`}><img className="img-fluid" style={{width:"60px",height:"60px"}} src={SD_Url.FileUploadPath+nextBlogItem.blogImage} alt="" /></Link>
                      </div>
          </>
        )
        :""
        }
  </div>           

          </div>
        </div>

        <div className="comments-area">
          <h4>05 Comments</h4>
        {comment_data!=null && comment_data?.map((item:any)=>(
          <BlogCommentCard  onReplyClicked={handleReply} blogCommentItem={item}/>
        )
        )
        }
         

        </div>

        <div className="comment-form">
          <h4>Leave a Reply</h4>
          <form method='post' onSubmit={handleSubmit}>
            <div className="form-group form-inline">
              <div className="form-group col-lg-12 col-md-12" style={{display:`${(senderDetail.selectedParentId!=null && senderDetail.selectedParentId!=0)?"block":"none"}`}}>
                <b>Replying to @{senderDetail.selectedSender}</b>
              </div>

              <div className="form-group col-lg-6 col-md-6 name">
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

              <div className="form-group col-lg-6 col-md-6 email">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name='emailId'
                  onChange={handleUserInput}
                  value={userInput.emailId}
                  placeholder="Enter email address"
                />
                <p ref={rfvEmailId}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Email Id Required</p>
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="subject"
                name='subject'
                placeholder="Subject"
                 onChange={handleUserInput}
                  value={userInput.subject}
              />
              <p ref={rfvSubject}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Subject Required</p>
            </div>

            <div className="form-group">
              <textarea
                className="form-control mb-10"
                rows={5}
                name="message"
                placeholder="Message"
                 onChange={handleUserInput}
                  value={userInput.message}
              ></textarea>
              <p ref={rfvMessage}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Message Required</p>
            </div>

            <button type='submit' className="primary-btn submit_btn">
              Post Comment
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
    </section>
      {/* blog area end */}
    </>
  

    
  )
}
