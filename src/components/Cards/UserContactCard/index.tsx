import React, { useState } from "react";
import {
    HStack, VStack, Divider, Text, Icon, ButtonGroup, Button, ButtonText, View, LinkText,
    AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, CloseIcon, AlertDialogBody, AlertDialogFooter, Heading, Link
} from "@gluestack-ui/themed";
import { Github, Instagram, Linkedin, Mail, Rss, Globe, Facebook, Trash2, LucideIcon } from "lucide-react-native";
import { Switch, TouchableOpacity } from "react-native";
import { useStateChange } from "../../../contexts/stateChangeContext";
import { activateContact, deleteContact } from "../../../service/api/contacts";

const IconMap: { [key: string]: LucideIcon } = {
    INSTAGRAM: Instagram,
    EMAIL: Mail,
    GITHUB: Github,
    BLOG: Rss,
    WEBSITE: Globe,
    LINKEDIN: Linkedin,
    FACEBOOK: Facebook
};

export function UserContactCard({ contact }: Readonly<{ contact: Contato }>) {
    const { setStateChanged } = useStateChange();
    const IconComponent = IconMap[contact.contatoTipo];

    async function handlePatchContact() {
        try {
            const data = await activateContact(contact.contatoId);
            setStateChanged(prevState => !prevState);
            const ativo = (data.privado ? "Ativado" : "Desativado")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <HStack key={contact.contatoId} justifyContent="space-between">

            <HStack gap={16}>
                <Icon color="$blue500" size="xl" as={IconComponent} />
                <Link href={contact.contatoUrl}>
                    <LinkText color="$black" textDecorationLine="none" size="lg">{contact.contatoNome}</LinkText>
                </Link>
            </HStack>

            <HStack gap={16}>
                <Switch
                    value={contact.privado}
                    onValueChange={() => { handlePatchContact() }}
                />
                <DeleteDialog usuarioContatoId={contact.contatoId}></DeleteDialog>
            </HStack>

        </HStack>
    );
}

function DeleteDialog({ usuarioContatoId }: { usuarioContatoId: number }) {
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const { setStateChanged } = useStateChange();

    async function handleDeleteContact(id: number) {
        try {
            await deleteContact(id)
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
                        <Heading size="lg">Deletar Contato</Heading>
                        <AlertDialogCloseButton>
                            <Icon as={CloseIcon} />
                        </AlertDialogCloseButton>
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <Text size="md">
                            Deseja mesmo deletar esse contato? Essa ação não pode ser desfeita.
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
                                    handleDeleteContact(usuarioContatoId)
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