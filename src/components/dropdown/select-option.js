import React, {Component} from 'react'

export default class SelectOption extends Component {

    state = {
        value: ''
    };

    setValue = (evt)=>{
        const variationId = evt.target.value;
        this.props.onChange(this.props.orderId, +variationId);
        this.setState({
            value: variationId,
        });
    }

    render(){

        const {list, label, classes, disable = false } = this.props;

        const listElems = !Array.isArray(list) || list.map( (el, index, array)=>{
            if(list.length > 0){
                return(
                <option value={el.id} key={el.id}>{el.attributes[0].option}</option>
                );
            }
            return undefined;
        } );

        return (
            <label className={"form-group " + classes} >
                <span>{label}</span>
                <select type="text" placeholder={label} onChange={ this.setValue } disabled={disable}>
                    {listElems}
                </select>
            </label>
        );
    }
}