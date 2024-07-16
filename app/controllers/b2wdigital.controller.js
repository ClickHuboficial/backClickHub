require('dotenv').config();
const axios = require('axios');

// Função para obter token de autenticação
async function getAuthToken() {
  const response = await axios.post(`${process.env.B2W_API_URL}/auth`, {
    apiKey: process.env.B2W_API_KEY,
    apiSecret: process.env.B2W_API_SECRET
  });

  return response.data.access_token;
}

// Função para fazer requisições autenticadas
async function b2wRequest(endpoint, method = 'GET', data = {}) {
  const token = await getAuthToken();

  const config = {
    method: method,
    url: `${process.env.B2W_API_URL}${endpoint}`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Error making request:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Exemplo de uso da função para obter produtos
async function getProducts() {
  try {
    const products = await b2wRequest('/products', 'GET');
    console.log(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
  }
}

getProducts();