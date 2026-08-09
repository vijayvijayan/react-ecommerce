import React, { useEffect, useState } from 'react'
import { BreadCrumbs } from '../Components/Page/BreadCrumbs'
import { useDispatch } from 'react-redux';
import { setArticleNew } from '../Storage/Redux/articleNewSlice';
import { useGetArticleNewByTemplateQuery } from '../Apis/articleNewApi';
import { MainLoader } from '../Components/Page/MainLoader';
import { useGetBlogPaginationQuery, useGetBlogTypeQuery } from '../Apis/blogApi';
import { blogModel, blogTypeModel } from '../Interface';
import { SD_Url } from '../Utility/SD';
import { BlogCard } from '../Components/Page/BlogCard';
import { Link } from 'react-router-dom';

type PageProps = {
  page_template: string;
};
export const Blog = ({page_template}:PageProps) => {
const dispatch=useDispatch();
const {data:article_data,isLoading:article_loading,error:article_error}=useGetArticleNewByTemplateQuery(page_template);
const {data:blogType_data,isLoading:blogType_loading,error:blogType_error}=useGetBlogTypeQuery(null);
const [page, setPage] = useState(1);
const [blogTypeId, setBlogTypeId] = useState(0);
const pageSize = 10; 
const { data:blog_data, isLoading:blog_loading } = useGetBlogPaginationQuery({
  blogTypeId: blogTypeId,
  page,
  pageSize,
});

const totalPages = blog_data
  ? Math.ceil(blog_data.totalCount / blog_data.pageSize)
  : 0;



useEffect(() => {
    if(article_data) dispatch(setArticleNew(article_data));
    }, [article_data, dispatch]);

 const handleFilterWithBlogType=(val:any)=>{
  setBlogTypeId(val);
 }

 if(article_loading || blogType_loading || blog_loading)
 {
        return <MainLoader/>
 }
 
return (
<>
<BreadCrumbs article={article_data?.result}/>
<section className="blog_categorie_area">
  <div className="container">
    <div className="row">
    {blogType_data!=null && blogType_data.result.length>0 && blogType_data.result.map((item:blogTypeModel)=>(
      <div className="col-lg-4" onClick={()=>handleFilterWithBlogType(item.blogTypeId)}>
        <div className="categories_post">
          <img src={SD_Url.FileUploadPath+ item.blogTypeImage} alt="post" />
          <div className="categories_details">
            <div className="categories_text">
              <a href='#'>
                <h5>{item.blogTypeName}</h5>
              </a>
              <div className="border_line"></div>
              <p>{item.blogTypeSubTitle}</p>
            </div>
          </div>
        </div>
      </div>
    )
    )}
    </div>
  </div>
</section>

<section className="blog_area">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="blog_left_sidebar">
{blog_data!=null && blog_data?.blogs.length>0 && blog_data?.blogs.map((item:blogModel) => (
   <BlogCard key={item.blogId} blogItem={item} />
))}
         

  <nav className="blog-pagination justify-content-center d-flex">
  <ul className="pagination">

    {/* Previous */}
    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
      <button
        className="page-link"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        <span className="lnr lnr-chevron-left"></span>
      </button>
    </li>

    {/* Page numbers */}
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
      <li
        key={p}
        className={`page-item ${p === page ? "active" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => setPage(p)}
        >
          {String(p).padStart(2, "0")}
        </button>
      </li>
    ))}

    {/* Next */}
    <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
      <button
        className="page-link"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        <span className="lnr lnr-chevron-right"></span>
      </button>
    </li>

  </ul>
</nav>


          {/* <nav className="blog-pagination justify-content-center d-flex">
            <ul className="pagination">
              <li className="page-item">
                <a href="#" className="page-link" aria-label="Previous">
                  <span aria-hidden="true">
                    <span className="lnr lnr-chevron-left"></span>
                  </span>
                </a>
              </li>
              <li className="page-item"><a href="#" className="page-link">01</a></li>
              <li className="page-item active"><a href="#" className="page-link">02</a></li>
              <li className="page-item"><a href="#" className="page-link">03</a></li>
              <li className="page-item"><a href="#" className="page-link">04</a></li>
              <li className="page-item"><a href="#" className="page-link">09</a></li>
              <li className="page-item">
                <a href="#" className="page-link" aria-label="Next">
                  <span aria-hidden="true">
                    <span className="lnr lnr-chevron-right"></span>
                  </span>
                </a>
              </li>
            </ul>
          </nav> */}

        </div>
      </div>
    </div>
  </div>
</section>

</>
)
}
