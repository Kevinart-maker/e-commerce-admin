import { createContext, useReducer, useEffect, ReactNode, useContext } from 'react';

// Define the shape of the authentication state
interface AuthState {
  user: { email: string } | null;
  token: string | null;
}

// Define the actions for the reducer
type AuthAction =
  | { type: 'LOGIN'; payload: { user: { email: string }; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_FROM_STORAGE'; payload: { user: { email: string } | null; token: string | null } };

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
};

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        user: null,
        token: null,
      };
    case 'LOAD_FROM_STORAGE':
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

// Define the context type
interface AuthContextType {
  user: { email: string } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user and token from local storage on app initialization
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      dispatch({
        type: 'LOAD_FROM_STORAGE',
        payload: {
          user: JSON.parse(storedUser),
          token: storedToken,
        },
      });
    }
  }, []);


  const login = async (email: string, password: string) => {
    const response = await fetch('https://etemplate-backend.vercel.app/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    const userData = { email };

    // Dispatch login action
    dispatch({
      type: 'LOGIN',
      payload: {
        user: userData,
        token: data.token,
      },
    });

    // Save user and token to local storage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', data.token);
  };

  const signup = async (email: string, password: string, name: string, role: string) => {
    const response = await fetch('https://etemplate-backend.vercel.app/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, role }),
    });

    if (!response.ok) {
      throw new Error('User exists!');
    }

    const data = await response.json();
    const userData = { email };

    // Dispatch login action after signup
    dispatch({
      type: 'LOGIN',
      payload: {
        user: userData,
        token: data.token,
      },
    });

    // Save user and token to local storage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    // Dispatch logout action
    dispatch({ type: 'LOGOUT' });

    // Remove user and token from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};