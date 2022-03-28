export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: any
}
