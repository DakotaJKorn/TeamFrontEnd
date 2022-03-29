import React from "react";
import './Motorcycle.scss';

export default function Motorcycle(props){
    return(
        <div className="motorcycle-container" onClick={() => props.Clicked(props.Position)}>
            <div className="motorcycle-content">
                <div className="prop-container">
                    {props.Vin}
                </div>
                <div className="prop-container">
                    {props.Make}
                </div>
                <div className="prop-container">
                    {props.Type}
                </div>
                <div className="prop-container">
                    {props.Year}
                </div>
            </div>
        </div>
    );
}