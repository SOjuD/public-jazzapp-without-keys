import React, {Component} from 'react';

import './input.css'

export default class JazzInput extends Component{

    state= {
        value: this.props.val || ''
    };


    setValue = (evt)=>{
        const value = evt.target.value;
        // this.setState({
        //     value
        // });
        this.props.changed(value, this.props.orderId);
    }

    render(){
        const {label, inputType = 'text', classes = '', val} = this.props;
        return(
            <label className={"form-group " + classes}>
                <span>{label}</span>
                <input min="1" type={inputType} value={val} required placeholder={label} onChange={this.setValue} ></input>
            </label>
        );
    }
}