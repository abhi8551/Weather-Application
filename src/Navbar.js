import React from 'react'
import { NavLink, withRouter ,Link} from 'react-router-dom'
import { connect } from 'react-redux'

const Navbar = (props) => {
    const handleLogout = () => {
        props.updateUserDetails(null, false);
        props.history.push('/login');
    }
    const { loggedIn } = props;
    const items = (loggedIn === true) ? (
        <ul className="right">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
    ) : (
            <ul className="right">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
            </ul>
        )
    return (
        <nav className="nav-wrapper blue darken-3">
            <div className="container ">
                <a className="brand-logo center">Weather Application</a>
                {items}
            </div>
        </nav>
    )

}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserDetails: (emailId, loggedIn) => { dispatch({ type: 'UPDATE_USER_DETAILS', emailId: emailId, loggedIn: loggedIn }) }
    }
}
//Higher order component has supercharging component Navbar and applied those properties to the props
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))