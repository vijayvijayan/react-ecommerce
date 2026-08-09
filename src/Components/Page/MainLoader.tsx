import React from 'react'

export const MainLoader = () => {
  return (
    //  <div
    // style={{
    //     position:"fixed",
    //     top:"0",
    //     left:"0",
    //     width:"100vw",
    //     height:"100vh",
    //     display:"flex",
    //     alignItems:"center",
    //     justifyContent:"center",
    // }}
    // >
    //   <div className="spinner-border text-warning"
    //  style={{width:"4rem",height:"4rem",}}>
        
    // </div>
    // </div>
      <div className="fullscreen-loader">
      <div
        className="spinner-border text-warning"
        style={{ width: "4rem", height: "4rem" }}
        role="status"
      />
    </div>
  )
}
