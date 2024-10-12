import { EyeIcon, EyeOffIcon } from 'lucide-react-native'
import React from 'react'
import { useController } from 'react-hook-form'
import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText, Input, InputField, InputIcon, InputSlot } from '../ui'

type PasswordInputFieldProps = {
  name: string
  placeholder?: string
  label?: string
  onSubmitEditing?: () => void
}

export const PasswordInputField = (props: PasswordInputFieldProps) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }
  const { name, placeholder, label, ...rest } = props
  const {
    field: { ref, value, onChange },
    formState
  } = useController({
    name
  })

  const message = formState.errors[name]?.message?.toString() ?? null

  const icon = showPassword ? EyeIcon : EyeOffIcon

  const type = showPassword ? 'text' : 'password'

  return (
    <FormControl isInvalid={!!message}>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <InputField onSubmitEditing={props.onSubmitEditing} type={type} placeholder={placeholder} defaultValue={value} ref={ref} onChangeText={onChange} />
        <InputSlot className="pr-3" onPress={handleState}>
          <InputIcon as={icon} className="text-darkBlue-500" />
        </InputSlot>
      </Input>
      <FormControlError>
        <FormControlErrorText>{message}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
