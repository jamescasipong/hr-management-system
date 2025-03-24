// utils.ts

/* type State<T extends Record<string, any>> = {
    [K in keyof T]: T[K];
};

export const reducer = <T extends Record<string, any>>(state: State<T>, action: T) => {
    // Get all the keys from the current state
    const stateKeys = Object.keys(state);

    // Filter out properties from the action that don't exist in the current state
    const filteredAction = Object.keys(action)
        .filter((key) => stateKeys.includes(key))
        .reduce((validAction: Partial<T>, key) => {
            (validAction as Record<string, any>)[key] = action[key];
            return validAction;
        }, {} as Partial<T>);

    // Return a new state by merging the current state with the filtered action
    return {
        ...state,
        ...filteredAction,
    };
};


type Action<T> =
  | { type: "UPDATE_STATE"; payload: Partial<T> } // Partial updates
  | { type: "RESET"; initialState: T }; // Reset to initial state

export const safelyReducer = <T extends Record<string, any>>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case "UPDATE_STATE":
      return { ...state, ...action.payload };
    case "RESET":
      return action.initialState;
    default:
      return state;
  }
}; */

// export type LoginReducerProps ={
//   state: LoginState;
//   action: ReducerAction;
// }


export interface LoginState {
  email: string;
  password: string;
  showPassword: boolean;
  twoFactorCode: string;
  passwordError: string;
  emailError: string;
  twoFactorEnabled: boolean;
  rememberMe: boolean;
};

export enum ReducerActionType {
  EMAIL = "email",
  PASSWORD = "password",
  TWO_FACTOR_CODE = "twoFactorCode",
  PASSWORD_ERROR = "passwordError",
  EMAIL_ERROR = "emailError",
  REMEMBER_ME = "rememberMe",
  TWO_FACTOR_ENABLED = "twoFactorEnabled",
  SHOW_PASSWORD = "showPassword"
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
    case "passwordError":
      return { ...state, passwordError: payload };
    case "twoFactorEnabled":
      return { ...state, twoFactorEnabled: payload };
    case "emailError":
      return { ...state, emailError: payload };
    case "rememberMe":
      return { ...state, rememberMe: payload };
    case "showPassword":
      return { ...state, showPassword: payload };
    default:
      return state;
  }
}

