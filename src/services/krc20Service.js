// src/services/krc20Service.js
import axios from 'axios';

export class KRC20Service {
  static KASPA_KRC20_API = 'https://kaspa-krc20-api.com';

  static async getAddressTokens(address) {
    try {
      const response = await axios.get(`${this.KASPA_KRC20_API}/tokens/${address}`);
      return response.data.tokens;
    } catch (error) {
      console.error('获取KRC20代币失败', error);
      throw error;
    }
  }

  static async getTokenDetails(tokenAddress) {
    try {
      const response = await axios.get(`${this.KASPA_KRC20_API}/token/${tokenAddress}`);
      return response.data.tokenInfo;
    } catch (error) {
      console.error('获取代币详情失败', error);
      throw error;
    }
  }
}