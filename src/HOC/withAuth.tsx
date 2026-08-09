import React from 'react'
const withAuth=(WrappedComponent:any)=>{
    return(props:any)=>{
        const accesstoken=localStorage.getItem("token");
        if(!accesstoken)
        {
            window.location.replace("/login");
            return null;
        }
            
        return <WrappedComponent {...props}/>
    }
}


export default withAuth;