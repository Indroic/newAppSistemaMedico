interface User {
  id?: string;
  password: string;
  username: string;
  ci: number;
  first_name: string;
  last_name: string;
  email: string;
  create_at?: string;
  update_at?: string;
  avatar?: string | any;
  groups?: Array<string>;
  user_permissions?: Array<string>;
}

interface Medico {
  id: string;
  nombre: string;
  apellido: string;
  especialidad: Especialidad;
  telefono: string;
  foto: string;
  institucion: string;
  agregado_por: string;
}

interface Examen {
  id: string;
  titulo: string;
  categoria: Categoria;
  descripcion: string;
  create_at: string;
  update_at: string;
  agregado_por: string;
  archivo: string;
}

interface Especialidad {
  id: string;
  especialidad: string;
  create_at: string;
  update_at: string;
}

interface Categoria {
  id: string;
  categoria: string;
  create_at: string;
  update_at: string;
}

interface AuthStateProps {
  token: string;
  user: User;
  isAuthenticated: boolean;
}

interface AuthProps {
  authState: AuthStateProps;
  onRegister: (data: User) => Promise<RegisterResult>;
  onLogin: (username: string, password: string) => Promise<LoginProps>;
  onLogout: () => Promise<void>;
}
interface LoginProps {
  token: string;
  user: User;
  error: boolean;
  message: string;
}

interface RegisterResult {
  Login: LoginProps;
  error: boolean;
  errors: ErrorType;
}

interface ErrorType {
  [key: string]: string;
}

interface TabBarButtonProps {
  isFocused: boolean;
  color?: string;
  key: string;
  onPress: () => void;
  onLongPress: () => void;
  routeName: string;
  label: React.ReactNode | string;
  tabBarIcon?: (props: {
    focused: boolean;
    color: string;
    size?: string | number | undefined;
  }) => React.ReactNode | undefined;
}

export {
  Medico,
  Especialidad,
  AuthProps,
  User,
  LoginProps,
  AuthStateProps,
  Categoria,
  Examen,
  TabBarButtonProps,
  RegisterResult,
  ErrorType
};
