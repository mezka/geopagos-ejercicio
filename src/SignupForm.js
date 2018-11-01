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
                <LabelInput labelText="Nombre Completo" validationMessage="Debe ingresar un nombre seguido de al menos un apellido" pattern="^\s*\w+(\s+\w+){1,}\s*$" handler={partial(this.setStateKeyToEventValue, partial.placeholder, 'name')} placeholder="Ej.: Juan Carlos (sin espacios innecesarios)"/>
                <LabelInput labelText="Nº de CUIL" validationMessage="El cuit debe ingresarse en este formato 12-12345678-1" maxLength="13" pattern="^\d{2}-\d{8}-\d{1}$" handler={partial(this.setStateKeyToEventValue, partial.placeholder, 'cuil')} placeholder="23-45678901-2"/>
            </div>
        </React.Fragment>
    );
};

let renderSignupSecondPart = function(){
    return(
        <React.Fragment>
            {renderSignupTitleContainer()}
            <div className="signupFormContentBox">
                <LabelInput id="signupFormStreet" labelText="Calle" handler={partial(this.setStateKeyToEventValue, partial.placeholder, 'street')} placeholder="Ej.: Av. de Mayo"/>
                <LabelInput id="signupFormNumber" type="number" min="1" max="99999" labelText="N&uacute;mero" handler={partial(this.setStateKeyToEventValue, partial.placeholder, 'number')} placeholder="Ej.: 3651"/>    
                <LabelSelect labelText="Provincia" handler={partial(this.setProvinceAndGetCities, partial.placeholder, 'province')} selectOptions={this.state.provinces} selectedOption={this.state.province}/>
                <LabelSelect labelText="Localidad" handler={partial(this.setStateKeyToEventValue, partial.placeholder, 'city')} selectOptions={this.state.cities} selectedOption={this.state.city}/>
            </div>
        </React.Fragment>
    );
};

let renderSignupThirdPart = function(){
    return(
        <React.Fragment>
            {renderSignupTitleContainer()}
            <div className="signupFormContentBox">
                <LabelInput type="email" labelText="E-mail" handler={partial(this.setStateKeyToEventValue, partial.placeholder, 'email')} placeholder="Ingres&aacute; tu direcci&oacute;n de correo electronico"/>
                <LabelInput type="password" labelText="Contrase&ntilde;a" handler={partial(this.setStateKeyToEventValue, partial.placeholder, 'password')} placeholder="Debe ser alfanum&eacute;rica de al menos 8 caracteres"/>
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

        this.nameRef = React.createRef();
        this.cuilRef = React.createRef();
        this.streetRef = React.createRef();
        this.numberRef = React.createRef();
        this.provinceRef = React.createRef();
        this.cityRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();

        this.setStateKeyToEventValue = this.setStateKeyToEventValue.bind(this);
        this.setProvinceAndGetCities = this.setProvinceAndGetCities.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);

        renderSignupFirstPart = renderSignupFirstPart.bind(this);
        renderSignupSecondPart = renderSignupSecondPart.bind(this);
        renderSignupThirdPart = renderSignupThirdPart.bind(this);
        renderSignupFourthPart = renderSignupFourthPart.bind(this);
        renderCurrentPart = renderCurrentPart.bind(this);
        renderSignupTitleContainer = renderSignupTitleContainer.bind(this);

        this.getProvinces = this.getProvinces.bind(this);
        this.getCities = this.getCities.bind(this);
    }

    componentDidMount(){
        this.getProvinces();
    }

    getProvinces(){
        fetch('https://geopagos-challenge.s3.amazonaws.com/provinces.json')
        .then(response => response.json())
        .then(provinces => this.setState({provinces}));
    };

    getCities(cityId){

        fetch(`https://geopagos-challenge.s3.amazonaws.com/provinces/${cityId}.json`)
        .then(response => response.json())
        .then(response => this.setState({ cities: response.cities }));
    }

    setProvinceAndGetCities(event){
        this.setStateKeyToEventValue(event, 'province');
        this.getCities(event.target.value);
    }

    setStateKeyToEventValue(event, formDataKey){
        this.setState(
            {
                [formDataKey]: event.target.value
            }
        );
    }

    handlePrev(){
        if(this.state.currentPart > 1){
            this.setState({
                currentPart: this.state.currentPart - 1
            });
        }
    }

    handleNext(){
        if(this.state.currentPart < 4){
            this.setState({
                currentPart: this.state.currentPart + 1
            });
        }
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(event.nativeEvent);
    }

    render(){
    
        return (
            <form className="signupForm" onSubmit={this.handleSubmit}>
                {renderCurrentPart()}
                <div className="signupFormBottomFlexbox">
                    <input type="button" value="Atr&aacute;s" className="btn btn-white" onClick={this.handlePrev}/>
                    <input type="submit" value="Siguiente" className="btn btn-blue"/>
                </div>
            </form>
        );
    }
}

export default SignupForm;