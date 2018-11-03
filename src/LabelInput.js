import React, { Component } from 'react';
import noop from 'lodash/noop';
import './LabelInput.scss';

class LabelInput extends Component{
    constructor(props){
        super(props)
        this.inputRef = React.createRef();
    }

    componentDidMount(){

        this.inputRef.current.oninvalid = (e) => {
            if (!e.target.validity.valid) {
                e.target.setCustomValidity(this.props.validationMessage);
            }
        };

        this.inputRef.current.oninput = (e) => {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                e.target.setCustomValidity(this.props.validationMessage);
            }
        };
    }
    
    render(){
        return (
            <div className="labelInput" id={this.props.id}>
                <label><p>{this.props.labelText}</p><input ref={this.inputRef} value={this.props.value} type={this.props.type} onChange={this.props.handler} required={this.props.required} placeholder={this.props.placeholder} minLength={this.props.minLength} maxLength={this.props.maxLength} pattern={this.props.pattern} step="1"/></label>
            </div>
        );
    }
}

LabelInput.defaultProps = {
    id: null,
    type: 'text',
    handler: noop,
    required: true,
    placeholder: '',
    minLength: '0',
    maxLength: '50',
    validationMessage: 'El texto en este campo no coincide con el formato especificado',
    pattern: null
};

export default LabelInput;