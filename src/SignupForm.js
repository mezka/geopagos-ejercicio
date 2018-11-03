import React, { Component } from 'react';
import LabelInput from './LabelInput';
import LabelSelect from './LabelSelect';
import partial from 'lodash/partial';
import './SignupForm.scss';


let renderSignupTitleContainer = function(){
    return(
    <div className="signupFormTopFlexbox">
        <h2>Registro</h2>
        <img className="stepLogo" src={currentPartNumberToImagePath[this.state.currentPart]} alt=""/>
    </div>
    )
}

let renderSignupFirstPart = function(){
    return (

        <React.Fragment>
            {renderSignupTitleContainer()}
            <div className="signupFormContentBox">
                <LabelInput value={this.state.name} labelText="Nombre Completo" validationMessage="Debe ingresar un nombre seguido de al menos un apellido" pattern="^\s*\w+(\s+\w+){1,}\s*$" handler={partial(this.setStateKeyToEventValue, partial.placeholder, 'name')} placeholder="Ej.: Juan Carlos"/>
                <LabelInput value={this.state.cuil} labelText="Nº de CUIL" validationMessage="El CUIL debe ingresarse en este formato 12-12345678-1" maxLength="13" pattern="^\d{2}-\d{8}-\d{1}$" handler={partial(this.setStateKeyToEventValue, partial.placeholder, 'cuil')} placeholder="23-45678901-2"/>
            </div>
        </React.Fragment>
    );
};

let renderSignupSecondPart = function(){
    return(
        <React.Fragment>
            {renderSignupTitleContainer()}
            <div className="signupFormContentBox">
                <LabelInput id="signupFormStreet" value={this.state.street} labelText="Calle" handler={partial(this.setStateKeyToEventValue, partial.placeholder, 'street')} placeholder="Ej.: Av. de Mayo"/>
                <LabelInput id="signupFormNumber" value={this.state.number} type="number" min="1" max="99999" labelText="N&uacute;mero" handler={partial(this.setStateKeyToEventValue, partial.placeholder, 'number')} placeholder="Ej.: 3651"/>    
                <LabelSelect labelText="Provincia" value={this.state.province} handler={partial(this.setProvinceAndGetCities, partial.placeholder, 'province')} selectOptions={this.state.provinces} selectedOption={this.state.province}/>
                <LabelSelect labelText="Localidad" value={this.state.city} handler={partial(this.setStateKeyToEventValue, partial.placeholder, 'city')} selectOptions={this.state.cities} selectedOption={this.state.city}/>
            </div>
        </React.Fragment>
    );
};

let renderSignupThirdPart = function(){
    return(
        <React.Fragment>
            {renderSignupTitleContainer()}
            <div className="signupFormContentBox">
                <LabelInput value={this.state.email} type="email" labelText="E-mail" validationMessage="No es un mail valido" handler={partial(this.setStateKeyToEventValue, partial.placeholder, 'email')} placeholder="Ingres&aacute; tu direcci&oacute;n de correo electronico"/>
                <LabelInput value={this.state.password} pattern="^((?=.*[a-zA-z])(?=.*\d+)).{8,}$" validation="Debe contener al menos 8 caracteres, estos pueden ser del alfabeto estadounidense y debe contener al menos un numero" type={this.state.showPassword?"text":"password"} maxLenght="8" labelText="Contrase&ntilde;a" handler={partial(this.setStateKeyToEventValue, partial.placeholder, 'password')} placeholder="Debe ser alfanum&eacute;rica de al menos 8 caracteres"/>
                <label><input type="checkbox" value={this.state.showPasword} onChange={partial(this.setStateKeyToEventValue, partial.placeholder, 'showPassword', true)}/>Mostrar contrase&ntilde;a</label>
            </div>
        </React.Fragment>
    );
};

