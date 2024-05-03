import type {
  DrawerNavigationProp,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import { NavigatorScreenParams } from "@react-navigation/native";

import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type RootDrawerParamList = {
  // Home: NavigatorScreenParams<HomeTabParamList>;
  // PostDetails: { id: string };
  // NotFound: undefined;
  Login: NavigatorScreenParams<LoginStackParamList>;
  Category: undefined;
  CategoryItem: { cid: string };
  Friends: undefined;
  Profile: undefined;
};

export type RootDrawerScreenProps<T extends keyof RootDrawerParamList> =
  DrawerScreenProps<RootDrawerParamList, T>;

export type RootDrawerNavigationProp =
  DrawerNavigationProp<RootDrawerParamList>;

export type LoginStackParamList = {
  SignInOptions: undefined;
  LoginForm: undefined;
  RegisterForm: undefined;
  ForgotPasswordForm: undefined;
};

export type LoginStackScreenProps<T extends keyof LoginStackParamList> =
  NativeStackScreenProps<LoginStackParamList, T>;

export type LoginStackNavigationProp =
  NativeStackNavigationProp<LoginStackParamList>;

// export type HomeTabParamList = {
//   Popular: undefined;
//   Latest: undefined;
// };

// export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
//   CompositeScreenProps<
//     BottomTabScreenProps<HomeTabParamList, T>,
//     RootStackScreenProps<keyof RootStackParamList>
//   >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootDrawerParamList {}
  }
}
