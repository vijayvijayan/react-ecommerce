import { useParams } from "react-router-dom";
import { ShopProduct } from './ShopProduct';
import { Login } from './Login';
import { Register } from './Register';
import ShoppingCart from "./ShoppingCart";
import { NotFound } from "./NotFound";
import { Checkout } from "./Checkout";
import { Blog } from "./Blog";
import { MyBlogs } from "./MyBlogs";
import { BlogUpsert } from "./BlogUpsert";
import { Tracking } from "./Tracking";
import { ContactUs } from "./ContactUs";
import { Thankyou } from "./Thankyou";


const PageResolver = () => {
  const { page_template } = useParams(); // product | news | cart

  switch (page_template?.toLowerCase()) {
  
    case "shopproduct":
      return <ShopProduct page_template={"ShopProduct"}/>;
    case "thankyou":
      return <Thankyou/>;
    case "tracking":
      return <Tracking page_template={"tracking"}/>;
    case "register":
    return <Register  page_template={"Register"}/>;
    case "contactus":
    return <ContactUs  page_template={"Contactus"}/>;
    case "cart":
    return <ShoppingCart page_template={"cart"} />;

    case "login":
      return <Login  page_template={"ShopProduct"}/>;
    case "checkout":
      return <Checkout  page_template={"Checkout"}/>;
    case "blog":
      return <Blog  page_template={"Blog"}/>;
    case "myblogs":
      return <MyBlogs  page_template={"Blog"}/>;
   
    default:
      return <NotFound />;
  }
};

export default PageResolver;
