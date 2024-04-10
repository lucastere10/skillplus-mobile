import { Box, Button, ButtonText, Input, InputField, ScrollView, Link, Text, Divider } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../contexts/AuthContext";
import { loginSchema } from "../../../schemas/authSchema";

export default function LoginScreen() {

    return (
        <Container />
    )
}

const Container = () => {
    const navigation = useNavigation()
    const { signIn, signInWithGoogle } = useAuth();

    function handleRouteChangeToRegister() {
        navigation.navigate('register');
    }

    function handleGoogleSignIn() {
        signInWithGoogle()
    }

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<LoginRequest>({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
        try {
            await signIn(data);
        } catch (error: any) {
            console.error(error);
            if (error.response.data.userMessage) {
                Alert.alert(error.response.data.userMessage);
            } else {
                Alert.alert('Falha ao tentar realizar login o usuário!');
            }
        }
    };

    return (
        <Box flex={1}>
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
                    <Text fontWeight="$bold" alignSelf="flex-start" fontSize={24}>Seja bem vindo!</Text>
                    <Box
                        flex={1}
                        gap={16}
                    >
                        <Box mt={24}>
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
                                <Text alignSelf="flex-start" ml={8} color="red">{errors.login.message}</Text>
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
                                <Text alignSelf="flex-start" ml={8} color="red">{errors.senha.message}</Text>
                            )}
                        </Box>
                        <Button bgColor="$primary600" mt={24} size="lg" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} onPress={handleSubmit(onSubmit)}>
                            <ButtonText>Continuar</ButtonText>
                        </Button>
                    </Box>

                    <Divider my={24}></Divider>

                    <Box>
                        <Button bgColor="$secondary900" size="lg" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} onPress={handleGoogleSignIn}>
                            <ButtonText>Continuar Com o Google</ButtonText>
                        </Button>

                        <Box mt={8} ml={8} flexDirection="row" gap={8}>
                            <Text>Ainda não tem uma conta?</Text>
                            <Link onPress={handleRouteChangeToRegister}>
                                <Text color="$primary600">
                                    Cadastrar.
                                </Text>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </ScrollView>
        </Box>
    );
};