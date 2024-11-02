import { create } from "zustand";
import type { Medico, Especialidad, Categoria, User, Examen, GeneroType, Consulta, Tension } from "./types";

interface useMedicosStoreType{
    medicos: Medico[];
    especialidades: Especialidad[];
    consultas: Consulta[];
    tensiones: Tension[];
    loading: boolean;
    setLoading: (loading: boolean) => void;
    setEspecialidades: (especialidades: Especialidad[]) => void;
    addMedico: (medico: Medico) => void;
    removeMedico: (id: string) => void;
    updateMedico: (medico: Medico) => void;
    setMedicos: (medicos: Medico[]) => void;
    addConsulta: (consulta: Consulta) => void;
    removeConsulta: (id: string) => void;
    addTension: (tension: Tension) => void;
    removeTension: (id: string) => void;
    setTensiones: (tensiones: Tension[]) => void;
}

interface useGeneroStoreType{
    generos: GeneroType[];
    setGeneros: (generos: GeneroType[]) => void;
}

interface useExamenesStoreType{
    examenes: Examen[];
    loading: boolean;
    categorias: Categoria[];
    setCategorias: (categorias: Categoria[]) => void;
    setLoading: (loading: boolean) => void;
    setExamenes: (examenes: Examen[]) => void;
    addExamen: (examen: Examen) => void;
    removeExamen: (id: string) => void;
    updateExamen: (examen: Examen) => void;
}

interface useMicelaneusStoreType{
    avatarPlaceholder: string;
    setAvatarPlaceholder: (locate: string) => void;
}

interface useAuthStoreProps{
    token: string;
    user: User;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
}

export const useAuthStore = create<useAuthStoreProps>((set) => ({
    token: "",
    user: {} as User,
    setToken: (token) => set({ token }),
    setUser: (user) => set({ user }),
}))

export const useMedicosStore = create<useMedicosStoreType>((set) => ({
    medicos: [],
    especialidades: [],
    loading: true,
    consultas: [],
    tensiones: [],
    setLoading: (loading) => set({ loading }),
    setEspecialidades: (especialidades) => set({ especialidades }),
    addMedico: (medico) => set((state) => ({ medicos: [...state.medicos, medico] })),
    removeMedico: (id) => set((state) => ({ medicos: state.medicos.filter((medico) => medico.id !== id) })),
    updateMedico: (medico) => set((state) => ({ medicos: state.medicos.map((m) => (m.id === medico.id ? medico : m)) })),
    setMedicos: (medicos) => set({ medicos }),
    addConsulta: (consulta) => set((state) => ({ consultas: [...state.consultas, consulta] })),
    removeConsulta: (id) => set((state) => ({ consultas: state.consultas.filter((consulta) => consulta.id !== id) })),
    addTension: (tension) => set((state) => ({ tensiones: [...state.tensiones, tension] })),
    removeTension: (id) => set((state) => ({ tensiones: state.tensiones.filter((tension) => tension.id !== id) })),
    setTensiones: (tensiones) => set({ tensiones }),
}))

export const useExamenesStore = create<useExamenesStoreType>((set) => ({
    examenes: [],
    loading: true,
    categorias: [],
    setLoading: (loading) => set({ loading }),
    setCategorias: (categorias) => set({ categorias }),
    setExamenes: (examenes) => set({ examenes }),
    addExamen: (examen) => set((state) => ({ examenes: [...state.examenes, examen] })),
    removeExamen: (id) => set((state) => ({ examenes: state.examenes.filter((examen) => examen.id !== id) })),
    updateExamen: (examen) => set((state) => ({ examenes: state.examenes.map((e) => (e.id === examen.id ? examen : e)) })),
}))

export const useMicelaneusStore = create<useMicelaneusStoreType>((set) =>({
    avatarPlaceholder: "",
    setAvatarPlaceholder: (locate) => set(() => ({avatarPlaceholder: locate}))
}))

export const useGeneroStore = create<useGeneroStoreType>((set) => ({
    generos: [],
    setGeneros: (generos) => set({ generos }),
}))