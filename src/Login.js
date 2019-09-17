import React, { Component } from 'react'
import axios from 'axios'
import './weather.css'
import { connect } from 'react-redux'

class Login extends Component {
    state = {
        emailId: null,
        state: null,
        error: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const params = {
            emailId: this.state.emailId,
            password: this.state.password
        }
        console.log(this.state, "handleSubmit");
        
        this.checkUserState(params);
    }

    checkUserState = (params) => {
        axios.post('http://localhost:8080/api/login', params).then(response => {
            console.log(response)
            if (response.data.status === 200) {
                this.props.updateUserDetails(this.state.emailId, true);
                console.log(this.props,"props print");
                this.props.history.push('/');
            }
        }).catch(err => {
            console.log(err.response);
            this.setState({
                error: err.response
            });
        })
    }

    render() {
        //console.log(this.state);
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <label>Username/emailId<input type="text" id="emailId" onChange={this.handleChange}></input></label>
                    <label>Password<input type="text" id="password" onChange={this.handleChange}></input></label>
                    <button>Login</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserDetails: (emailId, loggedIn) => { 
            dispatch(
                { type: 'UPDATE_USER_DETAILS', emailId: emailId, loggedIn: loggedIn }
            )
        }
    }
}

export default connect(null,mapDispatchToProps)(Login);