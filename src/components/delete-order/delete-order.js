import React from 'react'
import './delete-order.css'


export default function ButtonDelete (props){
    const {orderId, deleteProduct} = props;
    return(
        <div className="delete" onClick={()=>{deleteProduct(orderId)}}>x</div>
    )
}