import React, { useEffect, useState, useContext } from 'react';
import Data from './Data';
import { useParams } from 'react-router-dom';
import './style.css';
import { addToDatabaseCart, getDatabaseCart } from './databaseManager';
import { FoodContext } from '../App';
import Count from './Count';

const FoodDetails = () => {
    const [foodCart, setFoodCart] = useContext(FoodContext);
    const [count, setCount] = useState(1);
    const { id } = useParams();
    const food = Data.filter((key) => key.id == id);

    const detail = food[0];
    const [photo, setPhoto] = useState(detail.images[0]);

    useEffect(() => {
        const foods = getDatabaseCart();
        console.log(foods);
    }, [foodCart]);

    function addFood(food) {
        food.count = count;
        const newFood = { ...foodCart, food };
        addToDatabaseCart(food.id, food.count);
        setFoodCart(newFood);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-6 col-md-12 col-sm-12 col-12 order-lg-first order-md-last order-sm-last order-last'>
                    <h3 className='mb-4'>{detail.name}</h3>
                    <p
                        style={{ maxWidth: '400px' }}
                        className='text-justify mb-4'
                    >
                        {detail.fullDescription}
                    </p>
                    <h3>Price: ${detail.price}</h3>

                    <Count count={count} setCount={setCount} />

                    <button
                        onClick={() => addFood(detail)}
                        className='btn-add btn btn-danger mt-3 '
                    >
                        Add
                    </button>

                    <div className='mt-4'>
                        <button
                            type='button'
                            onClick={() => setPhoto(detail.images[0])}
                            className='btn p-0 mx-2'
                            style={{ border: 'none', background: 'none' }}
                        >
                            <img
                                style={{ maxWidth: '150px' }}   
                                src={detail.images[0]}
                                alt={detail.name}
                            />
                        </button>
                        <button
                            type='button'
                            onClick={() => setPhoto(detail.images[1])}
                            className='btn p-0 mx-2'
                            style={{ border: 'none', background: 'none' }}
                        >
                            <img
                                style={{ maxWidth: '150px' }}
                                src={detail.images[1]}
                                alt={detail.name}
                            />
                        </button>
                    </div>
                </div>

                <div className='col-lg-6 col-md-12 col-sm-12 col-12 order-lg-last order-md-first order-sm-first order-first'>
                    <img
                        style={{ maxWidth: '500px', width: '90%' }}
                        src={photo}
                        alt='food'
                    />
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;
