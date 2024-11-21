interface TelegramUser {
    id: number;
    username?: string;
    first_name?: string;
  }
  
  export class TelegramService {
    private webApp: any;
  
    constructor() {
      this.webApp = (window as any).Telegram?.WebApp;
    }
  
    isInitialized(): boolean {
      return !!this.webApp;
    }
  
    initialize() {
      if (this.webApp) {
        this.webApp.ready();
        this.webApp.expand();
      }
    }
  
    getUserData(): TelegramUser | null {
      return this.webApp?.initDataUnsafe?.user || null;
    }
  
    sendData(data: any) {
      this.webApp?.sendData(JSON.stringify(data));
    }
  
    showAlert(message: string) {
      this.webApp?.showAlert(message);
    }
  }
  
  export const telegramService = new TelegramService();