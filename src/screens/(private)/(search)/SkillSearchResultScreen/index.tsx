import { useEffect, useState } from "react";
import { Text, View, Button, Center, HStack, Icon, Divider, Box, ScrollView } from "@gluestack-ui/themed";
import { RouteProp } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { fetchSkillById } from "../../../../service/api/skills";

export default function SkillSearchResultScreen({ route }: Readonly<{ route: RouteProp<SkillSearchRoutes, 'skillResult'> }>) {
    const { skillId } = route.params;
    const [skill, setSkill] = useState<Skill[]>([])

    useEffect(() => {
        handleSkill(skillId)
    }, []);


    async function handleSkill(id: number) {

        try {
            const response = await fetchSkillById(id)
            console.log(response)
            setSkill(response)
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
                <View backgroundColor={'$primary600'} h={48}></View>
                <Center px={24} mt={96}>
                    <Text my={32} fontWeight="bold" fontSize={"$3xl"}>{skill!.skillNome}</Text>
                    <Text mb={48} textAlign="center" fontSize={"$lg"}>{skill!.skillDescricao}</Text>
                    <Text mb={8} fontWeight="bold" fontSize={"$lg"}>{skill!.skillCategoria}</Text>
                    <Text mb={64} fontWeight="bold" fontSize={"$lg"}>{skill!.skillDificuldade}</Text>
                    <Text fontWeight="bold" fontSize={"$2xl"}>{skill ? `ATIVA` : `INATIVA`}</Text>
                </Center>
            </ScrollView>
        </Box>
    )
}