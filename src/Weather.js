import React, { Component } from 'react';
import axios from 'axios';
import './weather.css'
import { connect } from 'react-redux'

class Weather extends Component {
    state = {
        location: null
    }

    retrieveWeatherData = (location) => {
        console.log(this.props, "retrieveWeatherData");
        location !== null ? (
            axios.post(('http://localhost:8080/api/location/' + location.trim()), {
                emailId: this.props.emailId
            }).then(res => {
                console.log(res);
                if (res.data.status === 200) {
                    this.props.updateWeatherDetails(res.data.category, res.data.city, res.data.maxDegree, res.data.minDegree)
                }
                console.log("response:", res);
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            }))
            : console.log("Enter Value")
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        console.log(e, "handlesubmit");
        e.preventDefault();
        this.retrieveWeatherData(this.state.location)
    }

    render() {
        //console.log(this.state);
        console.log(this.props, "Weather");

        return (
            <div className="weather">
                <div className="searchBox">
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="name"></label>
                        <input type="text" id="location" placeholder="Search.." onChange={this.handleChange}></input>
                        <button>Search</button>
                    </form>
                </div>
                {
                    this.props.city &&
                    <div className="showWeather">
                        <div className="container">
                            <h4 className="center">Weather Information</h4>
                            <div> Category: {this.props.category} </div>
                            <div> Location: {this.props.city} </div>
                            <div> Maximum Degree: {this.props.maxDegree} </div>
                            <div> Minimum Degree: {this.props.minDegree} </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        emailId: state.emailId,
        city: state.city,
        category: state.category,
        minDegree: state.minDegree,
        maxDegree: state.maxDegree
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateWeatherDetails: (category, city, maxDegree, minDegree) => {
            dispatch(
                { type: 'UPDATE_WEATHER_DETAILS', category: category, city: city, maxDegree: maxDegree, minDegree: minDegree }
            )
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Weather);