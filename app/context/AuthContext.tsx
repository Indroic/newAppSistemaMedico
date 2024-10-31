import React from "react";

import * as SecureStore from "expo-secure-store";

import type {
  AuthProps,
  User,
  LoginProps,
  AuthStateProps,
  RegisterResult,
} from "@/types";

import { registerRequest, loginRequest, axiosInstance } from "@/axios";

import * as FileSystem from "expo-file-system";
import { useAuthStore, useExamenesStore, useMedicosStore } from "@/stores";

const AuthContext = React.createContext<AuthProps>({} as AuthProps);

export const TOKEN_KEY = "authToken";
export const USER_DATA_KEY = "userData";

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setToken, setUser } = useAuthStore();
  const [authState, setAuthState] = React.useState<AuthStateProps>({
    token: "",
    isAuthenticated: false,
    user: {} as User,
  });

  React.useEffect(() => {
    const fetchToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const userData = await SecureStore.getItemAsync(USER_DATA_KEY);
      if (token && userData) {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Token ${token}`;
        setAuthState({
          token: token,
          isAuthenticated: true,
          user: JSON.parse(userData),
        });

        setToken(token);
        setUser(JSON.parse(userData));
      }
    };

    fetchToken();
  }, []);

  const register = async (data: User) => {
    try {
      const newData = {
        username: data.username,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        ci: data.ci,
        genero: data.genero,
        telefono: data.telefono,
      };

      const user: User = await registerRequest(newData);

      const loginR: LoginProps = await login(data.username, data.password) as LoginProps;

      if (loginR.token && !loginR.error && data.avatar) {
        if (data.avatar) {
          const uploading = await FileSystem.uploadAsync(
            `https://backend-medics.vercel.app/api/profile/${user.id}/`,
            data.avatar,
            {
              fieldName: "avatar",
              httpMethod: "PATCH",
              uploadType: FileSystem.FileSystemUploadType.MULTIPART,
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Token ${loginR.token}`,
              },
            }
          );
          let newuser = JSON.parse(uploading.body);

          setAuthState({
            token: loginR.token,
            isAuthenticated: true,
            user: newuser,
          });

          setToken(loginR.token);
          setUser(user);

          return {
            Login: { token: loginR.token, user: newuser } as LoginProps,
            error: false,
          } as RegisterResult;
        }
      }

      setAuthState({
        token: loginR.token,
        isAuthenticated: true,
        user: user,
      });

      setToken(loginR.token);
      setUser(user);

      return {
        Login: { token: loginR.token, user: user } as LoginProps,
        error: false,
      } as RegisterResult;
    } catch (error: any) {
      return { error: true, errors: error.response.data } as RegisterResult;
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const result = await loginRequest(username, password);
      let data: LoginProps = result.data;

      if (data.user?.avatar) {
        let avatar = await FileSystem.downloadAsync(
          data.user.avatar,
          FileSystem.cacheDirectory + "avatar.jpg"
        );

        data.user.avatar = avatar.uri;
      }

      if (data.token && data.user) {
        await SecureStore.setItemAsync(TOKEN_KEY, data.token);
        await SecureStore.setItemAsync(
          USER_DATA_KEY,
          JSON.stringify(data.user)
        );
        setAuthState({
          token: data.token,
          user: data.user,
          isAuthenticated: true,
        });
        setToken(data.token);
        setUser(data.user);

        return {
          token: data.token,
          user: data.user,
          error: false,
          message: "",
        } as LoginProps;
      }
    } catch (error: any) {
      return {
        error: true,
        message: error.response.data.error,
      } as LoginProps;
    }
  };

  const logout = async () => {
    setAuthState({ token: "", isAuthenticated: false, user: {} as User });
    setUser({} as User);
    setToken("");
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_DATA_KEY);
    return;
  };

  const value: AuthProps = {
    authState: authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
