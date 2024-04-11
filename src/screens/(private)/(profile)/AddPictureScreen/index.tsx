import React, { useEffect, useState, useRef } from 'react';
import { Box, ScrollView, View, Text, Image, Textarea, TextareaInput, Button } from "@gluestack-ui/themed";
import DocumentPicker from "react-native-document-picker";
import { TouchableOpacity } from "react-native";
import { fetchUserPictureTeste, uploadPicture } from '../../../../service/api/api';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { uploadPictureSchema } from '../../../../schemas/authSchema';
import { useAuth } from '../../../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { ProfileNavigatorRoutesProps } from '../../../../routes/profile.routes';
import { useStateChange } from '../../../../contexts/stateChangeContext';

export default function AddPictureScreen() {
    const { user } = useAuth();
    const inputFileRef = useRef(null);
    const [imageUri, setImageUri] = useState('https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png');
    const navigation = useNavigation<ProfileNavigatorRoutesProps>();
    const { setStateChanged } = useStateChange();

    async function handleUserPicture(email: string) {
        try {
            await fetchUserPictureTeste(email)
                .then((imageUrl) => {
                    if (typeof imageUrl === 'string') {
                        setImageUri(imageUrl);
                    } else {
                        console.log('Error: imageUrl is not a string');
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    const {
        register,
        control,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm<UploadPictureForm>({
        resolver: yupResolver(uploadPictureSchema)
    });

    const docPicker = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images],
            });
            console.log(typeof res);
            setImageUri(res.uri);
            if (inputFileRef.current) {
                inputFileRef.current.value = res.uri;
            }
            setValue('arquivo', res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("error -----", err);
            } else {
                throw err;
            }
        }
    };

    useEffect(() => {
        handleUserPicture(user.email)
    }, [])

    useEffect(() => {
        register('arquivo');
    }, [register]);

    const onSubmit: SubmitHandler<UploadPictureForm> = async (data) => {
        console.log(data.arquivo)
        if (!data.arquivo) {
            alert('Favor Adicionar uma foto');
            return;
        }
        try {
            await uploadPicture(data);
            setStateChanged((prevState: boolean) => !prevState);
            navigation.navigate('profile')
        } catch (error: any) {
            console.error('caiu aqui: ', error);
        }
    };

    return (
        <Box backgroundColor="$blue50">
            <ScrollView
                style={{ height: '100%' }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View backgroundColor={'$primary600'} h={48}></View>
                <View p={32} mt={32}>
                    <View justifyContent="center" alignItems="center">
                        <Text textAlign="center" fontSize={"$3xl"} fontWeight="$bold">Vamos adicionar uma foto ao perfil?</Text>
                        <Text my={16} >Adicionar uma foto ao seu perfil ajuda seus amigos a reconhecê-lo e cria uma sensação de comunidade.</Text>
                        <TouchableOpacity onPress={() => { docPicker() }}>
                            <Image
                                width={180}
                                height={180}
                                mt={45}
                                borderRadius={200}
                                borderWidth={2}
                                borderColor="$blueGray400"
                                source={{ uri: imageUri }}
                                alt={imageUri}
                            />
                            <Text textAlign="center" fontWeight="$semibold" color="$primary500" fontSize={"$lg"} mt={8}>Alterar Foto</Text>
                        </TouchableOpacity>
                        {errors.arquivo && (
                            <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.arquivo.message}</Text>
                        )}
                        <Textarea
                            mt={32}
                            size="lg"
                            isReadOnly={false}
                            isInvalid={false}
                            isDisabled={false}
                            w="$5/6"
                        >
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                name='descricao'
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextareaInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        backgroundColor="$white"
                                        placeholder=" Autodescrição" />

                                )}
                            />
                        </Textarea>
                        {errors.descricao && (
                            <Text alignSelf="flex-start" ml={8} mt={1} color="red">{errors.descricao.message}</Text>
                        )}
                        <Button mt={64} width='$full' rounded='$full' onPress={handleSubmit(onSubmit)}>
                            <Text color="$white" fontWeight="$semibold" fontSize={"$xl"}>Atualizar</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </Box>
    );
};



