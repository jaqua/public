import { useForm } from 'react-hook-form'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'

import AuthFormContainer from '@/components/containers/AuthFormContainer'
import ThemeConfig, { getMyTheme } from '@/constants/myTheme'
import { useAuthContext } from '@/contexts/AuthContext'
import useLogin from '@/hooks/useLogin'
// import { useAuthContext } from '@/contexts/AuthContext'
import { LoginStackScreenProps } from '@/types/navigation.types'

import ProfileInput from './inputs/ProfileInput'

type LoginFormProps = LoginStackScreenProps<'LoginForm'>

type TFieldValues = { username: string; password: string }

const LoginForm = ({ navigation }: LoginFormProps) => {
  const { login, loginState } = useAuthContext()

  const theme = getMyTheme()

  const [loginMutation, { data, error, loading }] = useLogin()
  const onGoBack = () => {
    navigation.goBack()
  }

  const { control, handleSubmit, watch } = useForm<TFieldValues>()

  const watchAllFields = watch()

  const onSubmit = (data: TFieldValues) => {
    login(data.username, data.password)
  }

  if (loginState?.error) {
    console.log(loginState.error)
  }

  const submitButtonEnabled = watchAllFields.username && watchAllFields.password

  return (
    <View style={styles.wrapper} className="h-full container justify-center ">
      <AuthFormContainer>
        <Pressable
          onPress={onGoBack}
          className="flex-row items-center space-x-2 pb-10"
        >
          <ArrowLeftIcon size={30} color={theme.white.lightMode} />
          <Text className="text-white">Go Back</Text>
        </Pressable>

        <ProfileInput<TFieldValues>
          control={control}
          name="username"
          defaultValue=""
          placeholder="Email"
          title="Username/Email"
        />

        <ProfileInput<TFieldValues>
          control={control}
          name="password"
          defaultValue=""
          placeholder="Password"
          title="Password"
          secure
        />

        <View className="mt-10 rounded-full overflow-hidden">
          <Pressable
            disabled={!submitButtonEnabled}
            android_ripple={{
              borderless: false,
              color: theme.white.lightMode
            }}
            onPress={handleSubmit(onSubmit)}
            className="w-full h-14 rounded-full border-2 border-white items-center justify-center"
          >
            {loading ? (
              <ActivityIndicator color={theme.white.lightMode} />
            ) : (
              <Text className="text-white font-semibold text-[28px]">
                Submit
              </Text>
            )}
          </Pressable>
        </View>

        <View className="pt-10">
          <Pressable
            onPress={() => {
              navigation.navigate('RegisterForm')
            }}
            className="w-full h-14 rounded-full border-2 border-white items-center justify-center"
          >
            <Text className="text-white font-semibold text-[28px]">
              Register
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

export default LoginForm
