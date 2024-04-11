import React from "react";
import {
    HStack, VStack, Divider, Text
    
    ,
} from "@gluestack-ui/themed";

export function ResultUserSkillCard({ userSkill }: Readonly<{ userSkill: UserSkill }>) {

    return (
        <HStack flex={1} justifyContent="space-between" alignItems="center" key={userSkill.usuarioSkillId}>
            <VStack>
                <Text fontWeight="bold" fontSize={'$lg'}>{userSkill.skill.skillNome}</Text>
                <HStack>
                    <Text>{userSkill.usuarioSkillVersao}</Text>
                    <Divider
                        orientation="vertical"
                        mx="$2.5"
                        bg="$blue500"
                        $dark-bg="$emerald400"
                    />
                    <Text>{userSkill.usuarioSkillDominio}</Text>
                </HStack>
            </VStack>
        </HStack>
    )
}