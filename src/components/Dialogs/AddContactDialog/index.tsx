import React, { useState } from "react";
import {
    Text, Icon, AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, CloseIcon, Switch,
    AlertDialogBody, AlertDialogFooter, ButtonGroup, Button, ButtonText, View, Input, InputField, Box, Heading,
    Select, SelectDragIndicatorWrapper, SelectIcon, SelectPortal, SelectContent, SelectBackdrop, SelectTrigger, SelectInput, SelectItem, SelectDragIndicator
} from "@gluestack-ui/themed";
import { CirclePlusIcon } from "lucide-react-native";
import { useStateChange } from "../../../contexts/stateChangeContext";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "../../../schemas/authSchema";
import { registerContact } from "../../../service/api/contacts";

export function AddContactDialog() {
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const [privadoValue, setPrivadoValue] = useState(true);
    const { setStateChanged } = useStateChange();

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<ContactForm>({
        resolver: yupResolver(contactSchema)
    });

    const onSubmit: SubmitHandler<ContactForm> = async (data: ContactForm) => {
        console.log(data)
        try {
            await registerContact(data);
            setStateChanged((prevState: boolean) => !prevState);
            setShowAlertDialog(false)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <View>
            <Button borderWidth={2} variant="outline" w={'$full'} onPress={() => setShowAlertDialog(true)}>
                <Icon color="$primary400" size="lg" as={CirclePlusIcon} />
            </Button>
            <AlertDialog
                isOpen={showAlertDialog}
                onClose={() => {
                    setShowAlertDialog(false)
                }}
            >
                <AlertDialogBackdrop />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Heading size="lg" p={8}>Novo Contato</Heading>
                        <AlertDialogCloseButton>
                            <Icon as={CloseIcon} />
                        </AlertDialogCloseButton>
                    </AlertDialogHeader>
                    <AlertDialogBody mx={16}>
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
                                            <SelectInput placeholder="Selecione o tipo de conta" />
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
                                                <SelectItem value="INSTAGRAM" label="Instagram" />
                                                <SelectItem value="EMAIL" label="Email" />
                                                <SelectItem value="GITHUB" label="Github" />
                                                <SelectItem value="BLOG" label="Blog Pessoal" />
                                                <SelectItem value="FACEBOOK" label="Facebook" />
                                                <SelectItem value="WEBSITE" label="Website" />
                                                <SelectItem value="LINKEDIN" label="LinkedIn" />
                                            </SelectContent>
                                        </SelectPortal>
                                    </Select>
                                )}
                                rules={{ required: true }}
                                name='contatoTipo'
                            />
                            {errors.contatoTipo && (
                                <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.contatoTipo.message}</Text>
                            )}
                        </Box>
                        <Box mb={12}>
                            <Input variant="underlined" size="lg" isDisabled={false} isInvalid={false} isReadOnly={false} >
                                <Controller
                                    control={control}
                                    rules={{ required: true }}
                                    name='contatoNome'
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputField
                                            type="text"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder='Digite o nome do contato'
                                        />
                                    )}
                                />
                            </Input>
                            {errors.contatoNome && (
                                <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.contatoNome.message}</Text>
                            )}
                        </Box>
                        <Box mb={12}>
                            <Input variant="underlined" size="lg" isDisabled={false} isInvalid={false} isReadOnly={false} >
                                <Controller
                                    control={control}
                                    rules={{ required: true }}
                                    name='contatoUrl'
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputField
                                            type="text"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder='Digite a url do contato'
                                        />
                                    )}
                                />
                            </Input>
                            {errors.contatoUrl && (
                                <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.contatoUrl.message}</Text>
                            )}
                        </Box>
                        <Box flexDirection="row" alignItems="center" alignSelf="flex-end" gap={8} mt={8} px={16}>
                            <Text size="xl">Ativo</Text>
                            <Controller
                                control={control}
                                name="privado"
                                defaultValue={privadoValue}
                                render={({ field }) => (
                                    <Switch
                                        size="lg"
                                        value={field.value}
                                        onValueChange={() => {
                                            field.onChange(!field.value);
                                            setPrivadoValue(!field.value);
                                        }}
                                    />
                                )}
                            />
                            {errors.privado && (
                                <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.privado.message}</Text>
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