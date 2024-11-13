/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/EnterYourEmail` | `/EnterYourPhonenumber` | `/ForgetPassword` | `/Home` | `/NewPassword` | `/Onboarding` | `/Onboarding1` | `/SignInEmpty` | `/SplashScreen` | `/_sitemap` | `/navigation`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
