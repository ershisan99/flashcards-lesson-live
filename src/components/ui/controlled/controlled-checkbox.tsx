import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '../checkbox'

// type Props<T extends FieldValues> = {
//     control: Control<T>
//     name: FieldName<T>
// } & Omit<TextFieldProps, 'onChange' | 'value'>

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'defaultValues'> &
  Omit<CheckboxProps, 'onChange' | 'value'>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field: { value, onChange: onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    shouldUnregister,
  })
  const handleChange = onChange as (value: boolean) => void

  return (
    <Checkbox checked={value} onChange={handleChange} errorMessage={error?.message} {...rest} />
  )
}