let renderSignupFourthPart = function(){
    return(
            <div className="signupFormContentBox signupTickLogoBox">
                <img className="tickLogo" src="./assets/tick.png" alt="tick logo"/>
                <p className="outroText">&iexcl;Te registraste exitosamente!</p>
            </div>
    );
};

let renderSignupButtons = function(){
    return(
        <div className="signupFormBottomFlexbox">
            <input className={this.state.currentPart === 1 || this.state.currentPart === 4? "hidden" : "btn btn-white"} type="reset" value="Atr&aacute;s"/>
            <input type="submit" value="Siguiente" className="btn btn-blue"/>
        </div>
    )
}

let renderCurrentPart = function(){
    switch(this.state.currentPart){
        case 2:
            return renderSignupSecondPart();
        case 3:
            return renderSignupThirdPart();
        case 4:
            return renderSignupFourthPart();
        default:
            return renderSignupFirstPart();
    }
}

const currentPartNumberToImagePath = {
    1: './assets/step1.png',
    2: './assets/step2.png',
    3: './assets/step3.png'
}

class SignupForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            showPassword: false,
            currentPart: 1,
            provinces: [],
            cities: [],
            name: '',
            cuil: '',
            street: '',
            number: '',
            province: '',
            city: '',
            email: '',
            password: ''
        }


        renderSignupFirstPart = renderSignupFirstPart.bind(this);
        renderSignupSecondPart = renderSignupSecondPart.bind(this);
        renderSignupThirdPart = renderSignupThirdPart.bind(this);
        renderSignupFourthPart = renderSignupFourthPart.bind(this);
        renderCurrentPart = renderCurrentPart.bind(this);
        renderSignupTitleContainer = renderSignupTitleContainer.bind(this);
        renderSignupButtons = renderSignupButtons.bind(this);
    }

    componentDidMount(){
        this.getProvinces();
    }

    getProvinces = () => {
        fetch('https://geopagos-challenge.s3.amazonaws.com/provinces.json')
        .then(response => response.json())
        .then(provinces => this.setState({provinces}));
    };

    getCities = (cityId) => {

        fetch(`https://geopagos-challenge.s3.amazonaws.com/provinces/${cityId}.json`)
        .then(response => response.json())
        .then(response => this.setState({ cities: response.cities }));
    }

    setProvinceAndGetCities = (event) => {
        this.setStateKeyToEventValue(event, 'province');
        this.getCities(event.target.value);
    }

    setStateKeyToEventValue = (event, formDataKey, checkbox=false) => {

        this.setState(
            {
                [formDataKey]: checkbox? event.target.checked: event.target.value
            }
        );
    }

    handlePrev = (event) => {
        event.preventDefault();

        if(this.state.currentPart > 1){
            this.setState({
                currentPart: this.state.currentPart - 1
            });
        }
    }

    handleSubmit = (event) => {
        
        event.preventDefault();
        
        if(event.target.checkValidity() && this.state.currentPart < 4){
            this.setState({
                currentPart: this.state.currentPart + 1
            }, () => {
                if(this.state.currentPart === 4){

                    const dataObj = {
                        name: this.state.name.trim(),
                        cuil: this.state.cuil.split('-').join(''),
                        street: this.state.street.trim(),
                        number: this.state.number,
                        province: this.state.province.trim(),
                        city: this.state.city.trim(),
                        email: this.state.email.trim(),
                        password: this.state.password
                    }
                    
                    fetch('https://www.mocky.io/v2/5185415ba171ea3a00704eed', {
                            method: 'POST',
                            headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dataObj)
                        },
                    )
                    .then(response => response.json())
                    .then(response => console.log(response));
                }
            });
        }
    }

    render(){
    
        return (
            <form className="signupForm" onSubmit={this.handleSubmit} onReset={this.handlePrev}>
                {renderCurrentPart()}
                {this.state.currentPart !== 4? renderSignupButtons() : null}
            </form>
        );
    }
}

export default SignupForm;