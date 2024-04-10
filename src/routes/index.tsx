import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import SplashScreen from "../screens/SplashScreen";
import { useAuth } from "../contexts/AuthContext";

export function Routes() {
    const { isLoading, isSignedIn } = useAuth();
  
    if (isLoading) {
      return <SplashScreen />;
    }
  
    return (
      <NavigationContainer>
        {isSignedIn ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    );
  }
  