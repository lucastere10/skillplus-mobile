import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { AuthProvider } from './src/contexts/AuthContext';
import { Routes } from './src/routes';
import { StatusBar, setStatusBarBackgroundColor } from 'expo-status-bar';
import { StateChangeProvider } from './src/contexts/stateChangeContext';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <StatusBar  backgroundColor="#1565C0"/>
      <AuthProvider>
        <StateChangeProvider>
          <Routes />
        </StateChangeProvider>
      </AuthProvider>
    </GluestackUIProvider>
  );
}