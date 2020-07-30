import './select.css'
import React, {Component} from 'react'

export default class SelectProduct extends Component {

    state = {
        value: '',

    };

    setValue = (evt)=>{
        const {orderId, list} = this.props;
        const product = list.find((el)=>{
            return el.id.toString() === evt.target.value.toString();
        })
        this.props.onChange(orderId, product.id, product.price, product.name, product.type);
        this.setState({
            value: product.value,
        });
    }

    render(){

        const {list, label, classes, disable = false, productId} = this.props

        const listElems = list.map( (el, index)=>{
            return(
            <option value={el.id} key={el.id}>{el.name}</option>
            );
        } );
        return (
            <label className={"form-group " + classes} >
                <span>{label}</span>
                <select type="text" placeholder={label} onChange={ this.setValue } value={productId || ''} disabled={disable}>
                    {listElems}
                </select>
            </label>
        );
    }
}