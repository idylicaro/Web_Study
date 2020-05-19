import React from "react";
import  "../scss/Button.scss";

export default props =>
    <button 
    onClick={e => props.click && props.click(props.label)}
    className={`
        button
        ${props.operation ? 'operation' : ''}
        ${props.double ? 'double' : ''}
        ${props.triple ? 'triple' : ''}
    `}
    >
        {props.label}
     </button>