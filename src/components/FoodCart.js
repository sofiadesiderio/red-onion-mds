import React from 'react';
import { Card } from 'react-bootstrap';
import './style.css';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
const FoodCart = (props) => {
     
    
    const {name,price,shortDescription,id}=props.info;
    return (
            <Link className="card-link" to={`/foodDetails/${id}`}>
                <Card className="card mx-2" style={{ width: '18rem'}}>
                <Card.Img variant="top" style={{width:"14rem",margin:"auto"}} src={props.info.images[0]} />
                <Card.Body>
                    <Card.Title className="text-center card-name">{name}</Card.Title>
                    <p className="text-center card-description">{shortDescription}</p>
                    <h5 className="text-center card-price">${price}</h5>
                </Card.Body>
                </Card>
            </Link>
    );
};

FoodCart.propTypes = {
    info: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        shortDescription: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default FoodCart;