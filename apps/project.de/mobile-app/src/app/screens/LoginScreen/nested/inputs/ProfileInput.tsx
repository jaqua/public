import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'

type ProfileInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>
  title: string
  placeholder: string
  defaultValue: TFieldValues[Path<TFieldValues>]
  secure?: boolean
  control: Control<TFieldValues, any>
}
const ProfileInput = <TFieldValues extends FieldValues>({
  title,
  placeholder,
  defaultValue,
  secure,
  control,
  name
}: ProfileInputProps<TFieldValues>) => {
  const { field } = useController({
    control,
    defaultValue,
    name
  })
  return (
    <View className="pt-5">
      <Text className="text-white">{title}</Text>
      <TextInput
        placeholderTextColor={'#aaa'}
        className="w-full py-2 text-lg border-b-2 border-accent text-white placeholder"
        onChangeText={field.onChange}
        value={field.value}
        placeholder={placeholder}
        keyboardType="web-search"
        secureTextEntry={!!secure}
      />
    </View>
  )
}

export default ProfileInput
