import './index.css'

import React, {Component} from 'react';
import AddOrder from '../add-order'
import OrderRow from '../order-row/order-row';



export default class OrdersRow extends Component {


    render(){

        const {
            products, addNewProduct, setProduct, getVariations, 
            setVariation, changeTotalPrice, orderProducts, 
            deleteProduct, permission
        } = this.props;

        const orderRows = orderProducts.map( (el, index)=>{
            return <OrderRow 
                        orderId={el.orderId}
                        products={products}
                        productId={el.productId} 
                        price={el.price} 
                        count={el.count} 
                        totalPrice={el.totalPrice} 
                        variations={el.variations} 
                        type={el.type} 
                        key={`orderRow_${index}`}
                        setProduct={setProduct}
                        setVariation={setVariation}
                        changeTotalPrice={changeTotalPrice}
                        getVariations={getVariations}
                        deleteProduct={deleteProduct}
                        permission={permission}
                        >
                    </OrderRow>
        } )
        return(
            <div className="row row_orders">
                <h3 className="col-12">Данные заказа</h3>
                {orderRows}
                <AddOrder addNewProduct={addNewProduct} permission={permission}></AddOrder>
            </div>
        );
    }
}