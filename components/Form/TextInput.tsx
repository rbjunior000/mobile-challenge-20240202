import React from 'react'
import { useController } from 'react-hook-form'
import { TextInputProps } from 'react-native'
import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText, Input, InputField } from '../ui'

type TextFieldInputProps = {
  name: string
  label?: string
} & TextInputProps

export const TextField = (props: TextFieldInputProps) => {
  const { name, placeholder, label, onSubmitEditing, ...rest } = props
  const { field, formState } = useController({
    name
  })

  const message = formState.errors[name]?.message?.toString() ?? null

  return (
    <FormControl isInvalid={!!message}>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input isInvalid={!!message}>
        <InputField onSubmitEditing={onSubmitEditing} placeholder={placeholder} defaultValue={field.value} ref={field.ref} onChangeText={field.onChange} type="text" autoCapitalize="none" />
      </Input>
      <FormControlError>
        <FormControlErrorText>{message}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
