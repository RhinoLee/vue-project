export interface Option {
  label: string
  value: any
}

export interface FieldSchema {
  label: string
  name: string
  type: string
  placeholder: string
  options?: Option[]
}

export interface FormSchema {
  fields: FieldSchema[]
}
