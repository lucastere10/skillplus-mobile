import React, { useEffect, useState } from "react";
import {
    Text, Icon, AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, CloseIcon, Switch,
    AlertDialogBody, AlertDialogFooter, ButtonGroup, Button, ButtonText, View, Input, InputField, Box, Heading,
    Select, SelectDragIndicatorWrapper, SelectIcon, SelectPortal, SelectContent, SelectBackdrop, SelectTrigger, SelectInput, SelectItem, SelectDragIndicator
} from "@gluestack-ui/themed";
import { CirclePlusIcon } from "lucide-react-native";
import { useStateChange } from "../../../contexts/stateChangeContext";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSkillSchema } from "../../../schemas/authSchema";
import { registerUserSkill } from "../../../service/api/userSkills";
import { fetchSkillsPublic } from "../../../service/api/skills";

export function AddSkillDialog() {
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const [ativoValue, setAtivoValue] = useState(true);
    const [skills, setSkills] = useState<Skill[]>([])
    const { setStateChanged } = useStateChange();

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<UserSkillForm>({
        resolver: yupResolver(userSkillSchema)
    });

    useEffect(() => {
        handleFetchSkills();
    }, []);

    async function handleFetchSkills() {
        try {
            const search = '';
            const page = 0;
            const size = 99;
            const response = await fetchSkillsPublic(search, page, size);
            setSkills(response.content)
        } catch (error) {

        }
    }

    const onSubmit: SubmitHandler<UserSkillForm> = async (data: UserSkillForm) => {
        try {
            await registerUserSkill(data);
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
                        <Heading size="lg" p={8}>Nova Habilidade</Heading>
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
                                            <SelectInput placeholder="Selecione a habilidade" />
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
                                                {skills.map((skill) => (
                                                    <SelectItem key={skill.skillId} value={skill.skillNome} label={skill.skillNome} />
                                                ))}
                                            </SelectContent>
                                        </SelectPortal>
                                    </Select>
                                )}
                                rules={{ required: true }}
                                name='skillNome'
                            />
                            {errors.skillNome && (
                                <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.skillNome.message}</Text>
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
                                            <SelectInput placeholder="Selecione o dominio" />
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
                                                <SelectItem value="INICIANTE" label="Iniciante" />
                                                <SelectItem value="INTERMEDIARIO" label="Intermediário" />
                                                <SelectItem value="AVANCADO" label="Avançado" />
                                                <SelectItem value="ESPECIALISTA" label="Especialista" />
                                            </SelectContent>
                                        </SelectPortal>
                                    </Select>
                                )}
                                rules={{ required: true }}
                                name='usuarioSkillDominio'
                            />
                            {errors.usuarioSkillDominio && (
                                <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.usuarioSkillDominio.message}</Text>
                            )}
                        </Box>
                        <Box mb={12}>
                            <Input variant="underlined" size="lg" isDisabled={false} isInvalid={false} isReadOnly={false} >
                                <Controller
                                    control={control}
                                    rules={{ required: true }}
                                    name='usuarioSkillVersao'
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputField
                                            type="text"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder='Digite a versão da habilidade'
                                        />
                                    )}
                                />
                            </Input>
                            {errors.usuarioSkillVersao && (
                                <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.usuarioSkillVersao.message}</Text>
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