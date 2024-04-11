import { AvatarBadge, AvatarFallbackText, AvatarImage, Box, HStack, ScrollView, Text, View } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";
import { fetchUserData, fetchUserPictureTeste } from "../../../service/api/api";
import { useStateChange } from "../../../contexts/stateChangeContext";
import { Avatar } from "@gluestack-ui/themed";
import { Card } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { Icon } from "@gluestack-ui/themed";
import { Send } from "lucide-react-native";

export default function HomeScreen() {
  return <Container />;
};

const Container = () => {
  const { signOut, user } = useAuth()
  const [src, setSrc] = useState(`https://robohash.org/ds${user.email}?set=set4`);
  const { stateChanged } = useStateChange();

  useEffect(() => {
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
    <Box backgroundColor="$blue50">
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
        </Card>
        <Card m={16} h={400}>
        </Card>
        <Card m={16} h={100}>
        </Card>
      </ScrollView>
    </Box>
  );
};