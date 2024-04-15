import { HStack, Image, Text, VStack, View } from "@gluestack-ui/themed"
import { useEffect, useState } from "react";
import { fetchUserPictureTeste } from "../../../service/api/api";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileSearchNavigatorRoutesProps } from "../../../routes/(search-routes)/profileSearch.routes";

interface ProfileCardProps {
    usuario: User
}

export function ProfileCard({ usuario }: Readonly<ProfileCardProps>) {
    const [src, setSrc] = useState(`https://robohash.org/ds${usuario.email}?set=set4`);
    const navigation = useNavigation<ProfileSearchNavigatorRoutesProps>();

    useEffect(() => {
        handleUserPicture(usuario.email);
    }, []);

    async function handleUserPicture(email: string) {
        try {
            await fetchUserPictureTeste(email)
                .then((imageUrl) => {
                    if (typeof imageUrl === 'string') {
                        setSrc(imageUrl);
                    } else {
                        console.log('Error: imageUrl is not a string');
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <View gap={4} w={"$full"} justifyContent="flex-start">
            <TouchableOpacity onPress={() => navigation.navigate('profileResult', { userId: usuario.usuarioId })}>
                <HStack pl={24} gap={16}>
                    <Image
                        size="md"
                        borderRadius={50}
                        borderWidth={2}
                        borderColor="$blueGray400"
                        source={{
                            uri: src,
                        }}
                        alt="https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png"
                    />
                    <VStack justifyContent="space-evenly">
                        <Text fontWeight="bold">{usuario.nome}</Text>
                        <Text>{usuario.email}</Text>
                        <HStack gap={4}>
                            <Text>{usuario.usuarioTipo}</Text>
                            <Text>|</Text>
                            <Text>{usuario.usuarioStatus}</Text>
                        </HStack>
                    </VStack>
                </HStack>
            </TouchableOpacity>
        </View>
    )
}