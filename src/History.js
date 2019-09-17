import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'

class History extends Component {
    state = {
        responseList: []
    }

    addWeatherData = (instance) => {
        //Copy of existing array object to a array
        let responseList = [...this.state.responseList, instance];
        this.setState({
            responseList: responseList
        })
    }

    componentDidMount() {
        axios.post("http://localhost:8080/api/history", {
            emailId: this.props.emailId
        }).then(res => {
            console.log(res);
            if(res.data.length > 0){
                this.setState({
                    responseList: res.data
                })
            }}).catch(error => {
                console.log(error,"Error");
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            })
    }

    render() {
        console.log(this.props);
        console.log(this.state.responseList, "responseList");
        return (<div>
            {this.state.responseList.map((instance) => (
                <p>{instance.city} is having Maximum Degree: {instance.maxDegree} and Minimum Degree: {instance.minDegree} with having {instance.category}!</p>
            ))}
        </div>)
    }
}

const mapStateToProps = (state) => {
    console.log(state);

    return {
        emailId: state.emailId
    }
}

export default connect(mapStateToProps)(History);