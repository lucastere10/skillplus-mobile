import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import LoginScreen from "../screens/(public)/LoginScreen";
import RegisterScreen from "../screens/(public)/RegisterScreen";

type AuthRoutes = {
    login: undefined;
    register: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {

    return (
        <Navigator screenOptions={{ headerShown: false }}>

            <Screen
                name="login"
                component={LoginScreen}
            />

            <Screen
                name="register"
                component={RegisterScreen}
            />
        </Navigator>
    )
}