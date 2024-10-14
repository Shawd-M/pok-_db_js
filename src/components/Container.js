import React from "react";

const Container = (props) => {
    return (
        <div style={{width:"100%", maxWidth:"970px", margin:"0 auto", paddingTop:"20px"}}>
            {props.children}
        </div>
    )
}

export default Container;