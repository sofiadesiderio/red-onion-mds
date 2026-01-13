import React, { useState, useMemo } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/Banner';
import DataLoad from './components/DataLoad';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Foods from './components/Foods';
import Description from './components/Description';
import Footer from './components/Footer';
import FoodDetails from './components/FoodDetails';
import Forms from './components/Forms';
import CheckOut from './components/CheckOut';
import AddedFood from './components/AddedFood';
import OrderConfirmed from './components/OrderConfirmed';
import OrderTracking from './components/OrderTracking';
import PrivateRoute from './components/PrivateRoute';
import Contact from './components/Contact';
export const UserContext = React.createContext();
export const FoodContext = React.createContext();

function App() {
    //
    const [foodCart, setFoodCart] = useState([]);

    const [user, setUser] = useState({
        email: '',
        password: '',
        state: false,
    });

    const userValue = useMemo(() => [user, setUser], [user]);

    const foodCartValue = useMemo(() => [foodCart, setFoodCart], [foodCart]);

    return (
            <UserContext.Provider value={userValue}>
                <FoodContext.Provider value={foodCartValue}>
                    <Router>
                        <Navigation />
                        <Switch>
                            <Route path='/foods'>
                                <Foods />
                            </Route>

                            <Route path='/confirm'>
                                <OrderConfirmed />
                            </Route>

                            <Route path='/tracking'>
                                <OrderTracking />
                            </Route>

                            <Route path='/contact'>
                                <Contact />
                            </Route>

                            <Route path='/checkout'>
                                <CheckOut />
                            </Route>

                            <Route path='/addedfood'>
                                <AddedFood />
                            </Route>

                            <Route path='/form'>
                                <Forms />
                            </Route>

                            <Route path='/foodDetails/:id'>
                                <FoodDetails />
                            </Route>

                            <Route path='/'>
                                <Banner />
                                <DataLoad />
                                <Description />
                            </Route>
                        </Switch>
                        <Footer />
                    </Router>
                </FoodContext.Provider>
            </UserContext.Provider>
    );
}

export default App;
