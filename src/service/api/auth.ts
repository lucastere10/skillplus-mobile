import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import api from './api';

export const registerUser = async (data: RegisterRequest) => {
    try {
        const res = await api.post('/auth/register', {
            nome: data.nome,
            login: data.login,
            senha: data.senha,
        });
        Alert.alert('Usuário registrado com sucesso!');
        return true;
    } catch (err: any) {
        if (err.response.data.userMessage) {
            Alert.alert(err.response.data.userMessage);
        } else {
            console.error('Error:', err.message);
        }
        return false;
    }
};

export const registerUserWithGoogle = async ({ login, senha, nome }: { login: string, senha: string, nome: string }): Promise<string | boolean> => {
    try {
        const response = await api.post('/auth/login-social', {
            nome: nome,
            login: login,
            senha: senha,
        });
        return response.data.token;
    } catch (error: any) {
        console.error(error);
        return false;
    }
};

export const loginUser = async (data: LoginRequest) => {
    try {
        const response = await api({
            method: 'post',
            url: '/auth/login',
            data: {
                login: data.login,
                senha: data.senha,
            }
        });
        await AsyncStorage.setItem("token", response.data.token);
        return true; // Login was successful
    } catch (err: any) {
        if (err.response.data.userMessage) {
            Alert.alert(err.response.data.userMessage);
        } else {
            console.error('Error:', err.message);
        }
        return false; // Login failed
    }
}

export const fetchTotp = async () => {
    try {
        const response = await api.get(
            '/auth/totp/mobile',
        );
        return response.data
    } catch (err: any) {
        if (err.response.data.userMessage) {
            Alert.alert(err.response.data.userMessage);
        } else {
            console.error('Error:', err.message);
        }
        return false;
    }
}

