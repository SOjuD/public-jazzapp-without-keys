import React from 'react';

export default function Cheque (check){
    const {data, discount} = check;
    console.log(data)
    const dateCreate = data.date_created;
    const time = dateCreate.slice( dateCreate.indexOf('T')+1 );
    const items = data.line_items.map( el=>{
        return(
        <li className="item" key={el.id}>{el.name}, {el.quantity} шт. - {el.total} руб.</li>
        )
    } );
    return(
        <div>
            <div className="id">Заказ №{data.id}</div>
            <div className="time">Время оформления: {time}</div>
            <div className="adress">{data.billing.address_1}</div>
            <div className="phone">Телефон: {data.billing.phone}</div>
            <ul>
                {items}
            </ul>
            <div className="paymethod">{data.payment_method_title}</div>
            <div className="shipping">{data.shipping_lines[0].method_title}</div>
            <div className="total">Скидка: {discount} %</div>
            <div className="total">Итог: {data.total} руб.</div>
        </div>
    );
}