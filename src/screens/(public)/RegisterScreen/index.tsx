import { Box, Button, ButtonIcon, ButtonText, EditIcon, Icon, Input, InputField, Link, ScrollView, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../../../service/api/auth";
import { registerSchema } from "../../../schemas/authSchema";

export default function RegisterScreen() {
    return (
        <Container></Container>
    )
}

const Container = () => {

    const navigation = useNavigation()

    function handleRouteChange() {
        navigation.navigate('login');
    }

    return (
        <Box flex={1} backgroundColor="$white" pt={12}>
            <ScrollView
                style={{ height: '100%' }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <Box
                    h={'$1/5'}
                />
                <Box
                    p={28}
                >
                    <Text mb={24} fontWeight="$bold" alignSelf="flex-start" fontSize={24}>Cadastrar</Text>
                    <RegisterForm />
                    <Box mt={8} ml={8} flexDirection="row" gap={8}>
                        <Text>Já tem uma conta?</Text>
                        <Link onPress={handleRouteChange}>
                            <Text>
                                Entre.
                            </Text>
                        </Link>
                    </Box>
                </Box>
            </ScrollView>
        </Box>
    );
};

const RegisterForm = () => {

    const navigation = useNavigation()

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<RegisterRequest>({
        resolver: yupResolver(registerSchema)
    });

    const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
        const register = await registerUser(data)
        if (register) {
            navigation.navigate('login')
        } else if (!register) {
            
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
                        name='login'
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
                {errors.login && (
                    <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.login.message}</Text>
                )}
            </Box>

            <Box>
                <Input variant="underlined" size="lg" isDisabled={false} isInvalid={false} isReadOnly={false} >
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name='senha'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputField
                                type="password"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder='Digite sua senha'
                            />
                        )}
                    />
                </Input>
                {errors.senha && (
                    <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.senha.message}</Text>
                )}
            </Box>


            <Box>
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
                                    <SelectItem label="Administrador" value="ADMIN" />
                                    <SelectItem label="Cliente" value="CLIENTE" />
                                </SelectContent>
                            </SelectPortal>
                        </Select>
                    )}
                    rules={{ required: true }}
                    name='role'
                />
                {errors.role && (
                    <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.role.message}</Text>
                )}
            </Box>

            <Button gap={8} size="lg" variant="solid" action="primary" mt={24} isDisabled={false} isFocusVisible={false} onPress={handleSubmit(onSubmit)}>
                <ButtonText>Registrar</ButtonText>
                <ButtonIcon as={EditIcon} />
            </Button>
        </Box>
    )
};