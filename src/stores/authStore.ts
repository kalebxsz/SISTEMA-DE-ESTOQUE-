import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

type AuthPersist = (
  config: StateCreator<AuthState>,
  options: PersistOptions<AuthState>
) => StateCreator<AuthState>;

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export const useAuthStore = create<AuthState>()(
  (persist as AuthPersist)(
    (set: (state: Partial<AuthState>) => void) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await api.post('/auth/login', { email, password });
          const { user, token } = response.data;

          set({
            user,
            token,
            isAuthenticated: true
          });

          // Configura o token para todas as requisições futuras
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
          throw new Error('Falha na autenticação');
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
        delete api.defaults.headers.common['Authorization'];
      }
    }),
    {
      name: 'auth-storage'
    }
  )
); 