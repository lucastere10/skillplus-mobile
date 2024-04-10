import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, StatusBar } from '@gluestack-ui/themed';
import { AuthProvider } from './src/contexts/AuthContext';
import { Routes } from './src/routes';


export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <StatusBar />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </GluestackUIProvider>
  );
}