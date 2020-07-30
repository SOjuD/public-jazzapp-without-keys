import React, { Component } from 'react';
import JazzInput from '../input';
import Dropdown from '../dropdown';
import Radio from '../radio';

import './client.css'

export default class ClientRow extends Component{




    render(){
        const {streets, setPaymentMethod, setPhone, setShipping, setAdress, street, house, appartment, entryway, phone, shipping, paymethod, floor} = this.props;
        return(
            <div className="row row_client">
                <h3 className="col-12">Данные клиента</h3>
                <Dropdown label="Улица" classes="col-12 col-sm-6 col-md-4" name="street" list={streets} idList="streetsList" processData={setAdress} val={street}></Dropdown>
                <JazzInput label="Дом" classes="col-12 col-sm-6 col-md-2" name="house" processData={setAdress} val={house}></JazzInput>
                <JazzInput label="Квартира" classes="col-12 col-sm-6 col-md-2" name="appartment" processData={setAdress} val={appartment}></JazzInput>
                <JazzInput label="Подъезд" classes="col-12 col-sm-6 col-md-2" name="entryway" processData={setAdress} val={entryway}></JazzInput>
                <JazzInput label="Этаж" classes="col-12 col-sm-6 col-md-2" name="floor" processData={setAdress} val={floor}></JazzInput>
                <JazzInput label="Телефон" classes="col-12 col-sm-6 col-md-4" name="phone" processData={setPhone} val={phone}></JazzInput>
                <div className="col-12 col-md-6 col-lg-2 radios" >
                    <Radio label="Наличные" name="payment" val="cod" processData={setPaymentMethod} active={paymethod}></Radio>
                    <Radio label="Карта" name="payment" val="cheque" processData={setPaymentMethod} active={paymethod}></Radio>
                </div>
                <div className="col-12 col-md-6 col-lg-2 radios" >
                    <Radio label="Доставка" name="shipping" val="1" processData={setShipping} active={shipping}></Radio>
                    <Radio label="Самовывоз" name="shipping" val="2" processData={setShipping} active={shipping}></Radio>
                </div>
            </div>
        )
    }
}