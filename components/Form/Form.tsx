'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, FieldValues, FormProvider, useFormContext, UseFormHandleSubmit, useForm as useFormHookForm } from 'react-hook-form'
import { ZodSchema } from 'zod'
import { PasswordInputField } from './PasswordInput'
import { TextField } from './TextInput'

type Methods<T extends FieldValues> = {
  handleSubmit: UseFormHandleSubmit<T>
}
export type FormProps<T extends FieldValues> = {
  formId?: string
  onSubmit: (values: T) => void
  schema?: ZodSchema
  defaultValues?: DefaultValues<T>
  children: React.ReactNode | ((props: Methods<T>) => React.ReactNode)
}

export const Form = <T extends FieldValues>(props: FormProps<T>) => {
  const { children, onSubmit, formId, schema, defaultValues } = props
  const form = useFormHookForm<T>({
    resolver: schema && zodResolver(schema),
    defaultValues
  })

  return (
    <FormProvider {...form}>
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        {typeof children === 'function' ? children(form) : children}
      </form>
    </FormProvider>
  )
}

export const useForm = useFormContext
Form.Passowrd = PasswordInputField
Form.Text = TextField
