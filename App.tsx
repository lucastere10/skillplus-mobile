import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { AuthProvider } from './src/contexts/AuthContext';
import { Routes } from './src/routes';
import { StatusBar } from 'expo-status-bar';
import { StateChangeProvider } from './src/contexts/stateChangeContext';


export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <StatusBar />
      <AuthProvider>
        <StateChangeProvider>
          <Routes />
        </StateChangeProvider>
      </AuthProvider>
    </GluestackUIProvider>
  );
}