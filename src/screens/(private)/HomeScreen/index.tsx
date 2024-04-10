import { Box, ScrollView, Text } from "@gluestack-ui/themed";
import { useEffect } from "react";
import { Alert } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";
import { fetchUserData } from "../../../service/api/api";

export default function HomeScreen() {
  return <Container />;
};

const Container = () => {
  const { signOut } = useAuth()

  const getUser = async () => {
      const { data, error } = await fetchUserData();
      if (error === 403) {
        Alert.alert(
          "Sessão Expirada",
          "Sua Sessão expirou. Favor fazer login novamente.",
          [
            {
              text: "OK", onPress: () => {signOut()}
            }
          ]
        );
      }
  };

  useEffect(() => {
    getUser();
  }, []);


  return (
    <Box flex={1} backgroundColor="$white">
      <ScrollView
        style={{ height: '100%' }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Box
          mt={48}
          alignItems="center"
        >
          <Text>PAGINA PRINCIPAL</Text>
        </Box>
      </ScrollView>
    </Box>
  );
};