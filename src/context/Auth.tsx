import { createContext, useReducer, useEffect, ReactNode, useContext, useState } from 'react';

// Define the shape of the authentication state
interface AuthState {
  user: { email: string; role: string, image: string, name: string } | null;
  token: string | null;
  fetchedUsers: any[]; // State for fetched users
  searchedUsers: any[]; // State for searched users
}

// Define the actions for the reducer
type AuthAction =
  | { type: 'LOGIN'; payload: { user: { email: string; role: string, image: string, name: string }; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_FROM_STORAGE'; payload: { user: { email: string; role: string, image: string, name: string } | null; token: string | null } }
  | { type: 'SET_FETCHED_USERS'; payload: any[] }
  | { type: 'SET_SEARCHED_USERS'; payload: any[] };

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  fetchedUsers: [],
  searchedUsers: [],
};

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        fetchedUsers: [],
        searchedUsers: [],
      };
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'SET_FETCHED_USERS':
      return {
        ...state,
        fetchedUsers: action.payload,
      };
    case 'SET_SEARCHED_USERS':
      return {
        ...state,
        searchedUsers: action.payload,
      };
    default:
      return state;
  }
};

// Define the context type
interface AuthContextType {
  user: { email: string, role: string, name: string, image: string } | null;
  token: string | null;
  fetchedUsers: any[];
  searchedUsers: any[];
  visible: boolean;
  toggleVisible: () => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: string) => Promise<void>;
  logout: () => void;
  getAllUsers: () => Promise<void>;
  searchUsers: (query: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  resetPasswordRequest: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateUserProfile: (formData: FormData) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [visible, setVisible] = useState<boolean>(false); // State for visibility

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

  const toggleVisible = () => {
    setVisible((prev) => !prev); // Toggle the visibility state
  };

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

    const userData = { email, role: data.role, image: data.image, name: data.name }; // Assuming the response contains user role

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
    const userData = { email, role: data.role, image: data.image, name: data.name }; // Assuming the response contains user role

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

  const getAllUsers = async () => {
    const response = await fetch('https://etemplate-backend.vercel.app/api/user', {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const users = await response.json();
    dispatch({ type: 'SET_FETCHED_USERS', payload: users });
  };

  const searchUsers = async (query: string) => {
    const response = await fetch(`https://etemplate-backend.vercel.app/api/user/search?query=${query}`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to search users');
    }

    const users = await response.json();
    dispatch({ type: 'SET_SEARCHED_USERS', payload: users });
  };

  const deleteUser = async (id: string) => {
    const response = await fetch(`https://etemplate-backend.vercel.app/api/user/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  };

  const resetPasswordRequest = async (email: string) => {
    const response = await fetch('https://etemplate-backend.vercel.app/api/user/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Failed to request password reset');
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    const response = await fetch('https://etemplate-backend.vercel.app/api/user/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
      throw new Error('Failed to reset password');
    }
  };

  const updateUserProfile = async (formData: FormData) => {
    const response = await fetch('https://etemplate-backend.vercel.app/api/user/profile', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return response.json();
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        fetchedUsers: state.fetchedUsers,
        searchedUsers: state.searchedUsers,
        visible,
        toggleVisible,
        login,
        signup,
        logout,
        getAllUsers,
        searchUsers,
        deleteUser,
        resetPasswordRequest,
        resetPassword,
        updateUserProfile,
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