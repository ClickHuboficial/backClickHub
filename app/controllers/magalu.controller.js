const axios = require('axios');

const MAGALU_API_KEY = 'suakey'

const magaluAPI = axios.create({
    baseURL: 'https://api.magalu.com', // Base URL da API do Magalu
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAGALU_API_KEY}` // Utilize uma variável de ambiente para o token de autenticação
    }
});

// Função para obter produtos (exemplo)
async function getProducts() {
    try {
        const response = await magaluAPI.get('/v1/products');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
}

// Função para criar um produto (exemplo)
async function createProduct(productData) {
    try {
        const response = await magaluAPI.post('/v1/products', productData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        throw error;
    }
}

module.exports = {
    getProducts,
    createProduct
};