import './order-price.css'
import React from 'react'


export default function OrderPrice(props){
    const {name, price} = props;
    return(
        <div className="col-12.col-sm-6 col-md-2 colPrice">
            {name}
            <span>
                {price} руб
            </span>
        </div>
    );
}