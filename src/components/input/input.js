import React, {Component} from 'react';

import './input.css'

export default class JazzInput extends Component{

    // state= {
    //     value: this.props.val
    // };

    setValue = (evt)=>{
        const value = evt.target.value;
        const name = evt.target.name;
        // this.setState({
        //     value 
        // });
        this.props.processData(name, value);
    }

    render(){
        const {label, inputType = 'text', classes = '', name} = this.props;
        return(
            <label className={"form-group " + classes}>
                <span>{label}</span>
                <input type={inputType} name={name} value={this.props.val} required placeholder={label} onChange={this.setValue} ></input>
            </label>
        );
    }
}