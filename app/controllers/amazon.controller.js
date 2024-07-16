const amazonMws = require('amazon-mws')();


const config = {
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    merchantId: 'YOUR_MERCHANT_ID',
    marketplaceId: 'YOUR_MARKETPLACE_ID'
  };

amazonMws.setApiKey(config.accessKeyId, config.secretAccessKey);

const checkConnection = async () => {
  try {
    const response = await amazonMws.orders.search({
      'Version': '2013-09-01',
      'Action': 'ListOrders',
      'SellerId': config.merchantId,
      'MWSAuthToken': 'YOUR_MWS_AUTH_TOKEN', // Se aplicável
      'MarketplaceId.Id.1': config.marketplaceId,
      'CreatedAfter': new Date(Date.now() - 24*60*60*1000).toISOString() // Últimas 24 horas
    });

    console.log('Conexão bem-sucedida:', response);
  } catch (error) {
    console.error('Erro ao conectar:', error);
  }
};

checkConnection();