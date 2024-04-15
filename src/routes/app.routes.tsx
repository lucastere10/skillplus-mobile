import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Box, Icon } from "@gluestack-ui/themed";
import { CircleUser, CreditCard, HomeIcon, Search, Shield } from "lucide-react-native";
import { TotpRoutes } from "./totp.routes";
import HomeScreen from "../screens/(private)/HomeScreen";
import { SearchRoutes } from "./(search-routes)/search.routes";
import { CardsRoutes } from "./cards.routes";
import { ProfileRoutes } from "./profile.routes";

type AppRoutes = {
    homeRoutes: undefined;
    searchRoutes: undefined;
    totpRoutes: undefined;
    cardRoutes: undefined;
    profileRoutes: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
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
                name='homeRoutes'
                component={HomeScreen}
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
                            <Icon color={focused ? "$blue900" : "#E7DCDA"} size="xl" as={HomeIcon} />
                        </Box>
                    )
                }}
            />

            <Screen
                name='searchRoutes'
                component={SearchRoutes} 
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
                            <Icon color={focused ? "$blue900" : "#E7DCDA"} size="xl" as={Search} />
                        </Box>
                    )
                }}
                />

            <Screen
                name='totpRoutes'
                component={TotpRoutes} 
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
                            <Icon color={focused ? "$blue900" : "#E7DCDA"} size="xl" as={Shield} />
                        </Box>
                    )
                }}
                />

            <Screen
                name='cardRoutes'
                component={CardsRoutes} 
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
                            <Icon color={focused ? "$blue900" : "#E7DCDA"} size="xl" as={CreditCard} />
                        </Box>
                    )
                }}
                />

            <Screen
                name='profileRoutes'
                component={ProfileRoutes} 
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
                            <Icon color={focused ? "$blue900" : "#E7DCDA"} size="xl" as={CircleUser} />
                        </Box>
                    )
                }}
                />

        </Navigator>
    )
}
