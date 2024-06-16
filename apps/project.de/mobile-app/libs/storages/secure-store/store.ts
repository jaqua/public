import * as SecureStore from 'expo-secure-store'

export async function setToStore(key: string, value: any) {
  await SecureStore.setItemAsync(key, value)
}

export async function getFromStore(key: string) {
  return await SecureStore.getItemAsync(key)
}
