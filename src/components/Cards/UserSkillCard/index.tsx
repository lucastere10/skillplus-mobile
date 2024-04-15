import React, { useState } from "react";
import {
    HStack, VStack, Divider, Text, Icon, AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, CloseIcon, AlertDialogBody, AlertDialogFooter,
    ButtonGroup, Button, ButtonText,
    View,
} from "@gluestack-ui/themed";
import { Trash2 } from "lucide-react-native";
import { Switch, TouchableOpacity } from "react-native";
import { activateUserSkill, deleteUserSkill } from "../../../service/api/userSkills";
import { useStateChange } from "../../../contexts/stateChangeContext";
import { Heading } from "@gluestack-ui/themed";

export function UserSkillCard({ userSkill }: Readonly<{ userSkill: UserSkill }>) {
    const { setStateChanged } = useStateChange();

    async function handlePatchUserSkill() {
        try {
            const data = await activateUserSkill(userSkill.usuarioSkillId);
            setStateChanged(prevState => !prevState);
        } catch (error) {
            console.log(error);
        }
    }

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
            <HStack gap={16}>
                <Switch
                    value={userSkill.ativo}
                    onValueChange={() => { handlePatchUserSkill() }}
                />
                <DeleteDialog usuarioSkillId={userSkill.usuarioSkillId}></DeleteDialog>
            </HStack>
        </HStack>
    )
}

function DeleteDialog({ usuarioSkillId }: { usuarioSkillId: number }) {

    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const { setStateChanged } = useStateChange();

    async function handleDeleteUserSkill(id:number) {
        try {
            await deleteUserSkill(id)
            setStateChanged(prevState => !prevState);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={() => setShowAlertDialog(true)}>
                <Icon size="xl" as={Trash2} color="$red500"></Icon>
            </TouchableOpacity>
            <AlertDialog
                isOpen={showAlertDialog}
                onClose={() => {
                    setShowAlertDialog(false)
                }}
            >
                <AlertDialogBackdrop />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Heading size="lg">Deletar Habilidade</Heading>
                        <AlertDialogCloseButton>
                            <Icon as={CloseIcon} />
                        </AlertDialogCloseButton>
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <Text size="md">
                            Deseja mesmo deletar essa habilidade? Essa ação não pode ser desfeita.
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <ButtonGroup space="lg">
                            <Button
                                variant="outline"
                                action="secondary"
                                onPress={() => {
                                    setShowAlertDialog(false)
                                }}
                            >
                                <ButtonText>Cancelar</ButtonText>
                            </Button>
                            <Button
                                bg="$error600"
                                action="negative"
                                onPress={() => {
                                    handleDeleteUserSkill(usuarioSkillId)
                                    setShowAlertDialog(false)
                                }}
                            >
                                <ButtonText>Deletar</ButtonText>
                            </Button>
                        </ButtonGroup>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </View>
    )
}