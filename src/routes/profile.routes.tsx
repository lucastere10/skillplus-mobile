import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/(private)/(profile)/ProfileScreen";
import AddPictureScreen from "../screens/(private)/(profile)/AddPictureScreen";
import EditProfileScreen from "../screens/(private)/(profile)/EditProfileScreen";


type ProfileRoutes = {
    profile: undefined;
    addPicture: undefined;
    editProfile: undefined;
}

export type ProfileNavigatorRoutesProps = NativeStackNavigationProp<ProfileRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<ProfileRoutes>();

export function ProfileRoutes() {

    return (
        <Navigator screenOptions={{ headerShown: false }}>

            <Screen
                name="profile"
                component={ProfileScreen}
            />

            <Screen
                name="addPicture"
                component={AddPictureScreen}
            />

            <Screen
                name="editProfile"
                component={EditProfileScreen}
            />
            
        </Navigator>
    )

}