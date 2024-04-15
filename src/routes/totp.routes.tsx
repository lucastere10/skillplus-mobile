import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthGuardScreen from "../screens/(private)/(guard)/AuthGuardScreen";
import TotpScreen from "../screens/(private)/(guard)/TotpScreen";


type TotpRoutes = {
    qrreader: undefined;
    totp: { skillId: string };

}

export type TotpNavigatorRoutesProps = NativeStackNavigationProp<TotpRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<TotpRoutes>();

export function TotpRoutes() {

    return (
        <Navigator screenOptions={{ headerShown: false }}>

            <Screen
                name="qrreader"
                component={AuthGuardScreen}
            />

            <Screen
                name="totp"
                component={TotpScreen}
            />
            
        </Navigator>
    )

}
