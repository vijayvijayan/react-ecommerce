import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetArticleNewByTemplateQuery } from '../Apis/articleNewApi';
import { BreadCrumbs } from '../Components/Page/BreadCrumbs';
import { setArticleNew } from '../Storage/Redux/articleNewSlice';
import { MainLoader } from '../Components/Page/MainLoader';
import { useBlogInsertMutation, useGetBlogItemByBlogIdQuery, useGetBlogTypeQuery } from '../Apis/blogApi';
import { blogTypeModel, userModel } from '../Interface';
import { Editor } from "@tinymce/tinymce-react";
import TinyEditor from '../Components/Page/TinyEditor';
import { inputHelper, toastNotify } from '../Helper';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../Storage/Redux/store';
import apiResponse from '../Interface/apiResponse';
import { SD_Url } from '../Utility/SD';
type PageProps = {
  page_template: string;
};
export const BlogUpsert = ({page_template}:PageProps) => {
  const dispatch=useDispatch();
   const userAuthFromStore:userModel = useSelector(
        (state: RootState) => state.userAuthStore
      );
  const {data:article_data,isLoading:article_loading,error:article_error}=useGetArticleNewByTemplateQuery(page_template);
  const {data:blogType_data,isLoading:blogType_loading,error:blogType_error}=useGetBlogTypeQuery(null);
  const { blogId } = useParams<{ blogId: string }>();
  const {data:blog_data,isLoading:blog_loading,error:blog_error}=useGetBlogItemByBlogIdQuery(blogId!, {
  skip: !blogId || blogId === "0"
});

    const [imageToStore, setImageToStore] = useState<any>("");
    const [imageToDisplay, setImageToDisplay] = useState<string>("");
     const[loading,setLoading]=useState(false);
        const [error,setError]=useState("");
        const navigate=useNavigate();
         const [blogInsert]=useBlogInsertMutation();
    const [userInput,setUserInput]=useState(
      {
        blogId:"0",
        blogName:"",
        blogTypeId:"",
        blogContent:"",
        activeFlag:false,
        shortDescription:"",
        blogImage:""
      }
    ); 
     
   useEffect(() => {
  if (blogId && blogId !== "0" && blog_data?.result) {
    setUserInput(prev => ({
      ...prev,
      blogId: blogId,
      blogName: blog_data.result.blogName ?? "",
      blogTypeId: blog_data.result.blogTypeId ?? "",
      blogContent: blog_data.result.blogContent ?? "",
      activeFlag: blog_data.result.activeFlag ?? false,
      shortDescription: blog_data.result.shortDescription ?? "",
      blogImage: blog_data.result.blogImage ?? ""
    }));
    setImageToDisplay(SD_Url.FileUploadPath+blog_data.result.blogImage);
  }
}, [blogId, blog_data]);


const rfvBlogImage= useRef<HTMLParagraphElement | null>(null);  
const rfvBlogName= useRef<HTMLParagraphElement | null>(null); 
const rfvBlogTypeId= useRef<HTMLParagraphElement | null>(null); 
const rfvBlogContent= useRef<HTMLParagraphElement | null>(null);    
const rfvShortDescription= useRef<HTMLParagraphElement | null>(null);    
 const handleUserInput=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
  const tempData=inputHelper(e,userInput);
        setUserInput(tempData);
    }
 const handleEditorChange = (value: string) => {
  setUserInput(prev => ({
    ...prev,
    blogContent: value, // or whatever field holds editor HTML
  }));
};

     const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
          
            if(!handleValidation())
            {
            return;
            } 
            setLoading(true); 
            const formData = new FormData();
            formData.append('BlogId', userInput.blogId);
            formData.append('BlogImageFile', imageToStore);
            formData.append('BlogName',userInput.blogName);
            formData.append('ActiveFlag',userInput.activeFlag?"true":"false");
            formData.append('BlogTypeId',userInput.blogTypeId);
            formData.append('BlogContent',userInput.blogContent);
            formData.append('ShortDescription',userInput.shortDescription);
            formData.append('BlogImage',"");
            formData.append('CreatedBy',userAuthFromStore.id);
            const response: apiResponse = await blogInsert(formData); 
             if(response.data?.isSuccess)
              {
                  toastNotify("Submitted Successfully!");
                  navigate("/myblogs");
              }
              else if(response.error){
              
              setError(response.error.data.errorMessages[0]);
              }
              setLoading(false);
    }

    const[count_down,setCountdown]=useState(270);
    const handleCountdown=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
     
      if(count_down==0)
      {

        return;
      }
      setCountdown(270-e.currentTarget.value.length);
       const tempData=inputHelper(e,userInput);
        setUserInput(tempData);
    }

     const handleValidation=()=>{
    var isValid=true;
      if (userInput.blogName === '') {
          if(rfvBlogName.current) {
              rfvBlogName.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
         if(rfvBlogName.current) {
              rfvBlogName.current.style.display = 'none'; 
            }
      }

      if (userInput.blogTypeId === '') {
          if(rfvBlogTypeId.current) {
              rfvBlogTypeId.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
        if(rfvBlogTypeId.current) {
              rfvBlogTypeId.current.style.display = 'none'; 
            }
      }

       if (userInput.shortDescription === '') {
          if(rfvShortDescription.current) {
             rfvShortDescription.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
        if(rfvShortDescription.current) {
             rfvShortDescription.current.style.display = 'none'; 
            }
      }

    if (userInput.blogImage === '') {
          if(rfvBlogImage.current) {
             rfvBlogImage.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
        if(rfvBlogImage.current) {
            rfvBlogImage.current.style.display = 'none'; 
        }
      }
      
      if (userInput.blogContent === '') {
          if(rfvBlogContent.current) {
             rfvBlogContent.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
        if(rfvBlogContent.current) {
            rfvBlogContent.current.style.display = 'none'; 
        }
      }
      return isValid;
  }
    
    const handleImageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files && e.target.files[0];
    if(file){
      const imgType=file.type.split("/")[1];
      const validImgTypes=["jpeg","jpg","png"];
      
      const isImageTypeValid=validImgTypes.filter((e)=>{
        return e===imgType;
      });

      if(file.size>1000*1024)
      {
        setImageToStore("");
        toastNotify("File Must be less than 1 MB","error");
        return;
      }
      else if(isImageTypeValid.length===0)
        {
          setImageToStore("");
          toastNotify("File Must be in jpeg, jpg or png","error");
          return;
        }

      const reader = new FileReader();
      reader.readAsDataURL(file);  // For images, read as Data URL
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageToStore(file);
        setImageToDisplay(result);  // For images, display the Base64 data URL
      };
      const tempData = inputHelper(e, userInput);
      setUserInput(tempData);
      
     
    }
   }

  useEffect(() => {
      if(article_data) dispatch(setArticleNew(article_data));
      }, [article_data, dispatch]);

  if(article_loading || blogType_loading)
   {
          return <MainLoader/>
   }

  return (
    <>
    <BreadCrumbs article={article_data?.result}/>
    <section className="login_box_area section_gap">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="login_form_inner">
          <h3>Write your mind</h3>

          <form
            className="row login_form"
            style={{ maxWidth: "none" }}
            method="post"
            onSubmit={handleSubmit}
            id="contactForm"
            noValidate
            encType="multipart/form-data"
          >
            <div className="col-md-12 form-group">
              <input
                name="blogName"
                type="text"
                className="form-control"
                placeholder="Blog Name"
                autoComplete="off"
                onChange={handleUserInput}
                value={userInput.blogName}
              />
              <p ref={rfvBlogName}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Blog Name Required</p>
            </div>

            <div className="col-md-12 form-group">
              <select name="blogTypeId" className="form-control" onChange={handleUserInput}
                value={userInput.blogTypeId}>
                <option value="">-Select-</option>
                {blogType_data!=null && blogType_data?.result?.length>0 && blogType_data?.result.map((item:blogTypeModel)=>(
                  <option value={item.blogTypeId}>{item.blogTypeName}</option>
                )
                )
                }
              </select>
               <p ref={rfvBlogTypeId}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Blog Type Required</p>
            </div>

            <div className="col-md-12 form-group">
              <textarea name="shortDescription"  onChange={handleCountdown} value={userInput.shortDescription}
                className="form-control"
                placeholder="Short Description"  
              ></textarea>

              <span  style={{ float: "left" }}>
                (Maximum characters: 270) You have {count_down} characters left.
              </span>
               <p ref={rfvShortDescription}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Short Description Required</p>
            </div>

            <div className="col-md-12 form-group">
              <div className="row">
                <div className="col-md-6">
                  <input name='blogImage' type="file" onChange={handleImageChange} className="form-control"/>
                   <p ref={rfvBlogImage}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Blog Image Required</p>
                </div>

                <div className="col-md-2">
                  
                  <img src={imageToDisplay} alt="" style={{ width: "80px" }} />
                </div>
              </div>
            </div>

            <div className="col-md-12 form-group" style={{ textAlign: "left" }}>
              {/* <textarea className="form-control summernote"></textarea> */}
             <TinyEditor value={userInput.blogContent} onChange={handleEditorChange} />
              <p ref={rfvBlogContent}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Blog Content Required</p>
            </div>

            <div className="col-md-12 form-group">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <input type="checkbox"  name="activeFlag"
  checked={userInput.activeFlag}
  onChange={handleUserInput} />
                <label style={{ marginLeft: "6px" }}>Publish</label>
              </div>
            </div>

            <div className="col-md-12 form-group">
              <button
                type="submit"
                value="submit"
                id="submitButton"
                className="primary-btn"
              >
                Submit
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
