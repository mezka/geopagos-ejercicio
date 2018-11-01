import React from 'react';
import './LabelSelect.scss';

const LabelSelect = ({handler, labelText, selectOptions, selectedOption='', placeholder='Seleccionar', required=true}) => {

    let renderOptions = selectOptions.map((currentOption, index) => {
        return (
            <option value={Number(currentOption.id)} key={index}>
                { currentOption.name }
            </option>
        );
    })

    return (
        <div className="labelSelect">
            <label><p>{labelText}</p>
                <select value={selectedOption} onChange={handler} required={required}>
                    <option value="" disabled>{ placeholder }</option>
                    { renderOptions }
                </select>
            </label>
        </div>
    );
};

export default LabelSelect;