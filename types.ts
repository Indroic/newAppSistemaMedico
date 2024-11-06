interface User {
  id?: string;
  password: string;
  username: string;
  ci: string;
  first_name: string;
  last_name: string;
  email: string;
  create_at?: string;
  update_at?: string;
  avatar?: string | any;
  groups?: Array<string>;
  user_permissions?: Array<string>;
  genero?: GeneroType | string;
  telefono?: string;
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
  create_at: string;
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
  genero?: GeneroType;
  create_at: string;
  update_at: string;
}

interface GeneroType {
  id: string;
  genero: string;
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

interface Tension{
  id: string;
  usuario: string;
  sistolic: string;
  diastolic: string;
  create_at: string;
  update_at: string;
}

interface Consulta {
  id: string;
  medico : Medico;
  usuario: User;
  diagnostico: string;
  tratamiento: string;
  create_at: string;
  update_at: string;
}

interface createReportType {
  data: {[key: string]: any}[]
}

interface ReporteType{
  id: string;
  file: string;
  reporte: string;
}

interface GenerateReportType{
  error: boolean;
  message: string;
  reporte?: ReporteType;
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
  ErrorType,
  GeneroType,
  Tension,
  Consulta,
  createReportType,
  ReporteType,
  GenerateReportType
};
