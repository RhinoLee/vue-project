import type { FormSchema } from '@/types/form'
import type { AdvertiseObj } from '@/services/advertise'

export const formSchema: FormSchema = {
  fields: [
    {
      label: '廣告標題',
      name: 'title',
      type: 'text',
      placeholder: '請輸入廣告標題'
    },
    {
      label: '廣告狀態',
      name: 'status',
      type: 'select',
      placeholder: '請輸入廣告狀態',
      options: [
        {
          label: '啟用',
          value: 1
        },
        {
          label: '未啟用',
          value: 0
        }
      ]
    },
    {
      label: '廣告連結',
      name: 'url',
      type: 'text',
      placeholder: '請輸入廣告連結'
    },
    {
      label: '廣告圖片',
      name: 'image',
      type: 'singleImage',
      placeholder: ''
    }
  ]
}

export const defaultFormValues: AdvertiseObj = {
  title: '',
  status: null,
  url: '',
  image: ''
}
