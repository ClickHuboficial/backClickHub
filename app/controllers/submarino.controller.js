const axios = require('axios');

const SUBMARINO_API_BASE_URL = 'https://api.submarino.com.br';
const API_KEY = 'sua_chave_de_api_aqui';

const submarinoApi = axios.create({
  baseURL: SUBMARINO_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

const getProduto = async (produtoId) => {
  try {
    const response = await submarinoApi.get(`/produto/${produtoId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter o produto:', error);
    throw error;
  }
};

module.exports = {
  getProduto
};