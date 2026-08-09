import React from 'react'
import { articleNewModel } from '../../Interface'
interface lclArticleModel
{
  article: articleNewModel
} 
export const BreadCrumbs = ({article}:lclArticleModel) => {
  
  return (
    <section className="banner-area organic-breadcrumb">
      <div className="container">
        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
          <div className="col-first">
            <h1>{article.pageHeading}</h1>
            <nav className="d-flex align-items-center">
              <a href="/">
                Home <span className="lnr lnr-arrow-right"></span>
              </a>
              {(article.menu?.parentId!=0)?
                (
                  <a href="#">
                Shop <span className="lnr lnr-arrow-right"></span>
              </a>
                )
                :
                ""
              }
              
              <a href="single-product.html">{article.pageHeading}</a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}
