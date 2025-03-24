export interface LoginState {
    email: string;
    password: string;
    showPassword: boolean;
    twoFactorCode: string;
    error: string;
    twoFactorEnabled: boolean;
    rememberMe: boolean;
    isLoading: boolean;
  };
  
  export enum ReducerActionType {
    EMAIL = "email",
    PASSWORD = "password",
    SHOW_PASSWORD = "showPassword",
    TWO_FACTOR_CODE = "twoFactorCode",
    ERROR = "error",
    TWO_FACTOR_ENABLED = "twoFactorEnabled",
    REMEMBER_ME = "rememberMe",
    IS_LOADING = "isLoading"
  };
  
  type LoginActions = ReducerAction<ReducerActionType>;
  
  export const loginReducer = (state: LoginState, action: LoginActions) => {
    const { type, payload } = action;
    
    switch (type) {
      case "email":
        return { ...state, email: payload };
      case "password":
        return { ...state, password: payload };
      case "twoFactorCode":
        return { ...state, twoFactorCode: payload };
      case "error":
        return { ...state, passwordError: payload };
      case "twoFactorEnabled":
        return { ...state, twoFactorEnabled: payload };
      case "rememberMe":
        return { ...state, rememberMe: payload };
      case "showPassword":
        return { ...state, showPassword: payload };
      case "isLoading":
        return { ...state, isLoading: payload };
      default:
        return state;
    }
  }