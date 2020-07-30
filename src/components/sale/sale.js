import React from 'react';
import JazzInput from '../input/input-count';
import './sale.css';

export default function TotalPrice(props) {
    const {changed, val} = props;
    return(
        <div className="row saleRow">
            <div className="saleTitle">Процент скидки</div>
            <JazzInput inputType="number" classes="col-12 col-sm-6 col-md-2 col-lg-1 sale-label" changed={changed} val={val}></JazzInput>
        </div>
    );
    
}