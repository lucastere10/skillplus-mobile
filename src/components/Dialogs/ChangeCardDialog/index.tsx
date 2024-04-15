import React, { useState } from "react";
import {
    Text, Icon, AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, CloseIcon, Switch,
    AlertDialogBody, AlertDialogFooter, ButtonGroup, Button, ButtonText, View, Box, Heading, RadioGroup, Radio, RadioIndicator
} from "@gluestack-ui/themed";
import { RadioIcon } from "lucide-react-native";
import { useStateChange } from "../../../contexts/stateChangeContext";
import { TouchableOpacity } from "react-native";
import { activateCard, deleteCard, updateBackgroundCard } from "../../../service/api/cards";
import SocialCardTypeOne from "../../Cards/SocialCardTypeOne";

export function ChangeCardDialog({ card }: Readonly<{ card: Cartao }>) {
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const [ativoValue, setAtivoValue] = useState(card.ativo);
    const { setStateChanged } = useStateChange();

    async function handleActivateCard() {
        try {
            await activateCard(card.cartaoId);
            setStateChanged(prevState => !prevState);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteCard() {
        try {
            await deleteCard(card.cartaoId)
            setStateChanged(prevState => !prevState);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditBackgroundCard = async (newBackground: string) => {
        try {
            await updateBackgroundCard(card.cartaoId, { cartaoBackground: newBackground });
            setStateChanged(prevState => !prevState);
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setShowAlertDialog(true)}>
                <SocialCardTypeOne card={card} />
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
                        <Heading size="lg" p={4}>Editar</Heading>
                        <AlertDialogCloseButton>
                            <Icon as={CloseIcon} />
                        </AlertDialogCloseButton>
                    </AlertDialogHeader>
                    <AlertDialogBody mx={16}>
                        <Box flexDirection="row" alignItems="center" alignSelf="flex-start" gap={8} mb={24}>
                            <Text size="xl">Ativo</Text>
                            <Switch
                                size="lg"
                                value={ativoValue}
                                onValueChange={() => {
                                    handleActivateCard();
                                    setAtivoValue(!ativoValue);
                                }}
                            />
                        </Box>
                        <Box>
                            <RadioGroup flexDirection="row" gap={8} mb={12}>
                                <Radio size="lg" bgColor="$black" borderWidth={0} borderRadius={100} onPress={() => { handleEditBackgroundCard("https://www.solidbackgrounds.com/images/950x350/950x350-black-solid-color-background.jpg") }} value="https://www.solidbackgrounds.com/images/950x350/950x350-black-solid-color-background.jpg">
                                    <RadioIndicator>
                                        <RadioIcon />
                                    </RadioIndicator>
                                </Radio>
                                <Radio size="lg" bgColor="$primary500" borderWidth={0} borderRadius={100} onPress={() => { handleEditBackgroundCard("https://img.freepik.com/free-vector/gradient-dark-dynamic-lines-background_23-2148995950.jpg") }} value="https://img.freepik.com/free-vector/gradient-dark-dynamic-lines-background_23-2148995950.jpg">
                                    <RadioIndicator>
                                        <RadioIcon />
                                    </RadioIndicator>
                                </Radio>
                                <Radio size="lg" bgColor="$blueGray700" borderWidth={0} borderRadius={100} onPress={() => { handleEditBackgroundCard("https://img.freepik.com/premium-photo/black-paper-texture-background-black-cardboard-artworks_434420-1392.jpg") }} value="https://img.freepik.com/premium-photo/black-paper-texture-background-black-cardboard-artworks_434420-1392.jpg">
                                    <RadioIndicator>
                                        <RadioIcon />
                                    </RadioIndicator>
                                </Radio>
                                <Radio size="lg" bgColor="$yellow400" borderWidth={0} borderRadius={100} onPress={() => { handleEditBackgroundCard("https://t4.ftcdn.net/jpg/04/37/53/59/360_F_437535966_BeqAubSzmrhlniUjsJ5NQGj7l7r7yk20.jpg") }} value="https://t4.ftcdn.net/jpg/04/37/53/59/360_F_437535966_BeqAubSzmrhlniUjsJ5NQGj7l7r7yk20.jpg">
                                    <RadioIndicator>
                                        <RadioIcon />
                                    </RadioIndicator>
                                </Radio>
                                <Radio size="lg" bgColor="$teal500" borderWidth={0} borderRadius={100} onPress={() => { handleEditBackgroundCard("https://neki.com.br/wp-content/uploads/2024/03/Pessoas-sorrindo-Bnner-Inicial-NEKI.jpg") }} value="https://neki.com.br/wp-content/uploads/2024/03/Pessoas-sorrindo-Bnner-Inicial-NEKI.jpg">
                                    <RadioIndicator>
                                        <RadioIcon />
                                    </RadioIndicator>
                                </Radio>
                            </RadioGroup>
                        </Box>
                        <Box mb={0}>
                            <Button
                                action="negative"
                                onPress={() => {
                                    handleDeleteCard()
                                }}
                            >
                                <ButtonText>DELETAR</ButtonText>
                            </Button>
                        </Box>
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
                                bg="$primary500"
                                action="positive"
                                onPress={() => {
                                    setShowAlertDialog(false)
                                }}
                            >
                                <ButtonText>Salvar</ButtonText>
                            </Button>
                        </ButtonGroup>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </View>
    )
}