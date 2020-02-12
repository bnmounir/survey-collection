import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

export class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href='/auth/google'>Sign Up/Sign In</a>
                    </li>
                );
            default:
                return [
                    <li key='1'>
                        <Payments />
                    </li>,
                    <li key='3' style={{ margin: '0 10px' }}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key='2'>
                        <a href='/api/logout'>Logout</a>
                    </li>
                ];
        }
    }

    render() {
        return (
            <nav
                className='light-blue lighten-3'
                style={{ paddingLeft: '10px' }}
            >
                <div className='nav-wrapper'>
                    <Link
                        to={this.props.auth ? '/surveys' : '/'}
                        className='left brand-logo'
                    >
                        Emaily
                    </Link>
                    <ul className='right'>{this.renderContent()}</ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ authReducer }) {
    return { auth: authReducer };
}

export default connect(mapStateToProps)(Header);
