
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import ProfileSearchResultScreen from "../../screens/(private)/(search)/ProfileSearchResultScreen";
import ProfileSearchScreen from "../../screens/(private)/(search)/ProfileSearchScreen";

type ProfileSearchRoutes = {
    profileSearch: undefined;
    profileResult: { userId: number };
}

export type ProfileSearchNavigatorRoutesProps = NativeStackNavigationProp<ProfileSearchRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<ProfileSearchRoutes>();

export function ProfileSearchRoutes() {

    return (
        <Navigator screenOptions={{ headerShown: false }}>

            <Screen
                name="profileSearch"
                component={ProfileSearchScreen}
            />

            <Screen
                name="profileResult"
                component={ProfileSearchResultScreen}
            />

        </Navigator>
    )
}