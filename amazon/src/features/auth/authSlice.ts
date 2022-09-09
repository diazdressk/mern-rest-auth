import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { DisplayUser } from './models/DisplayUser.interface';
import { Jwt } from './models/Jwt';
import { LoginUser } from './models/LoginUser.interface';
import { NewUser } from './models/NewUser';
import authService from './services/auth.service';

/* эт при логине,если в локалСтораге есть токен,заберу его и осравню с токеном,который получу с сервера..а при регистрации,там ничего нет,поэтому просто нал */
const storedUser: string | null = localStorage.getItem('user');
const user: DisplayUser | null = !!storedUser ? JSON.parse(storedUser) : null;

const storedJwt: string | null = localStorage.getItem('jwt');
const jwt: Jwt | null = !!storedJwt ? JSON.parse(storedJwt) : null;

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface AuthState extends AsyncState {
  user?: DisplayUser | null;
  jwt?: Jwt;
  isAuthenticated?: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  isAuthenticated: false,
  user: user,
  jwt: jwt,
};

export const register = createAsyncThunk('auth/register', async (user: NewUser, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to register');
  }
});

export const login = createAsyncThunk('auth/login', async (user: LoginUser, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to login');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});


export const verifyJwt = createAsyncThunk('auth/verify-jwt ', async (jwt: string, thunkAPI) => {
  try {
    return await authService.verifyJwt(jwt);
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to verify');
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Register */
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      /* Login */
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        // console.log(action, 'fromSlice');
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.jwt = action.payload.jwt;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuthenticated = false;
      })
      /* Logout */
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.jwt = null;
        state.isAuthenticated = false;
      })
      /* Check Jwt */
      .addCase(verifyJwt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyJwt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = action.payload;/* если норм,токен норм,то будет тру в пейлоаде */
      })
      .addCase(verifyJwt.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuthenticated = false;
      });
  },
});

export const { reset } = authSlice.actions;

export const selectedUser = (state: RootState) => {
  return state.auth;
};

export default authSlice.reducer;
