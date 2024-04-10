import { useEffect, useState } from "react";
import { fetchUserById, fetchUserPictureTeste } from "../../../../service/api/api";
import { Text, View, Button, Center, HStack, Icon, AvatarFallbackText, AvatarImage, AvatarBadge, Divider } from "@gluestack-ui/themed";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Image } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { Github, Instagram, Linkedin, Mail, MapPin, MessageSquareText, Phone, Send } from "lucide-react-native";
import { Avatar } from "@gluestack-ui/themed";

export default function ProfileSearchResultScreen({ route }: Readonly<{ route: RouteProp<ProfileSearchRoutes, 'profileResult'> }>) {
    const { userId } = route.params;
    const [user, setUser] = useState<User[]>([])
    const [src, setSrc] = useState(`https://robohash.org/ds${user.email}?set=set4`);

    useEffect(() => {
        async function handleUserAndPicture(id: number) {
            try {
                const response = await fetchUserById(id);
                console.log(response);
                setUser(response.data);
    
                const email = response.data.email; // assuming the email is in the response data
                await handleUserPicture(email);
            } catch (error) {
                console.log(error);
            }
        }
        handleUserAndPicture(userId);
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
                <Center my={16}>
                    <Text fontSize={"$3xl"}>{user.nome}</Text>
                    <Text fontSize={"$lg"}>{user.email}</Text>
                    <HStack mt={8} gap={4}>
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
                <Box px={32} py={8} gap={12}>
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
                    <Button gap={16} mt={8} width='$1/2' rounded='$full'>
                        <Icon color="$white" size="lg" as={Send} />
                        <Text color="$white" fontWeight="$semibold" fontSize={"$xl"}>Seguir</Text>
                    </Button>
                </Center>
            </ScrollView>
        </Box>
    )
}