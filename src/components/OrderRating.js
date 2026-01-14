import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import './style.css';

const OrderRating = ({ show, onClose, orderNumber }) => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        const ratingData = {
            orderNumber,
            rating,
            comment,
            date: new Date().toISOString(),
        };
        
        // Salvar no localStorage
        const ratings = JSON.parse(localStorage.getItem('orderRatings') || '[]');
        ratings.push(ratingData);
        localStorage.setItem('orderRatings', JSON.stringify(ratings));
        
        setSubmitted(true);
        
        // Fechar após 2 segundos
        setTimeout(() => {
            onClose();
            setSubmitted(false);
            setRating(0);
            setComment('');
        }, 2000);
    };

    const handleStarClick = (star) => {
        setRating(star);
    };

    const renderStars = () => {
        return [1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                aria-label={`Avaliar com ${star} estrela${star > 1 ? 's' : ''}`}
                style={{
                    fontSize: '3rem',
                    cursor: 'pointer',
                    color: star <= (hoveredRating || rating) ? '#ffc107' : '#e4e5e9',
                    transition: 'color 0.2s',
                    marginRight: '0.5rem',
                    border: 'none',
                    background: 'transparent',
                    padding: 0,
                }}
            >
                ★
            </button>
        ));
    };

    const getRatingLabel = (stars) => {
        const labels = {
            1: 'Muito Ruim',
            2: 'Ruim',
            3: 'Regular',
            4: 'Bom',
            5: 'Excelente',
        };
        return labels[stars] || '';
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {submitted ? (
                        <><i className='fas fa-check-circle'></i> Avaliação enviada!</>
                    ) : (
                        <><i className='fas fa-star'></i> Avalie seu pedido</>
                    )}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {submitted ? (
                    <div className='text-center py-4'>
                        <i className='fas fa-check-circle text-success' style={{ fontSize: '4rem' }}></i>
                        <h4 className='text-success mt-3'>Obrigado pelo feedback!</h4>
                        <p className='text-muted'>
                            Sua avaliação nos ajuda a melhorar nossos serviços.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className='text-center mb-4'>
                            <p className='mb-3'>Como foi sua experiência com o pedido?</p>
                            <div className='mb-2'>{renderStars()}</div>
                            {rating > 0 && (
                                <p className='text-muted' style={{ fontSize: '1.2rem' }}>
                                    {getRatingLabel(rating)}
                                </p>
                            )}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='rating-comment' className='form-label'>
                                Comentários (opcional):
                            </label>
                            <textarea
                                id='rating-comment'
                                className='form-control'
                                rows='4'
                                placeholder='Conte-nos mais sobre sua experiência...'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>

                        <small className='text-muted'>
                            Pedido #{orderNumber}
                        </small>
                    </>
                )}
            </Modal.Body>
            {!submitted && (
                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant='danger'
                        onClick={handleSubmit}
                        disabled={rating === 0}
                    >
                        Enviar Avaliação
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
};

OrderRating.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    orderNumber: PropTypes.string.isRequired,
};

export default OrderRating;