import { useState } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { Pressable, Text, TextInput, View } from 'react-native'
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid'

type ProfileInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>
  title: string
  placeholder: string
  defaultValue: TFieldValues[Path<TFieldValues>]
  secure?: boolean
  control: Control<TFieldValues, any>
  rightSection?: React.ReactNode
}
const ProfileInput = <TFieldValues extends FieldValues>({
  title,
  placeholder,
  defaultValue,
  secure,
  control,
  name,
  rightSection
}: ProfileInputProps<TFieldValues>) => {
  const { field } = useController({
    control,
    defaultValue,
    name
  })
  const [isSecuredShown, setSecuredShown] = useState(false)
  const isSecureField = !!secure
  return (
    <View className="pt-5">
      <Text className="text-white">{title}</Text>
      <View className="flex-row border-b-2  border-accent">
        <TextInput
          placeholderTextColor={'#aaa'}
          className="flex-1 py-2 text-lg text-white placeholder"
          onChangeText={field.onChange}
          value={field.value}
          placeholder={placeholder}
          keyboardType="web-search"
          secureTextEntry={isSecureField && !isSecuredShown}
        />
        {isSecureField ? (
          <Pressable
            onPress={() => {
              setSecuredShown((p) => !p)
            }}
            className="justify-center pl-2 py-2"
          >
            {isSecuredShown ? (
              <EyeSlashIcon size={20} color={'#ffffffaa'} />
            ) : (
              <EyeIcon size={20} color={'#ffffff'} />
            )}
          </Pressable>
        ) : null}
      </View>
    </View>
  )
}

export default ProfileInput
