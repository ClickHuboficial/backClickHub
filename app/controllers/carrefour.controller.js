const axios = require('axios');

// Função para conectar à API do Carrefour
async function conectarCarrefour() {
    // URL da API do Carrefour (modifique conforme necessário)
    const url = 'https://api.carrefour.com.br/v1/endpoint'; 

    // Sua chave de API
    const apiKey = 'SUA_CHAVE_DE_API_AQUI';

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        // Processa a resposta da API conforme necessário
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao conectar à API do Carrefour:', error);
        throw error;
    }
}

// Chamar a função para testar a conexão
conectarCarrefour();