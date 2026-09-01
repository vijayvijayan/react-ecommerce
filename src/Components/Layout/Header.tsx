import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { useGetMenuQuery } from "../../Apis/menuApi";
import { setMenu } from "../../Storage/Redux/menuSlice";
import { MainLoader } from "../Page/MainLoader";
import { menuModel, userModel } from "../../Interface";
import { RootState } from '../../Storage/Redux/store';
import { shopCategoryModel } from "../../Interface/shopCategoryModel";
import { emptyUserState, setLoggedInUser } from "../../Storage/Redux/userAuth";
export const Header = () => {
 const dispatch = useDispatch();
 const userAuthFromStore:userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );


 const shoppingCartFromStore = useSelector(
   (state: RootState) => state.shoppingCartStore.cartItems
 );
 const navigate=useNavigate();

  const {
    data: menu_data,
    isLoading: menu_loading
  } = useGetMenuQuery(null);

  const handleLogout=()=>{
        localStorage.removeItem("token");
        dispatch(setLoggedInUser({...emptyUserState}));
        navigate("/login");
    }
  /* ---------------------------
     KEEP EXISTING JQUERY LOGIC
  ---------------------------- */
  useEffect(() => {
    const $ = (window as any).$;
    if (!$) return;

    $("#search_input_box").hide();

    $("#search")
      .off("click")
      .on("click", () => {
        $("#search_input_box").slideToggle();
        $("#search_input").focus();
      });

    $("#close_search")
      .off("click")
      .on("click", () => {
        $("#search_input_box").slideUp(500);
      });

    $(".navbar-nav li.dropdown")
      .off("mouseenter mouseleave")
      .on("mouseenter", function (this: HTMLElement) {
        $(this).find(".dropdown-menu").stop(true, true).fadeIn(300);
      })
      .on("mouseleave", function (this: HTMLElement) {
        $(this).find(".dropdown-menu").stop(true, true).fadeOut(300);
      });

    $(".sticky-header").sticky();

    if (menu_data) {
      dispatch(setMenu(menu_data));
    }
  }, [menu_data, dispatch]);

  /* ---------------------------
     LOADING STATE
  ---------------------------- */
  if (menu_loading) {
    return <MainLoader />;
  }

  /* ---------------------------
     MENU LIST (REACT-CORRECT)
  ---------------------------- */
  const fullMenuItems = menu_data?.result
    ?.filter(
      (menuItem: menuModel) =>
        menuItem.parentId === 0 &&
        menuItem.linkType !== "Upper Top Menu"
    )
    .map((menuItem: menuModel) => {
      const subMenuList = menu_data.result.filter(
        (i: menuModel) => i.parentId === menuItem.id
      );

      const renderLink = (item: menuModel) => {
        // External link
        if (item.linkType === "external") {
          return item.targetType === "blank" ? (
            <a
              className="nav-link"
              target="_blank"
              rel="noreferrer"
              href={item.link}
            >
              {item.menuName}
            </a>
          ) : (
            <NavLink className="nav-link" to={item.template}>
              {item.menuName}
            </NavLink>
          );
        }

        // Article
        if (item.template === "Article") {
          return (
            <NavLink
              className="nav-link"
              to={`${item.template}/${item.id}`}
            >
              {item.menuName}
            </NavLink>
          );
        }

        // ✅ EXACT ORIGINAL LOGIC
        if (item.template != null && item.template != 0) {
          return (
            <NavLink
              className="nav-link"
              to={`${item.template}`}
            >
              {item.menuName}
            </NavLink>
          );
        }

        // Home / default
        return (
          <NavLink className="nav-link" to="/">
            {item.menuName}
          </NavLink>
        );
      };

      // WITH SUBMENU
      if (subMenuList.length > 0) {
        return (
          <li
            key={menuItem.id}
            className="nav-item submenu dropdown"
          >
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {menuItem.menuName}
            </a>

            <ul className="dropdown-menu">
              {subMenuList.map((subItem: menuModel) => (
                <li key={subItem.id} className="nav-item">
                  {renderLink(subItem)}
                </li>
              ))}
            </ul>
          </li>
        );
      }

      // WITHOUT SUBMENU
      return (
        <li key={menuItem.id} className="nav-item">
          {renderLink(menuItem)}
        </li>
      );
    });

  /* ---------------------------
     JSX (UNCHANGED)
  ---------------------------- */
  return (
    <header className="header_area sticky-header">
      <div className="main_menu">
        <nav className="navbar navbar-expand-lg navbar-light main_box">
          <div className="container">

            <NavLink className="navbar-brand logo_h" to="/">
              <img src="/img/logo.png" alt="logo" />
            </NavLink>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <div
              className="collapse navbar-collapse offset"
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav menu_nav ml-auto">
                {fullMenuItems}
              </ul>

              
               
                {(userAuthFromStore.id!="")?
                  (
                    
                    <ul
                    className="nav navbar-nav menu_nav"
                    style={{ marginLeft: "40px" }}>
                    <li className="nav-item submenu dropdown">
                      <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false">
                        <span className="ti-user"></span>
                        <span style={{ marginLeft: "3px" }}>
                          {userAuthFromStore.fullName}
                        </span>
                      </a>

                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <Link className="nav-link" to="/MyBlogs">
                            My Blogs
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/login" className="nav-link" onClick={handleLogout}>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>

                  )
                  :
                  (
                   
                    <ul
                    className="nav navbar-nav menu_nav"
                    style={{ marginLeft: "40px" }}
                  >
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                        <span className="ti-user"></span>
                        <span style={{ marginLeft: "3px" }}>Login</span>
                      </NavLink>
                    </li>
                  </ul>

                  )  
                }
                 
                
          
              <ul
                className="nav navbar-nav menu_nav"
                style={{ marginLeft: "40px" }}
              >
                <li className="nav-item">
                  <NavLink to="/cart" className="nav-link">
                    <span className="ti-bag"></span>
                    <span style={{ marginLeft: "3px" }}>Cart</span>
                    <span> {
                        (shoppingCartFromStore.length>0) ? "("+shoppingCartFromStore.length+")" : ""
                      }</span>
                  </NavLink>
                </li>
              </ul>

              {/* <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                  <button className="search">
                    <span className="lnr lnr-magnifier" id="search"></span>
                  </button>
                </li>
              </ul> */}
            </div>

          </div>
        </nav>
      </div>

      <div className="search_input" id="search_input_box">
        <div className="container">
          <form className="d-flex justify-content-between">
            <input
              type="text"
              className="form-control"
              id="search_input"
              placeholder="Search Here"
            />
            <button type="submit" className="btn"></button>
            <span
              className="lnr lnr-cross"
              id="close_search"
              title="Close Search"
            ></span>
          </form>
        </div>
      </div>
    </header>
  );
};
