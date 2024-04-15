
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import SkillSearchResultScreen from "../../screens/(private)/(search)/SkillSearchResultScreen";
import SkillSearchScreen from "../../screens/(private)/(search)/SkillSearchScreen";

type SkillSearchRoutes = {
    skillSearch: undefined;
    skillResult:  { skillId: number };
}

export type SkillSearchNavigatorRoutesProps = NativeStackNavigationProp<SkillSearchRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<SkillSearchRoutes>();

export function SkillSearchRoutes() {

    return (
        <Navigator screenOptions={{ headerShown: false }}>

            <Screen
                name="skillSearch"
                component={SkillSearchScreen}
            />

            <Screen
                name="skillResult"
                component={SkillSearchResultScreen}
            />
        </Navigator>
    )
}