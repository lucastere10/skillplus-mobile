import { useEffect, useState } from "react";
import { Text, View, Button, Center, HStack, Icon, Divider, Box, ScrollView  } from "@gluestack-ui/themed";
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
                <Center my={16}>
                    <Text fontSize={"$3xl"}>{skill!.skillNome}</Text>
                    <Text fontSize={"$lg"}>{skill!.skillDescricao}</Text>
                    <Text fontSize={"$lg"}>{skill!.skillCategoria}</Text>
                    <Text fontSize={"$lg"}>{skill!.skillDificuldade}</Text>
                    <Text fontSize={"$lg"}>{skill!.ativo}</Text>
                </Center>
            </ScrollView>
        </Box>
    )
}