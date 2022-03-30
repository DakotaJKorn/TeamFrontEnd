import React from "react";
import './Body.scss';
import Motorcycle from "../Motorcycle/Motorcycle";


export default function Body(){

    React.useEffect(() => {

        let position = 0;
        fetch("https://moto-inventory.herokuapp.com/")
        .then(res => res.json())
        .then(data => {

            console.log(data);
            setMotorcycles(data.map(element => {
                return {...element, position: position++}
            }))
        }     
        );
        // let data2 = [
        //     {"vin": 896453, "make":"Harley-Davidson", "model": "Sportster", "type": "883 Roadster", "year": 2018, "price": 19545},
        //     {"vin": 246123, "make":"Harley-Davidson", "model": "Sportster", "type": "Superlow", "year": 2016, "price": 17400},
        //     {"vin": 131151, "make":"Harley-Davidson", "model": "Sportster", "type": "Forty-Eight", "year": 2015, "price": 15300},
        //     {"vin": 267212, "make":"Harley-Davidson", "model": "Sportster", "type": "Iron 883", "year": 2012, "price": 12950},
        //     {"vin": 113973, "make":"Harley-Davidson", "model": "Sportster", "type": "Superlow 1200T", "year": 2018, "price": 21545},
        //     {"vin": 939485, "make":"Harley-Davidson", "model": "Sportster", "type": "Seventy-Two", "year": 2016, "price": 16500},
        //     {"vin": 763824, "make":"Harley-Davidson", "model": "Sportster", "type": "1200 Custom", "year": 2015, "price": 13800},
        //     {"vin": 347946, "make":"Harley-Davidson", "model": "Dyna", "type": "Street Bob", "year": 2012, "price": 11750},
        //     {"vin": 289714, "make":"Harley-Davidson", "model": "Dyna", "type": "Wide Glide", "year": 2018, "price": 23545},
        //     {"vin": 190042, "make":"Harley-Davidson", "model": "Dyna", "type": "Low Rider", "year": 2016, "price": 20600},
        //     {"vin": 356654, "make":"Harley-Davidson", "model": "Dyna", "type": "Fat Bob", "year": 2015, "price": 17700},
        //     {"vin": 754656, "make":"Harley-Davidson", "model": "Dyna", "type": "Dyna Switchback", "year": 2012, "price": 13050}
        // ];
        
        // setMotorcycles(data2.map(element => {
        //     return {...element, position: position++}
        // }))
        
    }, [])


    const [motorcycles, setMotorcycles] = React.useState([{vin: 0, make:" ", type: " ", year: 0, price: 0}]);

    let spot = 0;
    const motorcycleElements = motorcycles.map(motorcycle => (
        <Motorcycle key={motorcycle.vin} Vin={motorcycle.vin} Make={motorcycle.make} Type={motorcycle.type} Year={motorcycle.year} Price={motorcycle.price} Position={spot++} Clicked={vehicleSelected} />
    ))
    const [selectedVehicle, setSelectedVehicle] = React.useState(motorcycles[0]);
    const [editMode, setEditMode] = React.useState(false);

    React.useEffect(() => {

        if(selectedVehicle.position){
            setSelectedVehicle(motorcycles[selectedVehicle.position]);
        }

    }, [motorcycles])

    function toggleEditMode(){
        if(editMode){
            alert("Changes cancelled.");
        }
        setEditMode(prev => !prev);
    }

    function vehicleSelected(position){
        if(!editMode){
            setSelectedVehicle(motorcycles[position]);
        } else {
            alert("Please save or cancel changes to selected motorcycle before selecting another.");
        }    
    }
    

    function saveChanges(){

        let vin = document.getElementById("vin").value;
        let make = document.getElementById("make").value;
        let type = document.getElementById("type").value;
        let year = document.getElementById("year").value;

        if(
        ( vin === String(selectedVehicle.vin )) &&
        ( make === String(selectedVehicle.make )) &&
        ( type === String(selectedVehicle.type )) &&
        ( year === String(selectedVehicle.year ))
        ){
            alert("No changes detected.");
            setEditMode(prev => !prev);
        } else {
            alert("Changes saved.");
            setMotorcycles(prev => {
                let count = 0;
                return prev.map(element => {
                    if(count++ === selectedVehicle.position){
                        return {vin : vin, make : make, type : type, year : year};
                    }
                    return element;
                })
            })
            setEditMode(prev => !prev);
        } 
    }


    return(

        <div className="body-container">
            <div className="data-container">
                <div className="data">
                    <div className="data-header">
                        <div className="data-header-content">
                            <div>VIN</div>
                            <div>Make</div>
                            <div>Type</div>
                            <div>Year</div>
                        </div>
                        
                    </div>
                    { motorcycleElements }
                    
                </div>
                <div className="options">
                    {selectedVehicle.vin !== 0 && (
                        <div className="options-content">
                            <div className="title">Motorcycle Options</div>
                            <div className="vin">
                                VIN: 
                                {(editMode && <input id="vin" type="text" defaultValue={selectedVehicle.vin} />)}
                                {(!editMode && <span> {selectedVehicle.vin}</span>)}
                            </div>
                            <div className="make">
                                Make: 
                                {(editMode && <input id="make" type="text" defaultValue={selectedVehicle.make} />)}
                                {(!editMode && <span> {selectedVehicle.make}</span>)}
                            </div>
                            <div className="model">
                                Type:
                                {(editMode && <input id="type" type="text" defaultValue={selectedVehicle.type} />)}
                                {(!editMode && <span> {selectedVehicle.type}</span>)} 
                            </div>
                            <div className="year">
                                Year: 
                                {(editMode && <input id="year" type="text" defaultValue={selectedVehicle.year} />)}
                                {(!editMode && <span> {selectedVehicle.year}</span>)}
                            </div>
                            <div className="buttons">
                                {(editMode && <button onClick={saveChanges}>Save Changes</button>)}
                                <button onClick={toggleEditMode}>{!editMode ? "Edit" : "Cancel"}</button>
                            </div>
                        </div>
                    )}
                    {selectedVehicle.vin === 0 && 
                        <div className="options-content">
                            <div className="title">Motorcycle Options</div>
                            <div className="beginningText">Select a vehicle to see details.</div>
                        </div>
                    }
                   
                </div>
            </div>
        </div>
    );
}