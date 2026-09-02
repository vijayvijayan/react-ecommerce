import React, { useEffect, useState } from "react";
import { BreadCrumbs } from "../Components/Page/BreadCrumbs";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  useGetArticleNewByMenuIdQuery,
  useGetArticleNewByTemplateQuery,
} from "../Apis/articleNewApi";
import { setArticleNew } from "../Storage/Redux/articleNewSlice";
import { MainLoader } from "../Components/Page/MainLoader";
import {
  useGetShopCategoriesQuery,
  useGetShopProductPaginationQuery,
  useGetshopProductQuery,
  useGetShopSubCategoriesQuery,
} from "../Apis/shopProductApi";
import { shopCategoryModel } from "../Interface/shopCategoryModel";
import { shopSubCategoryModel } from "../Interface/shopSubCategoryModel";
import { shopProductModel } from "../Interface/shopProductModel";
import { SD_Url } from "../Utility/SD";
import { RelatedProductSection } from "../Components/Page/Home/RelatedProductSection";

type PageProps = {
  page_template: string;
};

export const ShopProduct = ({ page_template }: PageProps) => {
  const dispatch = useDispatch();

  const { subCategoryId } = useParams<{ subCategoryId: string }>();
  const subCategoryId_formated = Number(
    subCategoryId != null && subCategoryId != "" ? subCategoryId : 0,
  );
  const { data: article_data, isLoading: article_loading } =
    useGetArticleNewByTemplateQuery(page_template);
  const { data: category_data, isLoading: category_loading } =
    useGetShopCategoriesQuery(null);
  const { data: subcategory_data, isLoading: subcategory_loading } =
    useGetShopSubCategoriesQuery(null);

  //const{data:product_data,isLoading:product_loading,error:product_error}=useGetshopProductQuery({count:0,subCategoryId:0});
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("default");
  const [pageSize, setPageSize] = useState(12);
  const {
    data: product_data,
    isLoading: product_loading,
    error: product_error,
  } = useGetShopProductPaginationQuery({
    subCategoryId: subCategoryId_formated,
    page,
    pageSize,
    sort,
  });

  const totalPages = product_data
    ? Math.ceil(product_data.totalCount / product_data.pageSize)
    : 0;

  const handleFilterWithSort = (val: any) => {
    setSort(val);
    setPage(1);
  };

  const handleFilterWithPageSize = (val: any) => {
    setPageSize(Number(val));
    setPage(1);
  };

  useEffect(() => {
    if (article_data) dispatch(setArticleNew(article_data));
  }, [article_data, dispatch]);

  if (
    article_loading ||
    category_loading ||
    subcategory_loading ||
    product_loading
  ) {
    return <MainLoader />;
  } else {
    console.log(product_data);
  }

  return (
    <>
      <BreadCrumbs article={article_data?.result} />
      <div className="container">
        <div className="row" style={{marginBottom:"20px"}}>
          <div className="col-xl-3 col-lg-4 col-md-5">
            <div className="sidebar-categories">
              <div className="head">Browse Categories</div>
              <ul className="main-categories">
                {category_data != null &&
                  category_data.result.length > 0 &&
                  category_data.result.map((item: shopCategoryModel) => {
                    //const categoryCount= product_data!=null && product_data.products.length>0 ? product_data.products.filter((i:any)=>i.shopSubCategory?.shopCategoryId==item.shopCategoryId).length : 0;

                    return (
                      <li className="main-nav-list">
                        <a
                          data-toggle="collapse"
                          href={"#a" + item.shopCategoryId}
                          aria-expanded="false"
                          aria-controls={"a" + item.shopCategoryId}
                        >
                          <span className="lnr lnr-arrow-right"></span>
                          {item.shopCategoryName}
                          <span className="number">
                            ({item.shopProductCount})
                          </span>
                        </a>

                        <ul
                          className="collapse"
                          id={"a" + item.shopCategoryId}
                          data-toggle="collapse"
                          aria-expanded="false"
                          aria-controls={"a" + item.shopCategoryId}
                        >
                          {subcategory_data != null &&
                            subcategory_data.result.length > 0 &&
                            subcategory_data.result
                              .filter(
                                (i: shopSubCategoryModel) =>
                                  i.shopCategoryId == item.shopCategoryId,
                              )
                              .map((subitem: shopSubCategoryModel) => {
                                //const subcategoryCount= product_data!=null && product_data.products.length>0 ? product_data.products.filter((i:any)=>i.shopSubCategoryId==subitem.shopSubCategoryId).length : 0;
                                return (
                                  <li
                                    className="main-nav-list child"
                                    key={subitem.shopSubCategoryId}
                                  >
                                    <Link
                                      to={`/ShopProduct/${subitem.shopSubCategoryId}`}
                                    >
                                      {subitem.shopSubCategoryName}
                                      <span className="number">
                                        ({subitem.shopProductCount})
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                        </ul>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>

          <div className="col-xl-9 col-lg-8 col-md-7">
            {product_data != null && product_data.products.length > 0 ? (
              <>
                <div className="filter-bar d-flex flex-wrap align-items-center">
                  <div className="sorting">
                    <select
                      className="sort form-control"
                      onChange={(e) => handleFilterWithSort(e.target.value)}
                    >
                      <option>Default sorting</option>
                      <option value="newest">Newest first</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                      <option value="name_asc">Name: A to Z</option>
                      <option value="name_desc">Name: Z to A</option>
                    </select>
                  </div>
                  <div className="sorting mr-auto">
                    <select
                      className="pageSize form-control"
                      onChange={(e) => handleFilterWithPageSize(e.target.value)}
                    >
                      <option>Show 12</option>
                      <option value="24">Show 24</option>
                      <option value="36">Show 36</option>
                      <option value="48">Show 48</option>
                    </select>
                  </div>

                  <div className="pagination" style={{ float: "right" }}>
                    {/* Previous */}
                    {/* Previous */}
                    <a
                      className={`page-item ${
                        page === 1 ? "pagination-disabled" : "prev-arrow"
                      }`}
                      onClick={() => {
                        if (page > 1) {
                          setPage(page - 1);
                        }
                      }}
                      aria-disabled={page === 1}
                    >
                      <i className="fa fa-long-arrow-left"></i>
                    </a>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <a
                          href="#"
                          key={p}
                          onClick={() => setPage(p)}
                          className={`page-item ${p === page ? "active" : ""}`}
                        >
                          {String(p).padStart(2, "0")}
                        </a>
                      ),
                    )}

                    {/* Next */}
                    {/* Next */}
                    <a
                      className={`page-item ${
                        page === totalPages
                          ? "pagination-disabled"
                          : "next-arrow"
                      }`}
                      onClick={() => {
                        if (page < totalPages) {
                          setPage(page + 1);
                        }
                      }}
                      aria-disabled={page === totalPages}
                    >
                      <i className="fa fa-long-arrow-right"></i>
                    </a>
                  </div>
                  {/* <div className="pagination">
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
        </div> */}
                </div>

                <section className="lattest-product-area pb-40 category-list">
                  <div className="row">
                    {product_data != null &&
                      product_data.products.length &&
                      (subCategoryId_formated !== 0
                        ? product_data.products.filter(
                            (i: shopProductModel) =>
                              i.shopSubCategoryId === subCategoryId_formated,
                          )
                        : product_data.products
                      ).map((item: shopProductModel) => (
                        <div className="col-lg-4 col-md-6">
                          <div className="single-product">
                            <Link to={`/productDetails/${item.shopProductId}`}>
                              <img
                                className="img-fluid"
                                src={SD_Url.FileUploadPath + item.productImage}
                                alt=""
                              />
                            </Link>
                            <div className="product-details">
                              <h6>
                                <Link
                                  to={`/productDetails/${item.shopProductId}`}
                                >
                                  {item.productName}
                                </Link>
                              </h6>
                              <div className="price">
                                <h6>${item.productSellingPrice?.toFixed(2)}</h6>
                                <h6 className="l-through">
                                  ${item.productPrice?.toFixed(2)}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </section>

                <div
                  style={{ marginBottom: "100px", display: "flow-root" }}
                  className="filter-bar  flex-wrap align-items-center"
                >
                  {/* d-flex */}
                  <div className=" mr-auto shop-product-pagination">
                    <div className="pagination" style={{ float: "right" }}>
                      {/* Previous */}
                      {/* Previous */}
                      <a
                        className={`page-item ${
                          page === 1 ? "pagination-disabled" : "prev-arrow"
                        }`}
                        onClick={() => {
                          if (page > 1) {
                            setPage(page - 1);
                          }
                        }}
                        aria-disabled={page === 1}
                      >
                        <i className="fa fa-long-arrow-left"></i>
                      </a>

                      {/* Page Numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (p) => (
                          <a
                            href="#"
                            key={p}
                            onClick={() => setPage(p)}
                            className={`page-item ${p === page ? "active" : ""}`}
                          >
                            {String(p).padStart(2, "0")}
                          </a>
                        ),
                      )}

                      {/* Next */}
                      {/* Next */}
                      <a
                        className={`page-item ${
                          page === totalPages
                            ? "pagination-disabled"
                            : "next-arrow"
                        }`}
                        onClick={() => {
                          if (page < totalPages) {
                            setPage(page + 1);
                          }
                        }}
                        aria-disabled={page === totalPages}
                      >
                        <i className="fa fa-long-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-products-wrapper">
                <div className="no-products">
                  <h3>No Products Found</h3>

                  <p>
                    We couldn't find any products in this category. Please try
                    browsing other categories or check back later.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Start related-product Area */}
      <RelatedProductSection />
      {/* End related-product Area */}
    </>
  );
};
