import React, { useEffect } from 'react'
import { BreadCrumbs } from '../Components/Page/BreadCrumbs'
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useGetArticleNewByMenuIdQuery, useGetArticleNewByTemplateQuery } from '../Apis/articleNewApi';
import { setArticleNew } from '../Storage/Redux/articleNewSlice';
import { MainLoader } from '../Components/Page/MainLoader';
import { useGetShopCategoriesQuery, useGetshopProductQuery, useGetShopSubCategoriesQuery } from '../Apis/shopProductApi';
import { shopCategoryModel } from '../Interface/shopCategoryModel';
import { shopSubCategoryModel } from '../Interface/shopSubCategoryModel';
import { shopProductModel } from '../Interface/shopProductModel';
import { SD_Url } from '../Utility/SD';

type PageProps = {
  page_template: string;
};

export const ShopProduct = ({page_template}:PageProps) => {
   const dispatch = useDispatch();
   
    const { subCategoryId } = useParams<{ subCategoryId: string }>();
    const subCategoryId_formated=Number((subCategoryId!=null && subCategoryId!="")?subCategoryId:0);
    const {data:article_data,isLoading:article_loading}=useGetArticleNewByTemplateQuery(page_template);
    const {data:category_data,isLoading:category_loading}=useGetShopCategoriesQuery(null);
    const {data:subcategory_data,isLoading:subcategory_loading}=useGetShopSubCategoriesQuery(null);
    
    const{data:product_data,isLoading:product_loading,error:product_error}=useGetshopProductQuery({count:0,subCategoryId:0});
   
    useEffect(() => {
        if(article_data) dispatch(setArticleNew(article_data));
      }, [article_data, dispatch]);

      if (article_loading || category_loading || subcategory_loading || product_loading) {
          return <MainLoader />
        }
       
      
  return (
  <>
  <BreadCrumbs article={article_data?.result}/>
    <div className="container">
  <div className="row">
    <div className="col-xl-3 col-lg-4 col-md-5">
      <div className="sidebar-categories">
        <div className="head">Browse Categories</div>
        <ul className="main-categories">
          {category_data!=null && category_data.result.length>0 && category_data.result.map((item:shopCategoryModel)=>
          {
            const categoryCount= product_data!=null && product_data.result.length>0 ? product_data.result.filter((i:any)=>i.shopSubCategory?.shopCategoryId==item.shopCategoryId).length : 0;
            return(
              <li className="main-nav-list">
              <a
                data-toggle="collapse"
                href={"#a"+item.shopCategoryId}
                aria-expanded="false"
                aria-controls={"a"+item.shopCategoryId}
              >
                <span className="lnr lnr-arrow-right"></span>
                {item.shopCategoryName}
                <span className="number">({categoryCount})</span>
              </a>

              <ul
                className="collapse"
                id={"a"+item.shopCategoryId}
                data-toggle="collapse"
                aria-expanded="false"
                aria-controls={"a"+item.shopCategoryId}
              >
                {
                
                subcategory_data!=null && subcategory_data.result.length>0 && subcategory_data.result.filter((i:shopSubCategoryModel)=>i.shopCategoryId==item.shopCategoryId).map((subitem:shopSubCategoryModel)=>
                  {
                  const subcategoryCount= product_data!=null && product_data.result.length>0 ? product_data.result.filter((i:any)=>i.shopSubCategoryId==subitem.shopSubCategoryId).length : 0;
                  return(
                    <li className="main-nav-list child" key={subitem.shopSubCategoryId}>
                    <Link to={`/ShopProduct/${subitem.shopSubCategoryId}`}>{subitem.shopSubCategoryName}<span className="number">({subcategoryCount})</span></Link>
                    </li>
                  ) 
                }
                )
                }
                
              </ul>
            </li>
          )
        }

          )
          }
          

        </ul>
      </div>

      <div className="sidebar-filter mt-50">
        <div className="top-filter-head">Product Filters</div>

        <div className="common-filter">
          <div className="head">Brands</div>
          <form>
            <ul>
              <li className="filter-list">
                <input className="pixel-radio" type="radio" id="apple" name="brand" />
                <label htmlFor="apple">Apple<span>(29)</span></label>
              </li>
              <li className="filter-list">
                <input className="pixel-radio" type="radio" id="asus" name="brand" />
                <label htmlFor="asus">Asus<span>(29)</span></label>
              </li>
              <li className="filter-list">
                <input className="pixel-radio" type="radio" id="gionee" name="brand" />
                <label htmlFor="gionee">Gionee<span>(19)</span></label>
              </li>
              <li className="filter-list">
                <input className="pixel-radio" type="radio" id="micromax" name="brand" />
                <label htmlFor="micromax">Micromax<span>(19)</span></label>
              </li>
              <li className="filter-list">
                <input className="pixel-radio" type="radio" id="samsung" name="brand" />
                <label htmlFor="samsung">Samsung<span>(19)</span></label>
              </li>
            </ul>
          </form>
        </div>

        <div className="common-filter">
          <div className="head">Color</div>
          <form>
            <ul>
              <li className="filter-list">
                <input className="pixel-radio" type="radio" id="black" name="color" />
                <label htmlFor="black">Black<span>(29)</span></label>
              </li>
              <li className="filter-list">
                <input className="pixel-radio" type="radio" id="blackleather" name="color" />
                <label htmlFor="blackleather">Black Leather<span>(29)</span></label>
              </li>
              <li className="filter-list">
                <input className="pixel-radio" type="radio" id="blackred" name="color" />
                <label htmlFor="blackred">Black with red<span>(19)</span></label>
              </li>
              <li className="filter-list">
                <input className="pixel-radio" type="radio" id="gold" name="color" />
                <label htmlFor="gold">Gold<span>(19)</span></label>
              </li>
              <li className="filter-list">
                <input className="pixel-radio" type="radio" id="spacegrey" name="color" />
                <label htmlFor="spacegrey">Spacegrey<span>(19)</span></label>
              </li>
            </ul>
          </form>
        </div>

        <div className="common-filter">
          <div className="head">Price</div>
          <div className="price-range-area">
            <div id="price-range"></div>
            <div className="value-wrapper d-flex">
              <div className="price">Price:</div>
              <span>$</span>
              <div id="lower-value"></div>
              <div className="to">to</div>
              <span>$</span>
              <div id="upper-value"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="col-xl-9 col-lg-8 col-md-7">
      <div className="filter-bar d-flex flex-wrap align-items-center">
        <div className="sorting">
          <select>
            <option>Default sorting</option>
          </select>
        </div>
        <div className="sorting mr-auto">
          <select>
            <option>Show 12</option>
          </select>
        </div>
        <div className="pagination">
          <a href="#" className="prev-arrow">
            <i className="fa fa-long-arrow-left"></i>
          </a>
          <a href="#" className="active">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#" className="dot-dot">
            <i className="fa fa-ellipsis-h"></i>
          </a>
          <a href="#">6</a>
          <a href="#" className="next-arrow">
            <i className="fa fa-long-arrow-right"></i>
          </a>
        </div>
      </div>

      <section className="lattest-product-area pb-40 category-list">
        <div className="row">
          
          {product_data!=null && product_data.result.length &&   (subCategoryId_formated !== 0
    ? product_data.result.filter(
        (i: shopProductModel) =>
          i.shopSubCategoryId === subCategoryId_formated
      )
    : product_data.result
  ).map((item:shopProductModel)=>(
            <div className="col-lg-4 col-md-6">
              
                <div className="single-product">
                <img className="img-fluid" src={SD_Url.FileUploadPath+item.productImage} alt="" />
                <div className="product-details">
                  <h6>{item.productName}</h6>
                  <div className="price">
                    <h6>${item.productSellingPrice?.toFixed(2)}</h6>
                    <h6 className="l-through">${item.productPrice?.toFixed(2)}</h6>
                  </div>
                  <div className="prd-bottom">
                    <a href="#" className="social-info">
                      <span className="ti-bag"></span>
                      <p className="hover-text">add to bag</p>
                    </a>
                    <a href="#" className="social-info">
                      <span className="lnr lnr-heart"></span>
                      <p className="hover-text">Wishlist</p>
                    </a>
                    <a href="#" className="social-info">
                      <span className="lnr lnr-sync"></span>
                      <p className="hover-text">compare</p>
                    </a>
                    <Link to={`/productDetails/${item.shopProductId}`} className="social-info">
                      <span className="lnr lnr-move"></span>
                      <p className="hover-text">view more</p>
                    </Link>
                  </div>
                </div>
                </div>
              
            </div>
          )
        )}
            

          
        </div>
      </section>

      <div className="filter-bar d-flex flex-wrap align-items-center">
        <div className="sorting mr-auto">
          <select>
            <option>Show 12</option>
          </select>
        </div>
        <div className="pagination">
          <a href="#" className="prev-arrow">
            <i className="fa fa-long-arrow-left"></i>
          </a>
          <a href="#" className="active">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#" className="dot-dot">
            <i className="fa fa-ellipsis-h"></i>
          </a>
          <a href="#">6</a>
          <a href="#" className="next-arrow">
            <i className="fa fa-long-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
    </div>
    {/* Start related-product Area */}
    <section className="related-product-area section_gap">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="section-title">
              <h1>Deals of the Week</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-9">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                <div className="single-related-product d-flex">
                  <a href="#">
                    <img src="/img/r1.jpg" alt="" />
                  </a>
                  <div className="desc">
                    <a href="#" className="title">Black lace Heels</a>
                    <div className="price">
                      <h6>$189.00</h6>
                      <h6 className="l-through">$210.00</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                <div className="single-related-product d-flex">
                  <a href="#">
                    <img src="/img/r2.jpg" alt="" />
                  </a>
                  <div className="desc">
                    <a href="#" className="title">Black lace Heels</a>
                    <div className="price">
                      <h6>$189.00</h6>
                      <h6 className="l-through">$210.00</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                <div className="single-related-product d-flex">
                  <a href="#">
                    <img src="/img/r3.jpg" alt="" />
                  </a>
                  <div className="desc">
                    <a href="#" className="title">Black lace Heels</a>
                    <div className="price">
                      <h6>$189.00</h6>
                      <h6 className="l-through">$210.00</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                <div className="single-related-product d-flex">
                  <a href="#">
                    <img src="/img/r5.jpg" alt="" />
                  </a>
                  <div className="desc">
                    <a href="#" className="title">Black lace Heels</a>
                    <div className="price">
                      <h6>$189.00</h6>
                      <h6 className="l-through">$210.00</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                <div className="single-related-product d-flex">
                  <a href="#">
                    <img src="/img/r6.jpg" alt="" />
                  </a>
                  <div className="desc">
                    <a href="#" className="title">Black lace Heels</a>
                    <div className="price">
                      <h6>$189.00</h6>
                      <h6 className="l-through">$210.00</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                <div className="single-related-product d-flex">
                  <a href="#">
                    <img src="/img/r7.jpg" alt="" />
                  </a>
                  <div className="desc">
                    <a href="#" className="title">Black lace Heels</a>
                    <div className="price">
                      <h6>$189.00</h6>
                      <h6 className="l-through">$210.00</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="single-related-product d-flex">
                  <a href="#">
                    <img src="/img/r9.jpg" alt="" />
                  </a>
                  <div className="desc">
                    <a href="#" className="title">Black lace Heels</a>
                    <div className="price">
                      <h6>$189.00</h6>
                      <h6 className="l-through">$210.00</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="single-related-product d-flex">
                  <a href="#">
                    <img src="/img/r10.jpg" alt="" />
                  </a>
                  <div className="desc">
                    <a href="#" className="title">Black lace Heels</a>
                    <div className="price">
                      <h6>$189.00</h6>
                      <h6 className="l-through">$210.00</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="single-related-product d-flex">
                  <a href="#">
                    <img src="/img/r11.jpg" alt="" />
                  </a>
                  <div className="desc">
                    <a href="#" className="title">Black lace Heels</a>
                    <div className="price">
                      <h6>$189.00</h6>
                      <h6 className="l-through">$210.00</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="ctg-right">
              <a href="#" target="_blank" rel="noreferrer">
                <img
                  className="img-fluid d-block mx-auto"
                  src="/img/category/c5.jpg"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* End related-product Area */}

  </>
  )
}
