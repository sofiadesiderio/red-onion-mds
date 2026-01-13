import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import cart from './resources/cart.svg';
import logo2 from './resources/logo2.png';
import { Link } from 'react-router-dom';
import './style.css';
import { getDatabaseCart } from './databaseManager';

import { UserContext } from '../App';

const Navigation = () => {
    const [user] = useContext(UserContext);
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        const updateCartCount = () => {
            const cartData = getDatabaseCart();
            const total = Object.values(cartData).reduce((sum, count) => sum + count, 0);
            setCartItemCount(total);
        };

        updateCartCount();
        
        // Atualizar a cada segundo para refletir mudanças
        const interval = setInterval(updateCartCount, 1000);
        return () => clearInterval(interval);
    }, []);

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
                        <Nav.Link as={Link} className='link-nav' to='/'>
                            Home
                        </Nav.Link>

                        <Nav.Link as={Link} className='link-nav' to='/foods'>
                            Foods & Products
                        </Nav.Link>

                        <Nav.Link as={Link} className='link-nav' to='/contact'>
                            Contact
                        </Nav.Link>
                    </Nav>

                    <Nav className='ml-auto'>
                        <Nav.Link as={Link} to='/addedfood' style={{ position: 'relative' }}>
                            <img id='cart' alt='cart' src={cart} />
                            {cartItemCount > 0 && (
                                <Badge 
                                    pill 
                                    variant='danger' 
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '5px',
                                        fontSize: '0.75rem'
                                    }}
                                >
                                    {cartItemCount}
                                </Badge>
                            )}
                        </Nav.Link>

                        {user.state && (
                            <Nav.Link as={Link} className='nav-link' to='/form'>
                                <button className='btn-sign btn btn-danger'>
                                    {user.email}
                                </button>
                            </Nav.Link>
                        )}
                        {!user.state && (
                            <Nav.Link as={Link} className='nav-link' to='/form'>
                                <button className='btn-sign btn btn-danger'>
                                    Login/Sign Up
                                </button>
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Navigation;
