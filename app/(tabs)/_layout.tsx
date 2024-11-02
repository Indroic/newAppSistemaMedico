import React from "react";
import { Tabs } from "expo-router";
import { ActivitySquare, BriefcaseMedical, Files } from "@tamagui/lucide-icons";
import TabBar from "@/components/TabBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { useAuth } from "../context/AuthContext";
import { getExamenes, getMedicos, getTensiones } from "@/axios";
import { useAuthStore, useExamenesStore, useMedicosStore } from "@/stores";
import { Spinner, Text, YStack } from "tamagui";
import { Examen, Medico, Tension } from "@/types";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = React.useState(true);
  const { authState } = useAuth();
  const { user } = useAuthStore();
  const { setMedicos, setTensiones } = useMedicosStore();
  const { setExamenes } = useExamenesStore();

  React.useEffect(() => {
    async function prepare() {
      const fetchMedicos = async () => {
        let medicosResponse: { medicos: Medico[] } = await getMedicos(
          authState.token ?? ""
        );
        if (medicosResponse) {
          setMedicos(medicosResponse.medicos);
        }
      };

      const fetchExamenes = async () => {
        let examenesResponse: { examenes: Examen[] } = await getExamenes(
          authState.token ?? ""
        );
        if (examenesResponse) {
          setExamenes(examenesResponse.examenes);
        }
      };

      const fetchTensiones = async () => {
        let tensionesResponse: Tension[] = await getTensiones(
          authState.token ?? ""
        );
        if (tensionesResponse) {

          setTensiones(tensionesResponse);
        }
      };

      fetchTensiones();
      fetchMedicos();
      fetchExamenes();
    }

    if (authState.isAuthenticated) {
      prepare().then(() => setLoading(false));
    }
  }, [authState.isAuthenticated]);

  if (loading) {
    return (
      <YStack
        backgroundColor={"$background"}
        flex={1}
        justifyContent="center"
        alignItems="center"
        gap="$4"
      >
        <Spinner scale="$1" />
        <Text>Cargando...</Text>
      </YStack>
    );
  }

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        header: (props) => <Header {...props} user={user} />,
      }}
      safeAreaInsets={insets}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Médicos",
          tabBarIcon: ({ color, size }) => (
            <BriefcaseMedical
              animatePresence
              animateOnly={["backgroundColor"]}
              animation={"fast"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="examenes"
        options={{
          tabBarIcon: ({ color, size }) => <Files color={color} size={size} />,
          title: "Exámenes",
        }}
      />
      <Tabs.Screen
        name="tensiones"
        options={{
          title: "Tensiones",
          tabBarIcon: ({ color, size }) => (
            <ActivitySquare color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
