import './order-row.css'
import React, {Component} from 'react'
import SelectProduct from '../dropdown/select-product'
import SelectOption from '../dropdown/select-option'
import OrderPrice from '../order-price'
import JazzInput from '../input/input-count'
import ButtonDelete from '../delete-order'
import Placeholder from '../placeholder';




export default class OrderRow extends Component{

    render(){

        const {
            orderId, products, productId, price, count, totalPrice, 
            variations, type, setProduct, setVariation, changeTotalPrice, 
            getVariations, deleteProduct, permission
        } = this.props;
        
        if(permission) { 
            var placeholder = <Placeholder></Placeholder>;
        }
        return(
            <div className="col-12 order_row">
                <div className="row">
                    {placeholder}
                    <SelectProduct label="Продукт" classes="col-12 col-sm-6 col-md-4" orderId={orderId} list={products} onChange={setProduct} productId={productId}></SelectProduct>
                    <SelectOption label="Размер" classes="col-12 col-sm-6 col-md-2" orderId={orderId} list={variations || getVariations(orderId, productId)} disable={ type !== 'variable' } onChange={setVariation} ></SelectOption>
                    <OrderPrice name={'Цена'} price={price}></OrderPrice>
                    <JazzInput label="Количество" val={count} inputType="number" classes="col-12 col-sm-6 col-md-2" orderId={orderId} changed={changeTotalPrice}></JazzInput>
                    <OrderPrice name={'Итого'} price={totalPrice}></OrderPrice>
                    <ButtonDelete orderId={orderId} deleteProduct={deleteProduct}></ButtonDelete>
                </div>
            </div>
        );
    }
}