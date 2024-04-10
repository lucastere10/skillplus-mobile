import { Divider, HStack, Text, VStack, View } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native";

import { TouchableOpacity } from "react-native";
import { SkillSearchNavigatorRoutesProps } from "../../../routes/(search-routes)/skillSearch.routes";

interface SkillCardProps {
    skill: Skill
}

export function SkillCard({ skill }: Readonly<SkillCardProps>) {
    const navigation = useNavigation<SkillSearchNavigatorRoutesProps>();


    return (
        <View gap={4} w={"$full"} justifyContent="flex-start">
            <TouchableOpacity onPress={() => navigation.navigate('skillResult', { skillId: skill.skillId })}>
                <HStack pl={24} gap={16}>
                    <VStack justifyContent="space-evenly">
                        <Text fontWeight="bold">{skill.skillNome}</Text>
                        <Text >{skill.skillDescricao}</Text>
                        <HStack>
                            <Text>{skill.skillCategoria}</Text>
                            <Divider orientation="vertical" mx={8}></Divider>
                            <Text>{skill.skillDificuldade}</Text>
                        </HStack>
                    </VStack>
                </HStack>
            </TouchableOpacity>
        </View>
    )
}