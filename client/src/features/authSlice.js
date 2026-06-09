import { createSlice } from '@reduxjs/toolkit';

// Read token and user from localStorage if they exist to rehydrate state on app start
const token = localStorage.getItem('token');
const userJson = localStorage.getItem('user');
let user = null;

if (userJson) {
  try {
    user = JSON.parse(userJson);
  } catch (e) {
    console.error('Failed to parse cached user:', e);
    localStorage.removeItem('user');
  }
}

const initialState = {
  user,
  token,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCredentials, clearAuth, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;
