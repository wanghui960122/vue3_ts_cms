export const contentConfig = {
  title: '商品列表',
  showColumnSelect: true,
  showColumnIndex: true,
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '100' },
    {
      prop: 'oldPrice',
      label: '原价格',
      minWidth: '100',
      slotName: 'oldPrice'
    },
    { prop: 'newPrice', label: '现价格', minWidth: '100' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ]
}
