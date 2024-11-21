import React, { useState, useEffect } from 'react';
import { WebApp } from '@twa-dev/sdk';
import CreateWallet from './components/CreateWallet';
import ImportWallet from './components/ImportWallet';
import SendTransaction from './components/SendTransaction';
import AddressInfo from './components/AddressInfo';

function App() {
  const [webApp, setWebApp] = useState(null);
  const [currentView, setCurrentView] = useState('main');

  useEffect(() => {
    // 初始化Telegram Web App
    const tgWebApp = window.Telegram.WebApp;
    tgWebApp.ready();
    
    // 配置Web App外观
    tgWebApp.backgroundColor = '#2b5278';
    tgWebApp.headerColor = '#2b5278';
    
    // 启用扩展模式
    tgWebApp.expand();
    
    setWebApp(tgWebApp);
  }, []);

  // 导航函数
  const navigateTo = (view) => {
    setCurrentView(view);
    webApp?.HapticFeedback.impactOccurred('light');
  };

  const renderView = () => {
    switch(currentView) {
      case 'create':
        return <CreateWallet onBack={() => navigateTo('main')} />;
      case 'import':
        return <ImportWallet onBack={() => navigateTo('main')} />;
      case 'send':
        return <SendTransaction onBack={() => navigateTo('main')} />;
      case 'address':
        return <AddressInfo onBack={() => navigateTo('main')} />;
      default:
        return (
          <div className="main-menu">
            <button onClick={() => navigateTo('create')}>
              创建新钱包
            </button>
            <button onClick={() => navigateTo('import')}>
              导入钱包
            </button>
            <button onClick={() => navigateTo('send')}>
              发送交易
            </button>
            <button onClick={() => navigateTo('address')}>
              地址信息
            </button>
          </div>
        );
    }
  };

  return (
    <div className="telegram-webapp">
      {renderView()}
    </div>
  );
}

export default App;