import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

const OrderConfirmed = () => {
    let history = useHistory();
    
    useEffect(() => {
        // Redireciona automaticamente para a tela de tracking após 2 segundos
        const timer = setTimeout(() => {
            history.push('/tracking');
        }, 2000);

        return () => clearTimeout(timer);
    }, [history]);

    return (
        <div className="container">
            <div className="text-center mt-5">
                <div style={{ fontSize: '5rem' }}>✓</div>
                <h1 className="text-success my-4">Pedido Confirmado!</h1>
                <p className="text-muted">Redirecionando para acompanhamento...</p>
                <div className="spinner-border text-danger mt-3" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmed; 