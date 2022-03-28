import hyRequest from '..'
import { IAccount, ILoginResult } from './type'
import { IDataType } from '../type'
enum LoginApi {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}

export const accountRequest = (data: IAccount) => {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data
  })
}

export const requestUserInfoById = (id: number) => {
  return hyRequest.get<IDataType>({
    url: LoginApi.LoginUserInfo + id
  })
}

export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginApi.UserMenus + id + '/menu',
    showLoading: false
  })
}
