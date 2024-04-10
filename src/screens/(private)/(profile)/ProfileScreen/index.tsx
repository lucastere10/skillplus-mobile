import { Box, Button, AvatarImage, Center, Divider, HStack, Icon, Text, Avatar, ScrollView, AvatarFallbackText } from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AvatarBadge } from "@gluestack-ui/themed";
import { Github, Instagram, Linkedin, Mail, MapPin, MessageSquareText, Phone, Send } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { useAuth } from "../../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { fetchUserPictureTeste } from "../../../../service/api/api";

export default function ProfileScreen() {
    return <Container />
}

const Container = () => {
    const { signOut, user } = useAuth()
    const token = AsyncStorage.getItem("token")
    const [src, setSrc] = useState(`https://robohash.org/ds${user.email}?set=set4`);

    useEffect(() => {
        handleUserPicture(user.email);
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
        <Box flex={1}>
            <ScrollView
                style={{ height: '100%' }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <Center my={16} gap={4}>
                    <Text fontSize={"$3xl"}>{user.nome}</Text>
                    <Text fontSize={"$lg"}>Desenvolvedor Júnior</Text>
                    <HStack gap={4}>
                        <Icon color="$blue500" size="xl" as={MapPin} />
                        <Text fontSize={"$lg"}>Brazil</Text>
                    </HStack>
                </Center>

                <Center gap={32} flexDirection="row">
                    <TouchableOpacity>
                        <Box bgColor="$blue500" rounded='$full' p={8}>
                            <Icon color="$white" size="xl" as={MessageSquareText} />
                        </Box>
                    </TouchableOpacity>
                    <Avatar
                        size="2xl"
                        borderColor="$primary600"
                        borderWidth={4}
                    >
                        <AvatarFallbackText>LC</AvatarFallbackText>
                        <AvatarImage
                            source={{
                                uri: src,
                            }}
                            alt="none"
                        />
                        <AvatarBadge />
                    </Avatar>
                    <TouchableOpacity>
                        <Box bgColor="$blue500" rounded='$full' p={8}>
                            <Icon color="$white" size="xl" as={Phone} />
                        </Box>
                    </TouchableOpacity>
                </Center>

                <Center mt={24} flexDirection="row" gap={16}>
                    <Box alignItems="center" justifyContent="center">
                        <HStack space="sm" reversed={false}>
                            <Box rounded='$full' w="$3" h="$3" bg="$blue300" />
                            <Box rounded='$full' w="$3" h="$3" bg="$blue400" />
                            <Box rounded='$full' w="$3" h="$3" bg="$blue500" />
                        </HStack>
                    </Box>
                    <Text fontSize={"$3xl"}>Sobre Mim</Text>
                    <Box alignItems="center" justifyContent="center">
                        <HStack space="sm" reversed={false}>
                            <Box rounded='$full' w="$3" h="$3" bg="$blue500" />
                            <Box rounded='$full' w="$3" h="$3" bg="$blue400" />
                            <Box rounded='$full' w="$3" h="$3" bg="$blue300" />
                        </HStack>
                    </Box>
                </Center>
                <Box px={24} py={8}>
                    <Text size="md">Aqui vai um pequeno texto sobre a pessoa que eu poderia ter colocado para poder editar no backend mas o tempo estava curto</Text>
                </Box>
                <Box p={16}>
                    <HStack justifyContent="space-evenly">
                        <Center>
                            <Text size="lg" fontWeight="$semibold">Posts</Text>
                            <Text>248</Text>
                        </Center>
                        <Divider
                            orientation="vertical"
                            mx="$2.5"
                            bg="$blue500"
                            $dark-bg="$emerald400"
                        />
                        <Center>
                            <Text size="lg" fontWeight="$semibold">Seguidores</Text>
                            <Text>248</Text>
                        </Center>
                        <Divider
                            orientation="vertical"
                            mx="$2.5"
                            bg="$blue400"
                            $dark-bg="$emerald400"
                        />
                        <Center>
                            <Text size="lg" fontWeight="$semibold">Seguindo</Text>
                            <Text>248</Text>
                        </Center>
                    </HStack>
                </Box>

                <Box p={32} gap={16}>
                    <HStack gap={16} alignItems="center">
                        <Icon color="$blue500" size="xl" as={Mail} />
                        <Text size="lg">{user.email}</Text>
                    </HStack>
                    <HStack gap={16} alignItems="center">
                        <Icon color="$blue500" size="xl" as={Instagram} />
                        <Text size="lg">@lucas.caldas50</Text>
                    </HStack>
                    <HStack gap={16} alignItems="center">
                        <Icon color="$blue500" size="xl" as={Github} />
                        <Text size="lg">github.com/lucastere10</Text>
                    </HStack>
                    <HStack gap={16} alignItems="center">
                        <Icon color="$blue500" size="xl" as={Linkedin} />
                        <Text size="lg">linkedin.com/in/lucas-caldas50/</Text>
                    </HStack>
                </Box>

                <Center>
                    <Button gap={16} py={4} width='$1/2' rounded='$full' onPress={signOut}>
                        <Icon color="$white" size="lg" as={Send} />
                        <Text color="$white" fontWeight="$semibold" fontSize={"$xl"}>Seguir</Text>
                    </Button>
                </Center>
            </ScrollView>
        </Box>
    )
}