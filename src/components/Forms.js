import React, { useState, useContext } from 'react';
import { UserContext } from '../App';
import { Button, Form } from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';
import './style.css';
import { useHistory, useLocation } from 'react-router-dom';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Forms = () => {
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/form' } };

    const [flag, setFlag] = useState(false);

    const [user, setUser] = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [toggle, setToggle] = useState('Click here to Sign up');

    function changeFunc(e) {
        let isFormValid = true;

        // Sempre atualiza o valor no estado
        let newInfo = { ...userInfo };
        newInfo[e.target.name] = e.target.value;
        setUserInfo(newInfo);

        // Validação de email
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);

            const emailError = document.getElementById('email-error');
            if (emailError) {
                emailError.style.display = isFormValid ? 'none' : 'block';
            }
        }

        // Validação de senha
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d/.test(e.target.value);
            isFormValid = passwordHasNumber && isPasswordValid;

            const passError = document.getElementById('pass-error');
            if (passError) {
                passError.style.display = isFormValid ? 'none' : 'block';
            }
        }
    }

    function submitFunc(e) {
        if (flag && userInfo.email && userInfo.password && userInfo.name) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    userInfo.email,
                    userInfo.password
                )
                .then((res) => {
                    setMessage('Form Submitted & New User Created');
                    const msgElement = document.getElementById('message');
                    if (msgElement) msgElement.style.color = 'green';
                })
                .catch(function (error) {
                    const errorMessage = error.message;

                    setMessage(errorMessage);
                    const msgElement = document.getElementById('message');
                    if (msgElement) msgElement.style.color = 'red';
                });
        } else if (!flag && userInfo.email && userInfo.password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(userInfo.email, userInfo.password)
                .then((res) => {
                    const newInfo = { ...userInfo };
                    newInfo.state = true;
                    setUser(newInfo);
                    setMessage('Login successful!');
                    const msgElement = document.getElementById('message');
                    if (msgElement) msgElement.style.color = 'green';
                    
                    // Redirect after a brief delay
                    setTimeout(() => {
                        history.replace(from);
                    }, 500);
                })
                .catch(function (error) {
                    const errorMessage = error.message;
                    setMessage(errorMessage);
                    const msgElement = document.getElementById('message');
                    if (msgElement) msgElement.style.color = 'red';
                });
        }

        e.preventDefault();
    }

    function logout() {
        firebase
            .auth()
            .signOut()
            .then(function () {
                const newInfo = {};
                newInfo.name = '';
                newInfo.email = '';
                newInfo.state = false;
                setUser(newInfo);
                setMessage('Logged Out');
                const msgElement = document.getElementById('message');
                if (msgElement) msgElement.style.color = 'Black';
            })
            .catch(function (error) {});
    }
    return (
        <div className='container'>
            {!user.state && (
                <>
                    {' '}
                    <Form className='mx-auto mt-5' style={{ width: '25rem' }}>
                        {!flag && <h5 className='text-center my-4'>Sign In</h5>}

                        {flag && <h5 className='text-center my-4'>Sign Up</h5>}

                        <Form.Group
                            className='mx-auto text-center'
                            controlId='formBasicCheckbox'
                        >
                            <button
                                type='button'
                                className='btn btn-link text-danger text-toggle text-decoration-none'
                                style={{ fontWeight: 'bold' }}
                                onClick={() => {
                                    setFlag(!flag);
                                    if (toggle === 'Click here to Sign up') {
                                        setToggle(
                                            'Already have an account? Sign In'
                                        );
                                    } else {
                                        setToggle('Click here to Sign up');
                                    }
                                }}
                            >
                                {toggle}
                            </button>
                        </Form.Group>

                        {flag && (
                            <Form.Group controlId='Name'>
                                <Form.Control
                                    className='custom-input '
                                    onChange={changeFunc}
                                    name='name'
                                    type='text'
                                    placeholder='Full Name'
                                />
                            </Form.Group>
                        )}

                        <Form.Group controlId='Email' className=''>
                            <Form.Control
                                className='custom-input  '
                                onChange={changeFunc}
                                name='email'
                                type='email'
                                placeholder='Email'
                            />
                            <p
                                className='text-danger'
                                id='email-error'
                                style={{ display: 'none' }}
                            >
                                Email Address is not Valid
                            </p>
                        </Form.Group>

                        <Form.Group controlId='formBasicPassword my-5'>
                            <Form.Control
                                className='custom-input  '
                                onChange={changeFunc}
                                name='password'
                                type='password'
                                placeholder='Password'
                            />
                            <p
                                className='text-danger'
                                id='pass-error'
                                style={{ display: 'none' }}
                            >
                                Password is not Valid
                            </p>
                        </Form.Group>

                        <Button
                            onClick={submitFunc}
                            value='submit'
                            type='submit'
                            className='btn btn-submit btn-danger'
                        >
                            Submit
                        </Button>
                    </Form>
                    <h5 id='message' className='my-4 text-center'>
                        {message}
                    </h5>{' '}
                </>
            )}

            {user.state && (
                <>
                    <div className='container'>
                        <h3 className='text-center my-5 text-success'>
                            You have logged in successfully
                        </h3>
                    </div>

                    <button
                        onClick={logout}
                        className=' btn btn-danger d-block px-5 mx-auto'
                    >
                        Logout
                    </button>
                </>
            )}
        </div>
    );
};

export default Forms;
