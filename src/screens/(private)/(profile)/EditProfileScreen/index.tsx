import React, { useEffect, useState } from "react";
import { Box, ScrollView, View, Text, Input, InputField, ButtonText, Button, ButtonIcon } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { fetchUser, updateUser } from "../../../../service/api/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserSchema } from "../../../../schemas/authSchema";
import { EditIcon } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { ProfileNavigatorRoutesProps } from "../../../../routes/profile.routes";

export default function EditProfileScreen() {

    return (
        <Box>
            <ScrollView
                style={{ height: '100%' }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View backgroundColor={'$primary600'} h={48}></View>
                <Box
                    h={'$1/5'}
                />
                <Box
                    p={28}
                >
                    <Text mb={24} fontWeight="$bold" alignSelf="flex-start" fontSize={24}>Editar Conta</Text>
                    <EditForm />
                </Box>
            </ScrollView>
        </Box>
    );
};



const EditForm = () => {
    const [user, setUser] = useState<User | null>(null)
    const navigation = useNavigation<ProfileNavigatorRoutesProps>()
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event: React.ChangeEvent<{}>, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
      };

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<UpdateUserForm>({
        resolver: yupResolver(updateUserSchema),
        defaultValues: {
            nome: '',
            nomeSocial: '',
            telefone: '',
            dataNascimento: '',
        },
    });

    useEffect(() => {
        async function getUser() {
            const data = await fetchUser();
            setValue('nome', data['nome']);
            setValue('nomeSocial', data['nomeSocial']);
            setValue('dataNascimento', data['dataNascimento']);
            setValue('telefone', data['telefone']);
            setUser(data)
        }
        getUser();
    }, [setValue]);


    const onSubmit: SubmitHandler<UpdateUserForm> = async (data) => {
        const newDate = new Date(data.dataNascimento);
        console.log(newDate)
        try {
            await updateUser(data);
            navigation.navigate("profile")
        } catch (error: any) {
            console.error(error);
            alert(error.response.data.userMessage);
        }
    }


    return (
        <Box
            gap={12}
        >
            <Box>
                <Input variant="underlined" size="lg" isDisabled={false} isInvalid={false} isReadOnly={false} >
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name='nome'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputField
                                type="text"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder='Digite seu nome'
                            />
                        )}
                    />
                </Input>
                {errors.nome && (
                    <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.nome.message}</Text>
                )}
            </Box>

            <Box>
                <Input variant="underlined" size="lg" isDisabled={false} isInvalid={false} isReadOnly={false} >
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name='nomeSocial'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputField
                                type="text"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder='Digite seu email'
                            />
                        )}
                    />
                </Input>
                {errors.nomeSocial && (
                    <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.nomeSocial.message}</Text>
                )}
            </Box>

            <Box>
                <Input variant="underlined" size="lg" isDisabled={true} isInvalid={false} isReadOnly={false} >
                    <InputField
                        type="text"
                        value={user?.email}
                    />
                </Input>
                {errors.nomeSocial && (
                    <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.nomeSocial.message}</Text>
                )}
            </Box>

            <Box>
                <Input variant="underlined" size="lg" isDisabled={false} isInvalid={false} isReadOnly={false} >
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name='telefone'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputField
                                type="text"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value ?? ''}
                                placeholder='Digite seu Telefone'
                            />
                        )}
                    />
                </Input>
                {errors.telefone && (
                    <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.telefone.message}</Text>
                )}
            </Box>
            <Box>
                <TouchableOpacity onPress={() => setShow(true)}>
                    <Input variant="underlined" size="lg">
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name='dataNascimento'
                            render={({ field: { onChange, onBlur, value } }) => (
                                <InputField
                                    type="text"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    defaultValue={value}
                                    placeholder='Digite sua Data de Nascimento'
                                />
                            )}
                        />
                    </Input>
                </TouchableOpacity>
                {errors.dataNascimento && (
                    <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.dataNascimento.message}</Text>
                )}
            </Box>
            <Button gap={8} size="lg" variant="solid" action="primary" mt={24} isDisabled={false} isFocusVisible={false} onPress={handleSubmit(onSubmit)}>
                <ButtonText>Salvar</ButtonText>
                <ButtonIcon as={EditIcon} />
            </Button>
        </Box>
    )
};