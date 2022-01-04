import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser }) => {

    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='option' to='/shop'>
                    CONTACT
                </Link>
                {currentUser ? <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div> : <Link className='option' to='/signin'> SIGN IN</Link>
                }
            </div>
        </div >
    )
};

//map state to props sends the state form our root-reducer, ( here user) and gives the props in Header
//the new state from currentUser.  check the root reducer to see why state.user.currentUser is set.
const mapStateToProps = state => ({
    //current user property that has a state of user.currentUser value;
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header);