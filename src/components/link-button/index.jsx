import React, {Component} from "react";
import './index.less'

export default function LinkButton(props){
    return <button onClick={props.onClick || function(){}} className="link-button">{props.children}</button>
};