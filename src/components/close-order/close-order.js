import React from 'react'

export default function CloseOrder (props){
    const {disabled, preparationOrder} = props;
    return(
        <button type="button" className="btn btn-success btn-lg" disabled={disabled} onClick={preparationOrder}>Оформить заказ</button>
    )
}