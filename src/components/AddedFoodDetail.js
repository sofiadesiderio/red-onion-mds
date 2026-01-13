import './style.css';
import {Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function AddedFoodDetail(props) {
   

  const { id, name, price, count } = props.infos;
      
  const image=props.infos.images[0];

  return (
    <div className=" row border justify-content-center align-items-center my-3 p-3" >
      <img className="col-lg-4 col-md-12 col-sm-12 col-12" alt="food" src={image} style={{maxWidth:"200px"}} />
      <div className="col-lg-8 col-md-12 col-sm-12 col-12">
          <h4>{name}</h4>
          <div>
            <h5>Price <span className="badge badge-success">{price}$</span></h5>
            <div className="d-flex align-items-center my-2">
              <h6 className="mb-0 mr-2">Quantity:</h6>
              <button 
                className="btn btn-sm btn-outline-secondary" 
                onClick={() => props.decreaseQuantity(id)}
              >
                -
              </button>
              <span className="badge badge-warning mx-2" style={{fontSize: '1rem', padding: '0.5rem'}}>{count}</span>
              <button 
                className="btn btn-sm btn-outline-secondary" 
                onClick={() => props.increaseQuantity(id)}
              >
                +
              </button>
            </div>
          </div>
          <Button className="btn-sm" onClick={()=>props.removeItem(id)} variant="danger">Remove</Button>
      </div>
    </div>
  );
}

AddedFoodDetail.propTypes = {
    infos: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        type: PropTypes.string,
        name: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        count: PropTypes.number.isRequired,
        shortDescription: PropTypes.string,
        fullDescription: PropTypes.string,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,

    removeItem: PropTypes.func.isRequired,
    increaseQuantity: PropTypes.func.isRequired,
    decreaseQuantity: PropTypes.func.isRequired,
};
