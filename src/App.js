import React, { Component } from 'react';
import SignupForm from './SignupForm';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <SignupForm/>
      </div>
    );
  }
}

export default App;
