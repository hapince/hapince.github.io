// src/services/kaspaNodeService.js
import axios from 'axios';

export class KaspaNodeService {
  static KASPA_RPC_URL = 'https://kaspa-rpc-endpoint.com';

  static async getAddressBalance(address) {
    try {
      const response = await axios.post(this.KASPA_RPC_URL, {
        jsonrpc: '2.0',
        method: 'getBalanceByAddress',
        params: [address]
      });
      
      return response.data.result.balance;
    } catch (error) {
      console.error('获取地址余额失败', error);
      throw error;
    }
  }

  static async sendTransaction(fromAddress, toAddress, amount, privateKey) {
    try {
      const response = await axios.post(this.KASPA_RPC_URL, {
        jsonrpc: '2.0',
        method: 'sendTransaction',
        params: [{
          from: fromAddress,
          to: toAddress,
          amount: amount,
          privateKey: privateKey
        }]
      });
      
      return response.data.result.txHash;
    } catch (error) {
      console.error('发送交易失败', error);
      throw error;
    }
  }
}