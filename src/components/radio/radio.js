import React, {Component} from 'react';


export default class Radio extends Component{

    // state = {
    //     value: "",
    // };

    setValue = (evt)=>{
        const value = evt.target.value;
        // this.setState({
        //     value 
        // });
        this.props.processData(value, this.props.label)
    };
    render(){
        const {label, name, val, active} = this.props;
        return(
            <label className="form-check">
                <input className="form-check-input" type="radio" name={name} id="exampleRadios2" value={val} onChange={this.setValue} checked={active === val}></input>
                <span className="form-check-label">
                    {label}
                </span>
            </label>
        );
    }
}