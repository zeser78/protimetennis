import { Action } from "@ngrx/store";

export const AUTH_HEADER = "Auth Header";
export const NOAUTH_HEADER = "No Auth Header";

export class AuthHeader implements Action {
  readonly type = AUTH_HEADER;
}

export class NoAuthHeader implements Action {
  readonly type = NOAUTH_HEADER;
}

export type AUTHActions = AuthHeader | NoAuthHeader;
