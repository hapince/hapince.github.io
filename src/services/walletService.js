import axios from 'axios';

const API_BASE_URL = 'https://your-backend-api.com';

export class APIService {
  private token: string | null = null;

  async authenticate(userId: number, username: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth`, {
        user_id: userId,
        username
      });
      this.token = response.data.token;
      localStorage.setItem('game_token', this.token);
      return response.data;
    } catch (error) {
      console.error('Authentication failed', error);
      throw error;
    }
  }

  async findMatch() {
    try {
      const response = await axios.post(`${API_BASE_URL}/matchmaking`, 
        {},
        {
          headers: { 
            'Authorization': this.token || localStorage.getItem('game_token')
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Matchmaking failed', error);
      throw error;
    }
  }

  async saveScore(score: number) {
    try {
      await axios.post(`${API_BASE_URL}/score`, 
        { score },
        {
          headers: { 
            'Authorization': this.token || localStorage.getItem('game_token')
          }
        }
      );
    } catch (error) {
      console.error('Score saving failed', error);
    }
  }

  async getLeaderboard() {
    try {
      const response = await axios.get(`${API_BASE_URL}/leaderboard`);
      return response.data;
    } catch (error) {
      console.error('Leaderboard fetch failed', error);
      throw error;
    }
  }
}

export const apiService = new APIService();