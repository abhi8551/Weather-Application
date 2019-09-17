import React, { Component } from 'react';
import axios from 'axios';
import './weather.css'

class Registration extends Component {
    state = {
        name: null,
        mobile: null,
        emailId: null,
        city: null,
        country: null,
        password: null
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.populateUserRegistration();
    }

    populateUserRegistration() {
        axios.post('http://localhost:8080/api/user/registration', {
            name: this.state.name,
            mobile: this.state.mobile,
            emailId: this.state.email,
            city: this.state.city,
            country: this.state.country,
            password: this.state.password
        }).then(response => {
            console.log(response)
        })
    }

    render() {
        return (
            <div>
                <div className="registrationBox">
                    <form onSubmit={this.handleSubmit}>
                        <label>Name<input type="text" id="name" onChange={this.handleChange}></input></label>
                        <label>Mobile<input type="text" id="mobile" onChange={this.handleChange}></input></label>
                        <label>Email<input type="text" id="email" onChange={this.handleChange}></input></label>
                        <label>City<input type="text" id="city" onChange={this.handleChange}></input></label>
                        <label>Country<input type="text" id="country" onChange={this.handleChange}></input></label>
                        <label>Password<input type="text" id="password" onChange={this.handleChange}></input></label>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Registration