import React from 'react'
import { blogModel, blogTypeModel } from '../../Interface'
import { SD_Url } from '../../Utility/SD';
import { formatDate } from '../../Helper';
import { Link } from 'react-router-dom';
type BlogProp={
    blogItem:blogModel;
};
export const BlogCard = ({blogItem}:BlogProp) => {
  return (

    <article className="row blog_item">
            <div className="col-md-3">
              <div className="blog_info text-right">
                <ul className="blog_meta list">
                  <li>
                    <a href="#">{blogItem.blogTypeName} <i className="lnr lnr-book"></i></a>
                  </li>
                  <li>
                    <a href="#">{blogItem.fullName} <i className="lnr lnr-user"></i></a>
                  </li>
                  <li>
                    <a href="#">{formatDate(blogItem.createdDate)} <i className="lnr lnr-calendar-full"></i></a>
                  </li>
                  <li>
                    <a href="#">{blogItem.viewCount} Views <i className="lnr lnr-eye"></i></a>
                  </li>
                  {/* <li>
                    <a href="#">06 Comments <i className="lnr lnr-bubble"></i></a>
                  </li> */}
                </ul>
              </div>
            </div>

            <div className="col-md-9">
              <div className="blog_post">
                <img src={SD_Url.FileUploadPath+blogItem.blogImage} alt="" />
                <div className="blog_details">
                  <Link to={`/blogdetails/${blogItem.blogId}`}>
                    <h2>{blogItem.blogName}</h2>
                  </Link>
                  <p>
                    {blogItem.shortDescription}
                  </p>
                  <Link to={`/blogdetails/${blogItem.blogId}`} className="white_bg_btn">View More</Link>
                </div>
              </div>
            </div>
          </article>
    
  )
}
