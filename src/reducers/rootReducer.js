const initState = {
    loggedIn: false,
    minDegree: null,
    maxDegree: null,
    city: null,
    emailId: null,
    is_authenticated: false
}

const rootReducer = (state = initState, action) => {
    if (action.type === 'UPDATE_USER_DETAILS') {
        let newUser = {};
        newUser.loggedIn = action.loggedIn;
        newUser.emailId = action.emailId;
        console.log(state);
        
        return {
            ...state,
            loggedIn: newUser.loggedIn,
            emailId: newUser.emailId
        }
    }
    if (action.type === 'UPDATE_WEATHER_DETAILS') {
        let weather = {};
        weather.city = action.city;
        weather.category = action.category;
        weather.maxDegree = action.maxDegree;
        weather.minDegree = action.minDegree;
        return {
            ...state,
            minDegree: weather.minDegree,
            maxDegree: weather.maxDegree,
            city: weather.city,
            category: weather.category
        }
    }
    //console.log(initState);

    return state;
}

export default rootReducer