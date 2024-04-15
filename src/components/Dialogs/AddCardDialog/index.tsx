import React, { useState } from "react";
import {
    Text, Icon, AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, CloseIcon, Switch,
    AlertDialogBody, AlertDialogFooter, ButtonGroup, Button, ButtonText, View, Input, InputField, Box, Heading,
    Select, SelectDragIndicatorWrapper, SelectIcon, SelectPortal, SelectContent, SelectBackdrop, SelectTrigger, SelectInput, SelectItem, SelectDragIndicator
} from "@gluestack-ui/themed";
import { CirclePlus } from "lucide-react-native";
import { useStateChange } from "../../../contexts/stateChangeContext";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cartaoSchema } from "../../../schemas/authSchema";
import { TouchableOpacity } from "react-native";
import { registerCard } from "../../../service/api/cards";

export function AddCardDialog() {
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const [ativoValue, setAtivoValue] = useState(true);
    const { setStateChanged } = useStateChange();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<CartaoForm>({
        resolver: yupResolver(cartaoSchema)
    });

    const onSubmit: SubmitHandler<CartaoForm> = async (data: CartaoForm) => {
        try {
            const response = await registerCard(data);
            setStateChanged((prevState: boolean) => !prevState);
            setShowAlertDialog(false)
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <View>
            <TouchableOpacity onPress={() => setShowAlertDialog(true)}>
                <View alignItems="center" borderColor="$primary500" justifyContent="center" borderRadius={12} borderWidth={2} h={180} width={360} backgroundColor="$">
                    <Icon color="$primary500" as={CirclePlus} />
                </View>
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
                        <Heading size="lg" p={8}>Nova Habilidade</Heading>
                        <AlertDialogCloseButton>
                            <Icon as={CloseIcon} />
                        </AlertDialogCloseButton>
                    </AlertDialogHeader>
                    <AlertDialogBody mx={16}>
                        <Box mb={12}>
                            <Input variant="underlined" size="lg" isDisabled={false} isInvalid={false} isReadOnly={false} >
                                <Controller
                                    control={control}
                                    rules={{ required: true }}
                                    name='cartaoUsuario'
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputField
                                            type="text"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder='Digite o nome do Usuario'
                                        />
                                    )}
                                />
                            </Input>
                            {errors.cartaoUsuario && (
                                <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.cartaoUsuario.message}</Text>
                            )}
                        </Box>
                        <Box mb={12}>
                            <Input variant="underlined" size="lg" isDisabled={false} isInvalid={false} isReadOnly={false} >
                                <Controller
                                    control={control}
                                    rules={{ required: true }}
                                    name='cartaoNome'
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputField
                                            type="text"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder='Digite o nome do cartão'
                                        />
                                    )}
                                />
                            </Input>
                            {errors.cartaoNome && (
                                <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.cartaoNome.message}</Text>
                            )}
                        </Box>
                        <Box mb={12}>
                            <Input variant="underlined" size="lg" isDisabled={false} isInvalid={false} isReadOnly={false} >
                                <Controller
                                    control={control}
                                    rules={{ required: true }}
                                    name='cartaoUrl'
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputField
                                            type="text"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder='Digite a url do qrcode'
                                        />
                                    )}
                                />
                            </Input>
                            {errors.cartaoUrl && (
                                <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.cartaoUrl.message}</Text>
                            )}
                        </Box>
                        <Box mb={12}>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Select
                                        selectedValue={value}
                                        onValueChange={(itemValue: string) => {
                                            onChange(itemValue);
                                        }}                    >
                                        <SelectTrigger variant="underlined" size="lg">
                                            <SelectInput placeholder="Selecione o Background" />
                                            <SelectIcon>
                                                <Icon />
                                            </SelectIcon>
                                        </SelectTrigger>
                                        <SelectPortal>
                                            <SelectBackdrop />
                                            <SelectContent>
                                                <SelectDragIndicatorWrapper>
                                                    <SelectDragIndicator />
                                                </SelectDragIndicatorWrapper>
                                                <SelectItem value="https://www.solidbackgrounds.com/images/950x350/950x350-black-solid-color-background.jpg" label="Black" />
                                                <SelectItem value="https://img.freepik.com/free-vector/gradient-dark-dynamic-lines-background_23-2148995950.jpg" label="Azul" />
                                                <SelectItem value="https://img.freepik.com/premium-photo/black-paper-texture-background-black-cardboard-artworks_434420-1392.jpg" label="Textura" />
                                                <SelectItem value="https://t4.ftcdn.net/jpg/04/37/53/59/360_F_437535966_BeqAubSzmrhlniUjsJ5NQGj7l7r7yk20.jpg" label="Premium" />
                                                <SelectItem value="https://neki.com.br/wp-content/uploads/2024/03/Pessoas-sorrindo-Bnner-Inicial-NEKI.jpg" label="Neki" />
                                            </SelectContent>
                                        </SelectPortal>
                                    </Select>
                                )}
                                rules={{ required: true }}
                                name='cartaoBackground'
                            />
                            {errors.cartaoBackground && (
                                <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.cartaoBackground.message}</Text>
                            )}
                        </Box>
                        <Box flexDirection="row" alignItems="center" alignSelf="flex-end" gap={8} mt={8} px={16}>
                            <Text size="xl">Ativo</Text>
                            <Controller
                                control={control}
                                name="ativo"
                                defaultValue={ativoValue}
                                render={({ field }) => (
                                    <Switch
                                        size="lg"
                                        value={field.value}
                                        onValueChange={() => {
                                            field.onChange(!field.value);
                                            setAtivoValue(!field.value);
                                        }}
                                    />
                                )}
                            />
                            {errors.ativo && (
                                <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.ativo.message}</Text>
                            )}
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
                                onPress={handleSubmit(onSubmit)}
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