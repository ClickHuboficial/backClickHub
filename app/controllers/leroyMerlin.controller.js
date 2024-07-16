const axios = require('axios');

// Substitua pelos detalhes da API da Leroy Merlin
const API_BASE_URL = 'https://api.leroymerlin.com.br/v1';
const API_KEY = 'SUA_API_KEY';

// Função para obter produtos da Leroy Merlin
const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Sucesso na requisição
    console.log(response.data);
  } catch (error) {
    // Tratamento de erros
    console.error('Erro ao obter produtos:', error.response ? error.response.data : error.message);
  }
};

// Chame a função para testar
getProducts();