import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import cart from './resources/cart.svg';
import logo2 from './resources/logo2.png';
import { Link } from 'react-router-dom';
import './style.css';

import { UserContext } from '../App';

const Navigation = () => {
    const [user] = useContext(UserContext);

    console.log(user);

    return (
        <Navbar bg='light' className='sticky-top' expand='lg'>
            <div className='container'>
                <Navbar.Brand>
                    <Link to='/'>
                        <img
                            style={{ width: '140px' }}
                            alt='logo'
                            src={logo2}
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link className='link-nav'>
                            <Link className='link-nav' to='/'>
                                Home
                            </Link>
                        </Nav.Link>

                        <Nav.Link className='link-nav'>
                            <Link className='link-nav' to='/foods'>
                                Foods & Products
                            </Link>
                        </Nav.Link>

                        <Nav.Link className='link-nav'>
                            <Link className='link-nav' to='/contact'>
                                Contact
                            </Link>
                        </Nav.Link>
                    </Nav>

                    <Nav className='ml-auto'>
                        <Nav.Link>
                            <Link to='/addedfood'>
                                <img id='cart' alt='cart' src={cart} />
                            </Link>
                        </Nav.Link>

                        {user.state && (
                            <Nav.Link className='nav-link'>
                                <Link to={`/form`}>
                                    <button className='btn-sign btn btn-danger'>
                                        {user.email}
                                    </button>
                                </Link>
                            </Nav.Link>
                        )}
                        {!user.state && (
                            <Nav.Link className='nav-link'>
                                <Link to={`/form`}>
                                    <button className='btn-sign btn btn-danger'>
                                        Login/Sign Up
                                    </button>
                                </Link>
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Navigation;
