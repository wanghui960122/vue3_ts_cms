import hyRequest from '@/service'
import { IDataType } from '../../type'

export const getPageListData = (url: string, queryInfo?: any) => {
  return hyRequest.post({
    url,
    data: queryInfo
  })
}

export const deletePageData = (url: string) => {
  return hyRequest.delete({
    url
  })
}

export function createPageData(url: string, newData: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return hyRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
