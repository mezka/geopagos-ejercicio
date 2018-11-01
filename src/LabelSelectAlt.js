import React, { Component } from 'react';
import noop from 'lodash/noop';
import './SignupForm.scss';

class LabelSelect extends Component {

    componentDidUpdate(){

    }

    render(){
        let renderOptions = this.props.selectOptions.map((currentOption, index) => {
            return (
                <option value={Number(currentOption.id)} key={index}>
                    { currentOption.name }
                </option>
            );
        })
    
        return (
            <div className="labelSelect">
                <label>{this.props.labelText}:
                    <select type="text" onChange={this.props.handler}>
                        { renderOptions }
                    </select>
                </label>
            </div>
        );
    }
}

LabelSelect.defaultProps = {
    onPropChange: noop,
    selectedOption: '',
    required: true
  };

export default LabelSelectAlt;