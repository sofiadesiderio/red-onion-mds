import React, { useState, useEffect } from 'react';
import Data from './Data';
import FoodCart from './FoodCart';

const Foods = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(Data);
    }, []);
    return (
        <div className='container'>
            <div className='row align-items-center justify-content-center mt-5'>
                {data.map((item) => (
                    <FoodCart info={item} key={item.id} />
                ))}
            </div>
        </div>
    );
};

export default Foods;
