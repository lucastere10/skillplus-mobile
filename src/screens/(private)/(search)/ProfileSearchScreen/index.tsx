import { Box, Center, HStack, Icon, Input, InputField, ScrollView, Spinner, Text, VStack, View } from "@gluestack-ui/themed";
import { Menu, SlidersHorizontal} from "lucide-react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { fetchUsers } from "../../../../service/api/api";
import { ProfileCard } from "../../../../components/Cards/ProfileCard";

export default function ProfileSearchScreen() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [firstLoad, setFirstLoad] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

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
    }, []);

    const handleSubmit = () => {
        handleUsers();
    }

    return (
        <Box flex={1}>
            <ScrollView
                style={{ height: '100%' }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <Center backgroundColor="$primary600" pt={48} mb={32} py={16} gap={4}>
                    <HStack gap={16} p={12} alignItems="center">
                        <TouchableOpacity onPress={() => { handleSubmit() }}>
                            <Icon color="$white" size="lg" as={SlidersHorizontal} />
                        </TouchableOpacity>
                        <Input
                            variant="underlined"
                            size="lg"
                            width={'$5/6'}
                            isDisabled={false}
                            isInvalid={false}
                            isReadOnly={false}
                        >
                            <InputField
                                color="$white"
                                placeholderTextColor={'$white'}
                                value={search}
                                onChangeText={(search) => {setSearch(search)}}
                                onSubmitEditing={() => {handleSubmit()}}
                                placeholder="Pesquisar..." />
                        </Input>
                    </HStack>
                </Center>
                <View>
                    <VStack gap={16}>
                        {loading ?
                            (
                                Array.from({ length: 4 }).map((_, index) =>
                                    <Spinner key={index} size="small" />)
                            ) : (

                                users.map((user) => (
                                    <ProfileCard key={user.usuarioId} usuario={user} />
                                ))

                            )}
                    </VStack>
                </View>
            </ScrollView>
        </Box>
    );
};