import React from 'react';


export default function AddOrder({addNewProduct, permission}){
    return(
        <div className="col-12 btn-add-wrap">
            <button className="btn btn-info btn-lg" onClick={ ()=>{addNewProduct(true)} } disabled={permission}>Добавить</button>
        </div>
    );
}