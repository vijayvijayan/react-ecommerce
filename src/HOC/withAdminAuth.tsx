import React from 'react'
import jwt_decode from 'jwt-decode';
import { userModel } from '../Interface';
import { SD_Roles } from '../Utility/SD';
const withAdminAuth=(WrappedComponent:any)=>{
    return(props:any)=>{
        const accesstoken=localStorage.getItem("token")??"";
        if(accesstoken)
        {
            const decode:{role:string}=jwt_decode(accesstoken);
            if(decode.role!=SD_Roles.ADMIN)
            {
                window.location.replace("/accessDenied");
                return null;
            }
        }

        if(!accesstoken)
        {
            window.location.replace("/login");
            return null;
        }
       
            
        return <WrappedComponent {...props}/>
    }
}


export default withAdminAuth;