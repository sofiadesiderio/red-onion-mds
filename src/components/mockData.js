// Dados Mock para Checkout e Testes

export const mockCheckoutData = {
    // Informações do Cliente
    customer: {
        name: 'Lucas Silva',
        email: 'lucas@email.com',
        phone: '11987654321',
    },

    // Endereço de Entrega
    address: {
        business: 'Apartamento',
        flat: '205',
        house: '789',
        road: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
    },

    // Cartão de Crédito Mock (use este número no checkout)
    creditCard: {
        number: '15101122',
        name: 'LUCAS SILVA',
        expiry: '12/28',
        cvv: '123',
    },

    // Outros métodos de pagamento mock
    alternativePayments: {
        pix: {
            key: 'lucas@email.com',
            qrCode: 'mock-qr-code-123456',
        },
        debit: {
            number: '15101122',
            name: 'LUCAS SILVA',
            expiry: '12/28',
        },
    },
};

// Status do pedido para acompanhamento
export const orderStatus = {
    pending: {
        label: 'Pedido Recebido',
        description: 'Seu pedido foi recebido e está sendo processado',
        icon: '📝',
        color: '#ffc107',
    },
    preparing: {
        label: 'Em Preparação',
        description: 'Estamos preparando seu pedido com carinho',
        icon: '👨‍🍳',
        color: '#17a2b8',
    },
    ready: {
        label: 'Pronto para Entrega',
        description: 'Seu pedido está pronto e aguardando o entregador',
        icon: '✅',
        color: '#28a745',
    },
    delivering: {
        label: 'Em Rota de Entrega',
        description: 'Seu pedido está a caminho',
        icon: '🚴',
        color: '#007bff',
    },
    delivered: {
        label: 'Entregue',
        description: 'Pedido entregue com sucesso. Bom apetite!',
        icon: '🎉',
        color: '#28a745',
    },
};

export default mockCheckoutData;
