import React from "react";
import './Header.scss';

export default function Header(props){

    return(
        <div className="header-container">

            <div className="header-container-one"></div>
            <div className="header-container-two">Motorcycle Warehouse</div>
            

            <div className="header-container-three">
                <div className="search-container">
                    <input type="text" className="search-input" placeholder="Search by VIN, Make, or Type"/>
                    <button onClick={props.Click} className="search-button">Search</button>
                </div>
            </div>   
        </div>
    );
}