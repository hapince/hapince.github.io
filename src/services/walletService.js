// src/services/walletService.js
import { generateMnemonic, validateMnemonic } from 'kaspa-wallet-lib';
import { derivePrivateKey, getPublicAddress } from './cryptoUtils';

export class WalletService {
  static createNewWallet() {
    // 生成助记词
    const mnemonic = generateMnemonic();
    
    // 从助记词推导私钥
    const privateKey = derivePrivateKey(mnemonic);
    
    // 获取公共地址
    const address = getPublicAddress(privateKey);
    
    return {
      mnemonic,
      privateKey,
      address
    };
  }

  static importWalletFromMnemonic(mnemonic) {
    // 验证助记词
    if (!validateMnemonic(mnemonic)) {
      throw new Error('无效的助记词');
    }
    
    const privateKey = derivePrivateKey(mnemonic);
    const address = getPublicAddress(privateKey);
    
    return {
      mnemonic,
      privateKey, 
      address
    };
  }
}