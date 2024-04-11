import { useEffect, useState } from "react";
import { Box, Button, AvatarImage, Center, Divider, HStack, Icon, Text, Avatar, ScrollView, AvatarFallbackText, View, AvatarBadge } from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CirclePlusIcon, MapPin, MessageSquareText, Phone, Send } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { useAuth } from "../../../../contexts/AuthContext";
import { fetchUserPictureTeste } from "../../../../service/api/api";
import { fetchUserContacts } from "../../../../service/api/contacts";
import { fetchUserSkillsOfLoggedUser } from "../../../../service/api/userSkills";
import { UserContactCard } from "../../../../components/Cards/UserContactCard";
import { UserSkillCard } from "../../../../components/Cards/UserSkillCard";
import { useStateChange } from "../../../../contexts/stateChangeContext";
import { AddContactDialog } from "../../../../components/Dialogs/AddContactDialog";
import { AddSkillDialog } from "../../../../components/Dialogs/AddSkillDialog";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavigatorRoutesProps } from "../../../../routes/profile.routes";

export default function ProfileScreen() {
    return <Container />
}

const Container = () => {
    const { signOut, user } = useAuth()
    const [contacts, setContacts] = useState<Contato[]>([]);
    const [userSkills, setUserSkills] = useState<UserSkill[]>([])
    const token = AsyncStorage.getItem("token")
    const [activeContainer, setActiveContainer] = useState('contacts');
    const [src, setSrc] = useState(`https://robohash.org/ds${user.email}?set=set4`);
    const { stateChanged } = useStateChange();
    const navigation = useNavigation<ProfileNavigatorRoutesProps>();
    
    useEffect(() => {
        handleUserPicture(user.email);
        handleUserContacts();
        handleUserSkills();
    }, [stateChanged]);

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

    async function handleUserContacts() {
        try {
            const data = await fetchUserContacts();
            setContacts(data.content)
        } catch (error) {
            console.log(error);
        }
    }

    async function handleUserSkills() {
        try {
            const data = await fetchUserSkillsOfLoggedUser();
            setUserSkills(data.content)
        } catch (error) {
            console.log(error);
        }
    }

    function handleRouteChangeToUploadPicture() {
        navigation.navigate('addPicture');
    }

    function handleRouteChangeToEditProfile() {
        navigation.navigate('editProfile');
    }

    return (
        <Box>
            <ScrollView
                style={{ height: '100%' }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View backgroundColor={'$primary600'} h={48}></View>
                <Center my={16} gap={4}>
                    <Text fontSize={"$3xl"}>{user.nome}</Text>
                    <Text fontSize={"$lg"}>{user.email}</Text>
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
                    <TouchableOpacity onPress={() => {handleRouteChangeToUploadPicture()}}>
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
                    </TouchableOpacity>
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

                <HStack w={"$full"} justifyContent="center" gap={16}>
                    <Button w={'$2/5'} onPress={() => setActiveContainer('contacts')}>
                        <Text color="$white">
                            Contatos
                        </Text>
                    </Button>
                    <Button w={'$2/5'} onPress={() => setActiveContainer('skills')}>
                        <Text color="$white">
                            Habilidades
                        </Text>
                    </Button>
                </HStack>
                {activeContainer === 'contacts' && <ContactsContainer contacts={contacts} />}
                {activeContainer === 'skills' && <SkillsContainer userSkills={userSkills} />}

                <Center>
                    <Button gap={16} py={4} mb={16} width='$1/2' rounded='$full' onPress={signOut}>
                        <Icon color="$white" size="lg" as={Send} />
                        <Text color="$white" fontWeight="$semibold" fontSize={"$xl"}>Seguir</Text>
                    </Button>
                </Center>
            </ScrollView>
        </Box>
    )
}

type ContactsContainerProps = {
    contacts: Contato[];
};
const ContactsContainer = ({ contacts }: ContactsContainerProps) => {
    if (!Array.isArray(contacts)) {
        console.error('ContactsContainer was called with a non-array argument:', contacts);
        return null;
    }

    return (
        <View p={32} gap={16}>
            {contacts.map((contact) => {
                return (
                    <UserContactCard key={contact.contatoId} contact={contact} />
                );
            })}
            <AddContactDialog />
        </View>
    )
}

type SkillsContainerProps = {
    userSkills: UserSkill[];
};
const SkillsContainer = ({ userSkills }: SkillsContainerProps) => {
    if (!Array.isArray(userSkills)) {
        console.error('ContactsContainer was called with a non-array argument:', userSkills);
        return null;
    }

    return (
        <View p={32} gap={16}>
            {userSkills.map((userSkill) => {
                return (
                    <UserSkillCard key={userSkill.usuarioSkillId} userSkill={userSkill} />
                );
            })}
            <AddSkillDialog />
        </View>
    )
}