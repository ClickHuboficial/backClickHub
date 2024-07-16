const axios = require('axios');
const crypto = require('crypto');

const APP_KEY = 'your_app_key';
const APP_SECRET = 'your_app_secret';
const BASE_URL = 'https://partner.shopeemobile.com/api/v2';

const generateSignature = (path, params, appSecret) => {
  const baseString = `${path}|${new URLSearchParams(params).toString()}`;
  return crypto.createHmac('sha256', appSecret).update(baseString).digest('hex');
}

async function getShopInfo() {
  const path = '/shop/get';
  const timestamp = Math.floor(Date.now() / 1000);

  const params = {
    partner_id: APP_KEY,
    timestamp: timestamp,
    sign: generateSignature(path, {
      partner_id: APP_KEY,
      timestamp: timestamp
    }, APP_SECRET)
  };

  try {
    const response = await axios.get(`${BASE_URL}${path}`, { params });
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching shop info:', error);
  }
}

getShopInfo();