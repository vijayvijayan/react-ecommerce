import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetArticleNewByTemplateQuery } from '../Apis/articleNewApi';
import { BreadCrumbs } from '../Components/Page/BreadCrumbs';
import { useBlogDeleteMutation, useGetBlogByUserIdQuery } from '../Apis/blogApi';
import { RootState } from '../Storage/Redux/store';
import { blogModel, userModel } from '../Interface';
import { setArticleNew } from '../Storage/Redux/articleNewSlice';
import { MainLoader } from '../Components/Page/MainLoader';
import { SD_Url } from '../Utility/SD';
import { Link } from 'react-router-dom';
import { toastNotify } from '../Helper';
import { setBlog } from '../Storage/Redux/blogSlice';
type PageProps = {
  page_template: string;
};
export const MyBlogs = ({page_template}:PageProps) => {
    const dispatch=useDispatch();
    const userAuthFromStore:userModel = useSelector(
        (state: RootState) => state.userAuthStore
      );
    
    const {data:article_data,isLoading:article_loading,error:article_error}=useGetArticleNewByTemplateQuery(page_template);
    const {data:blog_data,isLoading:blog_loading,error:blog_error}=useGetBlogByUserIdQuery(userAuthFromStore.id);
const [blogDelete] =useBlogDeleteMutation();

   const handleDeleteBlog = async (blogId: number) => {
  try {
    await blogDelete(blogId).unwrap();
    toastNotify("Deleted Successfully!");
  } catch {
    toastNotify("Delete failed", "error");
  }
};


    // useEffect(() => {
    //     if(article_data) dispatch(setArticleNew(article_data));
    //     if(blog_data) dispatch(setBlog(blog_data));
    //     }, [article_data,blog_data, dispatch]);

    if(article_loading || blog_loading)
     {
            return <MainLoader/>
     }
  return (
   <>
    <BreadCrumbs article={article_data?.result} />
    <section className="login_box_area section_gap">
    <div className="container">
        <div className="row">
        <div className="col-lg-12">
            <div className="card">
            <div className="card-header">
                <a
                className="btn btn-default btn-sm"
                style={{ cursor: "pointer", float: "right" }}
                href="/blogupsert/0"
                >
                <i className="fa fa-edit white"></i> Add Blog
                </a>
            </div>

            {/* /.card-header */}
            <div className="card-body">
                <table
                id="example1"
                className="table table-bordered table-striped"
                >
                <thead>
                    <tr>
                    <th></th>
                    <th>Blog Name</th>
                    <th>Blog Type</th>
                    <th>Published</th>
                    <th>Updated By</th>
                    <th>Updated On</th>
                    <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        blog_data!=null && blog_data?.result.length>0 && blog_data?.result.map((item:any)=>(
                            <tr>
                    <td>
                        <img
                        style={{ width: "60px" }}
                        src={SD_Url.FileUploadPath+item.blogImage}
                        alt="blog"
                        />
                    </td>
                    <td>{item.blogName}</td>
                    <td>{item.blogType.blogTypeName}</td>
                    <td>{item.activeFlag?"True":"False"}</td>
                    <td>{item.applicationUser.fullName}</td>
                    <td>{item.createdDate}</td>
                    <td>
                        <div className="text-center">
                        <Link
                            to={`/blogupsert/${item.blogId}`}
                            className="btn btn-default btn-sm"
                            style={{ cursor: "pointer" }}>
                            <i className="fa fa-edit white"></i> Edit
                        </Link>

                        {/* <Link
                            to="#" onClick={()=>handleDeleteBlog()}
                            className="btn btn-default btn-sm"
                            style={{ cursor: "pointer", marginLeft: "5px" }}
                        >
                            <i className="fa fa-edit white"></i> Delete
                        </Link> */}
                        <button
                        type="button"
                        onClick={() => handleDeleteBlog(item.blogId)}
                        className="btn btn-default btn-sm"
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                        >
                        <i className="fa fa-trash white"></i> Delete
                        </button>
                        </div>
                    </td>
                    </tr>
                        )
                    )
                    }
                    
                   
                </tbody>
                </table>
            </div>
            {/* /.card-body */}
            </div>
        </div>
        </div>
    </div>
    </section>
   </>

  )
}
