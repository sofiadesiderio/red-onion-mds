import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { orderStatus } from './mockData';
import OrderRating from './OrderRating';
import { processOrder } from './databaseManager';
import './style.css';

const OrderTracking = () => {
    const history = useHistory();
    const [currentStatus, setCurrentStatus] = useState('pending');
    const [orderNumber] = useState(() => 'ORD-' + Date.now());
    const [estimatedTime] = useState('20-30 minutos');
    const [showRating, setShowRating] = useState(false);
    const [orderData, setOrderData] = useState(null);

    // Carregar dados do pedido e limpar carrinho
    useEffect(() => {
        const savedOrder = localStorage.getItem('currentOrder');
        if (savedOrder) {
            setOrderData(JSON.parse(savedOrder));
        }
        
        // Limpar o carrinho quando o tracking for aberto (pedido confirmado)
        processOrder();
    }, []);

    // Simula a progressão do pedido
    useEffect(() => {
        const statusFlow = ['pending', 'preparing', 'ready', 'delivering', 'delivered'];
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < statusFlow.length - 1) {
                currentIndex++;
                setCurrentStatus(statusFlow[currentIndex]);
            } else {
                clearInterval(interval);
                // Mostrar modal de avaliação quando entregar
                setTimeout(() => setShowRating(true), 1000);
            }
        }, 5000); // Muda status a cada 5 segundos

        return () => clearInterval(interval);
    }, []);

    const status = orderStatus[currentStatus];
    const address = orderData?.address || {};

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-lg-8 col-md-10 col-12'>
                    <div className='text-center mb-5'>
                        <h2 className='text-success mb-3'>
                            <i className='fas fa-check-circle'></i> Pedido Confirmado!
                        </h2>
                        <p className='text-muted'>Número do pedido: <strong>{orderNumber}</strong></p>
                        <p className='text-muted'>Tempo estimado: <strong>{estimatedTime}</strong></p>
                    </div>

                    {/* Status Atual */}
                    <div 
                        className='card shadow-sm mb-4'
                        style={{
                            borderLeft: `5px solid ${status.color}`,
                        }}
                    >
                        <div className='card-body'>
                            <div className='d-flex align-items-center'>
                                <div 
                                    style={{ 
                                        fontSize: '3rem',
                                        marginRight: '1.5rem',
                                    }}
                                >
                                    <i className={`fas ${status.icon}`}></i>
                                </div>
                                <div>
                                    <h4 style={{ color: status.color, marginBottom: '0.5rem' }}>
                                        {status.label}
                                    </h4>
                                    <p className='text-muted mb-0'>{status.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline de Status */}
                    <div className='card shadow-sm mb-4'>
                        <div className='card-body'>
                            <h5 className='mb-4'>Histórico do Pedido</h5>
                            <div className='timeline'>
                                {Object.entries(orderStatus).map(([key, value], index) => {
                                    const statusKeys = Object.keys(orderStatus);
                                    const currentIndex = statusKeys.indexOf(currentStatus);
                                    const itemIndex = statusKeys.indexOf(key);
                                    const isCompleted = itemIndex <= currentIndex;

                                    return (
                                        <div 
                                            key={key} 
                                            className='d-flex mb-3'
                                            style={{ opacity: isCompleted ? 1 : 0.4 }}
                                        >
                                            <div 
                                                className='mr-3'
                                                style={{
                                                    minWidth: '40px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '50%',
                                                        backgroundColor: isCompleted ? value.color : '#e9ecef',
                                                        color: 'white',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 'bold',
                                                        fontSize: '1.2rem',
                                                    }}
                                                >
                                                    {isCompleted ? (
                                                        <i className='fas fa-check'></i>
                                                    ) : (
                                                        <i className={`fas ${value.icon}`}></i>
                                                    )}
                                                </div>
                                                {index < Object.keys(orderStatus).length - 1 && (
                                                    <div
                                                        style={{
                                                            width: '2px',
                                                            height: '30px',
                                                            backgroundColor: isCompleted ? value.color : '#e9ecef',
                                                            margin: '5px auto',
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <h6 className='mb-1'>{value.label}</h6>
                                                <p className='text-muted small mb-0'>{value.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Informações de Entrega */}
                    <div className='card shadow-sm mb-4'>
                        <div className='card-body'>
                            <h5 className='mb-3'>Detalhes da Entrega</h5>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <p className='mb-2'>
                                        <strong>Endereço:</strong>
                                    </p>
                                    <p className='text-muted small'>
                                        {address.road ? `${address.road}, ${address.house}` : 'Rua das Flores, 789'} 
                                        {address.flat && ` - ${address.business} ${address.flat}`}
                                        <br />
                                        {address.city || 'São Paulo'}, SP<br />
                                        CEP: 01234-567
                                    </p>
                                </div>
                                <div className='col-md-6'>
                                    <p className='mb-2'>
                                        <strong>Telefone:</strong>
                                    </p>
                                    <p className='text-muted small'>{address.phone || '(11) 98765-4321'}</p>
                                    
                                    <p className='mb-2 mt-3'>
                                        <strong>Pagamento:</strong>
                                    </p>
                                    <p className='text-muted small'>Cartão de Crédito •••• 1122</p>
                                </div>
                            </div>
                            
                            {/* Notas do Pedido */}
                            {address.orderNotes && (
                                <div className='mt-3 pt-3 border-top'>
                                    <p className='mb-2'>
                                        <strong>
                                            <i className='fas fa-sticky-note'></i> Observações do Pedido:
                                        </strong>
                                    </p>
                                    <p className='text-muted small' style={{
                                        backgroundColor: '#fff3cd',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        borderLeft: '3px solid #ffc107',
                                    }}>
                                        {address.orderNotes}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className='text-center mb-5'>
                        <button
                            onClick={() => history.push('/')}
                            className='btn btn-outline-danger btn-lg mx-2 mb-2'
                        >
                            Voltar para Home
                        </button>
                        {currentStatus === 'delivered' && (
                            <>
                                <button
                                    onClick={() => setShowRating(true)}
                                    className='btn btn-warning btn-lg mx-2 mb-2'
                                >
                                    <i className='fas fa-star'></i> Avaliar Pedido
                                </button>
                                <button
                                    onClick={() => history.push('/foods')}
                                    className='btn btn-danger btn-lg mx-2 mb-2'
                                >
                                    Fazer Novo Pedido
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Avaliação */}
            <OrderRating
                show={showRating}
                onClose={() => setShowRating(false)}
                orderNumber={orderNumber}
            />
        </div>
    );
};

export default OrderTracking;
