import { Button, Text, Box } from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { emitCredentials } from "../../../../service/api/websocket";


export default function TotpScreen({ route }: { route: any }) {
    const { otp } = route.params;
    const [user, setUser] = useState<UsuarioLogadoType>({} as UsuarioLogadoType)
    const navigation = useNavigation()

    useEffect(() => {
        const fetchUserData = async () => {
            const userDataString = await AsyncStorage.getItem("user");
            const userData = JSON.parse(userDataString!);
            setUser(userData)
        };

        fetchUserData();
    }, []);

    return (
        <Box flex={1} h={"$full"} alignItems="center" justifyContent="center" backgroundColor="$white" pt={12} gap={16}>
            <Text px={36} py={16} textAlign="center" fontWeight="$semibold" fontSize='$lg'>Você leu um QR Code para iniciar a sessão no SpringTech</Text>
            <Text fontSize='$5xl' fontWeight="bold" >{otp}</Text>
            <Text>Deseja fazer login como:</Text>
            <Text fontWeight="$semibold" fontSize='$2xl'>{user.email}</Text>
            <Box>
                <Text textAlign="center" fontWeight="$semibold" fontSize='$md'>{user.nome}</Text>
                <Text textAlign="center" fontWeight="$semibold" fontSize='$md'>{user.usuarioStatus}</Text>
                <Text textAlign="center" fontWeight="$semibold" fontSize='$md'>{user.usuarioTipo}</Text>
            </Box>
            <Button mt={16} gap={16} py={4} width='$2/3' rounded='$sm'
                onPress={() => { emitCredentials(user.nome, user.email) }}>
                <Text color="$white">
                    Fazer Login
                </Text>
            </Button>
            <Button gap={16} py={4} width='$2/3' rounded='$sm' bgColor="$secondary900" onPress={() => { navigation.goBack() }}>
                <Text color="$white">
                    Cancelar
                </Text>
            </Button>
        </Box>
    )
}
