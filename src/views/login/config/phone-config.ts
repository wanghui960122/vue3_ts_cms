// 编写好规则
export const rules = {
  phone: [
    {
      required: true,
      message: '手机号是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '手机号必须是5~10个字母或者数字~',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '验证码必须是3位以上的字母或者数字~',
      trigger: 'blur'
    }
  ]
}
