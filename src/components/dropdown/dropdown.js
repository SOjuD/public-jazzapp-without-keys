import React, {Component} from 'react'

export default class Dropdown extends Component {

    // state = {
    //     value: this.props.val,
    // };

    setValue = (evt)=>{
        const value = evt.target.value;
        const name = evt.target.name;
        // this.setState({
        //     value 
        // });
        this.props.processData(name, value)
    }

    render(){

        const {list, label, classes, idList, name} = this.props

        const listElems = list.map( (el, index)=>{
            return(
                <option value={el} key={`street_${index}`}></option>
            );
        } );
        return (
            <label className={"form-group " + classes}>
                <span>{label}</span>
                <input type="text" name={name} list={idList} placeholder={label} onChange={ this.setValue } value={this.props.val}></input>
                <datalist id={idList}>
                    {listElems}
                </datalist>
            </label>
        );
    }
}