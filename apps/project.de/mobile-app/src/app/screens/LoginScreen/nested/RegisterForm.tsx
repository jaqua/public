import { useForm } from 'react-hook-form'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'

import AuthFormContainer from '@/components/containers/AuthFormContainer'
import ThemeConfig from '@/constants/myTheme'
import { LoginStackScreenProps } from '@/types/navigation.types'
import { gql } from '@apollo/client'

import ProfileInput from './inputs/ProfileInput'

type RegisterFormProps = LoginStackScreenProps<'RegisterForm'>

// const REGISTER_DATA = gql``

const RegisterForm = ({ navigation }: RegisterFormProps) => {
  const { control, handleSubmit } = useForm()

  const onGoBack = () => {
    navigation.goBack()
  }

  const onSubmit = (data: any) => {
    Alert.alert(JSON.stringify(data))
    console.log(data)
  }

  return (
    <View style={styles.wrapper} className="h-full container  justify-center">
      <AuthFormContainer>
        <Pressable
          onPress={onGoBack}
          className="flex-row items-center space-x-2 pb-10"
        >
          <ArrowLeftIcon size={30} color={'#ffffff'} />
          <Text className="text-white">Go Back</Text>
        </Pressable>

        <ProfileInput
          control={control}
          name="username"
          defaultValue=""
          placeholder="Email"
          title="Username/Email"
        />

        <ProfileInput
          name="password"
          control={control}
          defaultValue=""
          placeholder="Password"
          title="Password"
          secure
        />
        <ProfileInput
          control={control}
          name="confirm_password"
          defaultValue=""
          placeholder=""
          title="Confirm Password"
          secure
        />

        <View className="pt-10">
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="w-full h-14 rounded-full border-2 border-white items-center justify-center"
          >
            <Text className="text-white font-semibold text-[28px]">Submit</Text>
          </Pressable>
        </View>

        <View className="pt-10">
          <Pressable
            onPress={() => {
              navigation.navigate('LoginForm')
            }}
            className="w-full h-14 rounded-full border-2 border-white items-center justify-center"
          >
            <Text className="text-white font-semibold text-[28px]">
              Sign In
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            navigation.navigate('ForgotPasswordForm')
          }}
          className="pt-10"
        >
          <Text className="text-center text-secondary text-xl">
            Forgot Password ?
          </Text>
        </Pressable>
      </AuthFormContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: ThemeConfig().primary.opacity(0.4)
  }
})

export default RegisterForm
