import React from "react";
import ReactLoading from "react-loading";
import './loading.css'

const Loading = () => (
    <div className="parent">
        <ReactLoading className="center" type={"cubes"} color={"#000000"} height={"10%"} width={"10%"}/>
    </div>
);

export default Loading;
