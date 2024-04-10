import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import CardsScreen from "../screens/(private)/(cards)/CardsScreen";
import NewCardScreen from "../screens/(private)/(cards)/NewCardScreen";

type CardsRoutes = {
    cards: undefined;
    newcard: undefined;

}

export type CardsNavigatorRoutesProps = NativeStackNavigationProp<CardsRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<CardsRoutes>();

export function CardsRoutes() {

    return (
        <Navigator screenOptions={{ headerShown: false }}>

            <Screen
                name="cards"
                component={CardsScreen}
            />

            <Screen
                name="newcard"
                component={NewCardScreen}
            />
            
        </Navigator>
    )

}