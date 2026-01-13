import React, { useEffect, useState, useContext } from 'react';
import './style.css';
import Data from './Data';
import { getDatabaseCart, removeFromDatabaseCart, addToDatabaseCart, clearCart } from './databaseManager';
import AddedFoodDetail from './AddedFoodDetail';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const AddedFood = () => {
    const [foods, setFoods] = useState([]);
    const [user] = useContext(UserContext);

    let history = useHistory();

    useEffect(() => {
        const data = getDatabaseCart();
        const item_keys = Object.keys(data);
        const added_items = item_keys.map((key) => {
            const item = Data.find((id) => id.id === Number(key));
            item.count = data[key];
            return item;
        });

        setFoods(added_items);
    }, []);

    const totalPayment = foods.reduce((payment, key) => {
        const temp = key.price * key.count;
        payment = payment + temp;
        return payment;
    }, 0);

    const vat = 15;
    let tax = Number.parseInt(totalPayment) / 100;
    tax = tax * Number.parseInt(vat);

    let inTotal = totalPayment + tax + 50;

    const total = foods.reduce((sum, key) => {
        sum = sum + key.count;
        return sum;
    }, 0);

    if (inTotal <= 50) {
        inTotal = 0;
    }

    function checkOut() {
        history.push('/checkout');
    }

    function removeItem(id) {
        const items = foods.filter((key) => key.id !== id);
        setFoods(items);
        removeFromDatabaseCart(id);
    }

    function increaseQuantity(id) {
        const updatedFoods = foods.map((item) => {
            if (item.id === id) {
                item.count += 1;
                addToDatabaseCart(id, item.count);
            }
            return item;
        });
        setFoods([...updatedFoods]);
    }

    function decreaseQuantity(id) {
        const updatedFoods = foods.map((item) => {
            if (item.id === id && item.count > 1) {
                item.count -= 1;
                addToDatabaseCart(id, item.count);
            }
            return item;
        });
        setFoods([...updatedFoods]);
    }

    function handleClearCart() {
        if (globalThis.confirm('Tem certeza que deseja limpar o carrinho?')) {
            clearCart();
            setFoods([]);
        }
    }

    // Verificar se está logado
    if (!user.state) {
        return (
            <div className='container mt-5'>
                <div className='text-center'>
                    <h3 className='text-danger mb-4'>
                        <i className='fas fa-lock'></i> Acesso Restrito
                    </h3>
                    <p className='text-muted mb-4'>
                        Você precisa estar logado para acessar o carrinho.
                    </p>
                    <button
                        onClick={() => history.push('/form')}
                        className='btn btn-danger btn-lg'
                    >
                        Fazer Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-7 col-md-12 col-sm-12 col-12 order-lg-first order-md-last order-sm-last order-last'>
                    {foods && foods.length > 0 ? (
                        foods.map((item) => (
                            <AddedFoodDetail
                                key={item.id}
                                removeItem={removeItem}
                                increaseQuantity={increaseQuantity}
                                decreaseQuantity={decreaseQuantity}
                                infos={item}
                            />
                        ))
                    ) : (
                        <h4 className='text-center text-danger mt-5'>
                            Cart is empty
                        </h4>
                    )}
                </div>
                <div className='col-lg-5  col-md-12 col-sm-12 col-12 mt-4 '>
                    <div>
                        <h4>
                            {' '}
                            From{' '}
                            <strong className='text-danger'>
                                Red Onion Foods Restaurant
                            </strong>
                        </h4>
                        <h5>Arriving in 10-20 min</h5>
                        <h6>House no. 105, Road no. 11-B</h6>
                        <h6>Aqua</h6>
                        <h6>Mymensingh</h6>
                    </div>
                    <div style={{ maxWidth: '250px' }} className='mt-5'>
                        <p className='d-flex justify-content-between'>
                            <span>Sub Total . {total} Item</span>{' '}
                            <span>${totalPayment}</span>
                        </p>
                        <p className='d-flex justify-content-between'>
                            <span>Tax</span> <span>${tax}</span>
                        </p>
                        <p className='d-flex justify-content-between'>
                            <span>Delivery Fee</span> <span>$50.00</span>
                        </p>
                        <hr />
                        <h5 className='d-flex justify-content-between'>
                            <span>Total</span> <span>${inTotal}</span>
                        </h5>
                        {inTotal > 0 && (
                            <>
                                <button
                                    onClick={checkOut}
                                    className='btn btn-success btn-block mt-4'
                                >
                                    Proceed to CheckOut
                                </button>
                                <button
                                    onClick={handleClearCart}
                                    className='btn btn-outline-danger btn-block mt-2'
                                >
                                    <i className='fas fa-trash-alt'></i> Limpar Carrinho
                                </button>
                            </>
                        )}

                        <p
                            className='text-danger mt-2'
                            id='proceed-error'
                            style={{ display: 'none' }}
                        >
                            Complete Your Payment
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddedFood;
