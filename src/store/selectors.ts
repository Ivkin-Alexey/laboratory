import type { RootState } from './store'

export const selectAccount = (state: RootState) => state.account

export const selectLogin = (state: RootState) => state.account.accountData?.login

export const selectToken = (state: RootState) => state.account.token

export const selectRole = (state: RootState) => state.account.accountData?.role
