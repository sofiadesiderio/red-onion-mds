import React from 'react';
import './style.css'
import PropTypes from 'prop-types';

const Count = (props) => {
    const {count,setCount}=props;

    function decrease(value){
        if(value>=0){
            setCount(value);
        }
    }
    return (
        <div className="d-flex">
            <button className="btn btn-light" onClick={()=>setCount(count+1)}>+</button>
            <input type="text" className="form-control input-custom" id="number" value={count}   />
            <button onClick={()=>decrease(count-1)} className="btn btn-light">-</button>
        </div>
    );
};

Count.propTypes = {
    count: PropTypes.number.isRequired,
    setCount: PropTypes.func.isRequired,
};


export default Count;