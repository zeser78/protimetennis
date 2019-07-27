import { Action } from "@ngrx/store";

import { AUTHActions, AUTH_HEADER, NOAUTH_HEADER } from "./app.actions";

export interface State {
  isAuthHeader: boolean;
}

const initialState = {
  isAuthHeader: false
};

export function appReducer(state = initialState, action: AUTHActions) {
  switch (action.type) {
    case AUTH_HEADER:
      return {
        isAuthHeader: true
      };
    case NOAUTH_HEADER:
      return {
        isAuthHeader: false
      };
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isAuthHeader;
