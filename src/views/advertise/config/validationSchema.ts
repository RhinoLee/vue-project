import { object, string, number } from 'yup'

const validationSchema = object({
  title: string().required('廣告標題為必填欄位'),
  status: number().required('廣告狀態為必填欄位'),
  url: string().url('請輸入正確網址格式')
})

export default validationSchema
