// src/components/CreateWallet.js
import React, { useState, useEffect } from 'react';
import { WebApp } from '@twa-dev/sdk';
import { WalletService } from '../services/walletService';

function CreateWallet({ onBack }) {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const tgWebApp = window.Telegram.WebApp;
    
    // 配置后退按钮
    tgWebApp.BackButton.show();
    tgWebApp.BackButton.onClick(onBack);

    // 清理函数
    return () => {
      tgWebApp.BackButton.hide();
      tgWebApp.BackButton.offClick(onBack);
    };
  }, [onBack]);

  const handleCreateWallet = () => {
    try {
      const newWallet = WalletService.createNewWallet();
      setWallet(newWallet);
      
      // 使用Telegram安全存储
      window.Telegram.WebApp.CloudStorage.setItem('kaspaWalletMnemonic', newWallet.mnemonic);
      
      // 震动反馈
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
      
      // 显示钱包创建通知
      window.Telegram.WebApp.showAlert(
        `钱包创建成功\n地址: ${newWallet.address}`,
        () => {}
      );
    } catch (error) {
      window.Telegram.WebApp.showAlert(`创建钱包失败: ${error.message}`);
    }
  };

  const copyMnemonic = () => {
    if (wallet) {
      window.Telegram.WebApp.copyToClipboard(wallet.mnemonic);
      window.Telegram.WebApp.showAlert('助记词已复制到剪贴板');
    }
  };

  return (
    <div className="create-wallet-container">
      <h2>创建Kaspa钱包</h2>
      <button 
        className="primary-button"
        onClick={handleCreateWallet}
      >
        生成新钱包
      </button>

      {wallet && (
        <div className="wallet-details">
          <p>钱包地址: {wallet.address}</p>
          <div className="mnemonic-section">
            <p>助记词:</p>
            <code>{wallet.mnemonic}</code>
            <button 
              className="secondary-button"
              onClick={copyMnemonic}
            >
              复制助记词
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateWallet;