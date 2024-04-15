import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Box, Icon } from "@gluestack-ui/themed";
import { SquareGanttChart, User } from "lucide-react-native";
import { ProfileSearchRoutes } from "./profileSearch.routes";
import { SkillSearchRoutes } from "./skillSearch.routes";


type SearchRoutes = {
    profileSearchRoutes: undefined;
    skillSearchRoutes: undefined;
}

export type SearchNavigatorRoutesProps = BottomTabNavigationProp<SearchRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<SearchRoutes>();

export function SearchRoutes() {

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 60,
                },
            }}
        >
            <Screen
                name="profileSearchRoutes"
                component={ProfileSearchRoutes}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Box style={{
                            height: 60,
                            width: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            borderTopWidth: focused ? 4 : 0,
                            borderTopColor: "#0D47A1"
                        }}>
                            <Icon color={focused ? "$blue900" : "#E7DCDA"} size="xl" as={User} />
                        </Box>
                    )
                }}
            />

            <Screen
                name="skillSearchRoutes"
                component={SkillSearchRoutes}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Box style={{
                            height: 60,
                            width: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            borderTopWidth: focused ? 4 : 0,
                            borderTopColor: "#0D47A1"
                        }}>
                            <Icon color={focused ? "$blue900" : "#E7DCDA"} size="xl" as={SquareGanttChart} />
                        </Box>
                    )
                }}
            />

        </Navigator>
    )

}
