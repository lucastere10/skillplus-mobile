import { AvatarBadge, AvatarFallbackText, AvatarImage, Box, HStack, ScrollView, Text, View } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";
import { fetchUserData, fetchUserPictureTeste, fetchUsers } from "../../../service/api/api";
import { useStateChange } from "../../../contexts/stateChangeContext";
import { Avatar , Card, VStack, Icon } from "@gluestack-ui/themed";
import { ChevronRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../../routes/app.routes";

export default function HomeScreen() {
  return <Container />;
};

const Container = () => {
  const { signOut, user } = useAuth()
  const [src, setSrc] = useState(`https://robohash.org/ds${user.email}?set=set4`);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [firstLoad, setFirstLoad] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(8);
  const { stateChanged, setStateChanged } = useStateChange();
  const navigation = useNavigation<AppNavigatorRoutesProps>();


  const handleUsers = async () => {
    if (firstLoad) setLoading(true);
    const response = await fetchUsers(search, page, size)
    setUsers(response.content);
    setTotalPages(response.totalPages)
    setLoading(false);
    setFirstLoad(false);
  };

  useEffect(() => {
    handleUsers();
    handleUserPicture(user.email);
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

  const getUser = async () => {
    const { data, error } = await fetchUserData();
    if (error === 403) {
      Alert.alert(
        "Sessão Expirada",
        "Sua Sessão expirou. Favor fazer login novamente.",
        [
          {
            text: "OK", onPress: () => { signOut() }
          }
        ]
      );
    }
  };

  useEffect(() => {
    getUser();
  }, []);


  return (
    <Box>
      <ScrollView
        style={{ height: '100%' }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View backgroundColor={'$primary600'} h={48}></View>
        <Box
          backgroundColor={'$primary600'}
          flexDirection="row"
          justifyContent="space-between"
          pt={12}
          px={16}
        >
          <Text pb={8} size="4xl" fontFamily="$mono" fontWeight="$bold" color="$white">Feed</Text>
          <Avatar
            size="md"
            borderColor="$primary600"
            borderWidth={2}
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
        </Box>
        <Card m={16} h={200}>
          <Box
            flexDirection="row"
            justifyContent="space-between"
          >
            <HStack gap={8} justifyContent="space-between">
              <Avatar
                size="md"
                borderColor="$primary600"
                borderWidth={2}
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
              <VStack justifyContent="flex-start">
                <Text size="lg" fontFamily="$mono" fontWeight="$bold">{user.nome}</Text>
                <Text size="md" fontFamily="$mono">{user.email}</Text>
              </VStack>
            </HStack>
          </Box>
          <HStack p={16}>
            <Text fontSize={"$lg"} textAlign="justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo consectetur quidem quia fuga molestiae harum?</Text>
          </HStack>
        </Card>
        <ScrollView horizontal flexDirection="row" gap={4} m={16}>
          {users.map((user) => (
            <UserAvatar key={user.usuarioId} email={user.email} />
          ))}
        </ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('profileRoutes')}>
          <Card
            borderRadius={12}
            backgroundColor="$primary800"
            p={24} m={16} h={200}>
            <Text color="$white" fontSize={"$2xl"} fontWeight="semibold">O que voce aprendeu hoje?</Text>
            <HStack>
              <HStack alignItems="center">
                <Text color="$white" >Conte para todos suas novas habilidades!</Text>
                <Icon color="$white" as={ChevronRight}></Icon>
              </HStack>
            </HStack>
            <Text mt={32} textAlign="right" color="$white" fontSize={"$2xl"} fontWeight="semibold">Atualizar Perfil</Text>
            <HStack justifyContent="flex-end">
              <HStack alignItems="center">
                <Text color="$white" >Ajuste as suas informações e contatos</Text>
              </HStack>
            </HStack>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('cardRoutes')}>
          <Card backgroundColor="$primary900" m={16} h={100}>
            <Text textAlign="right" color="$white" fontSize={"$2xl"} fontWeight="semibold">Seus Cartões</Text>
            <HStack justifyContent="flex-end">
              <HStack alignItems="center">
                <Text color="$white" >Veja as informações dos seus cartões</Text>
                <Icon color="$white" as={ChevronRight}></Icon>
              </HStack>
            </HStack>
          </Card>
        </TouchableOpacity>
      </ScrollView>
    </Box>
  );
};

const UserAvatar = ({ email }: { email: string }) => {
  const [imageUrl, setImageUrl] = useState(`https://robohash.org/ds${email}?set=set4`)

  async function handlePicture(userEmail: string) {
    try {
      await fetchUserPictureTeste(userEmail)
        .then((imageUrl) => {
          if (typeof imageUrl === 'string') {
            setImageUrl(imageUrl);
          } else {
            console.log('Error: imageUrl is not a string');
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handlePicture(email)
  }, [])

  return (
    < TouchableOpacity>
      <Avatar mx={8}
        size="lg"
        borderColor="$primary600"
        borderWidth={2}
      >
        <AvatarFallbackText>LC</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: imageUrl,
          }}
          alt="none"
        />
        <AvatarBadge />
      </Avatar>
    </ TouchableOpacity>
  )
}