import React from 'react'
import './total-price.css'

export default function TotalPrice(props) {

    const {cost} = props;

    return(
        <div className="row totalPriceRow">
            <div className="totalPriceTitle">Итого</div>
            <div className="totalPriceCost">{cost} руб</div>
        </div>
    );
    
}