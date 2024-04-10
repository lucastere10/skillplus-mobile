import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, ToastAndroid } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { generateDummyPassword } from "../utils/dummyPassword";
import { loginUser, registerUserWithGoogle } from "../service/api/auth";
import { fetchUserData } from "../service/api/api";
import { WEB_CLIENT_ID } from "@env";

interface AuthContextType {
    user: UsuarioLogadoType
    isLoading: boolean;
    isSignedIn: boolean;
    signInWithGoogle: () => Promise<void>;
    signIn: (data: LoginRequest) => Promise<void>;
    signOut: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

GoogleSignin.configure({
    scopes: ['email', 'profile'],
    webClientId: WEB_CLIENT_ID
})

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState<UsuarioLogadoType>({} as UsuarioLogadoType)

    useEffect(() => {
        const checkSignInStatus = async () => {
            const token = await AsyncStorage.getItem("token");
            const userData = await AsyncStorage.getItem("user");
            if (token && userData) {
                setUser(JSON.parse(userData));
                setIsSignedIn(true);
            }
            setIsLoading(false);
        };
        checkSignInStatus();
    }, []);

    const signInWithGoogle = async () => {
        try {
            setIsLoading(true);
            const response = await GoogleSignin.signIn()
            if (response.user) {
                const password = generateDummyPassword(response.user.email!)
                const token = await registerUserWithGoogle({
                    login: response.user.email!,
                    senha: password,
                    nome: response.user.name!
                })
                // Check if token is a string
                if (typeof token === 'string') {
                    await AsyncStorage.setItem('token', token);
                    const userData = await fetchUserData();
                    setUser(userData.data);
                    await AsyncStorage.setItem('user', JSON.stringify(userData.data));
                    setIsSignedIn(true);
                } else {
                    console.log('um erro aconteceu ao tentar resolver o token')
                    setIsSignedIn(false);
                }
                setIsLoading(false);
            }
        } catch (error: any) {
            console.log(error)
            Alert.alert('Algo deu errado com o login \n', error.toString())
            setIsSignedIn(false);
            setIsLoading(false);
        }
    }

    const signIn = async (data: LoginRequest) => {
        setIsLoading(true);
        alert(WEB_CLIENT_ID)
        const loginSuccessful = await loginUser(data);
        if (loginSuccessful) {
            const userData = await fetchUserData();
            setUser(userData.data);
            await AsyncStorage.setItem('user', JSON.stringify(userData.data));
        }
        setIsSignedIn(loginSuccessful);
        setIsLoading(false);
    };

    const signOut = async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            setUser({} as UsuarioLogadoType);
            // Revoke access from Google Signin
            await GoogleSignin.revokeAccess();
            ToastAndroid.show('Sessão finalizada', ToastAndroid.TOP);
            console.log('Logout successful!');
            setIsSignedIn(false);
        } catch (err) {
            console.error('Logout failed!');
            console.error(err)
        }
    };

    return (
        <AuthContext.Provider value={{ isLoading, isSignedIn, signIn, signInWithGoogle, signOut, user }}>
            {children}
        </AuthContext.Provider>
    );
};
