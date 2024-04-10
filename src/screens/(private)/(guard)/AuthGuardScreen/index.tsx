import { Box, HStack, ScrollView, Text } from "@gluestack-ui/themed";
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera";
import { StyleSheet } from 'react-native';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { fetchTotp } from "../../../../service/api/auth";

export default function AuthGuardScreen() {
  return <Container />;
};

const Container = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [otpValue, setOtpValue] = useState('')
  const device = useCameraDevice('back');
  const navigation = useNavigation()

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: async (codes) => {
      const code = codes[0];
      const url = new URL(code.value!);
      const secret = url.searchParams.get('secret');

      // Generate OTP
      const otp = await fetchTotp();
      setOtpValue(otp);
      handleRouteChangeToTotp()

    },
    regionOfInterest: { x: 0.25, y: 0.25, width: 0.5, height: 0.5 },
  });

  function handleRouteChangeToTotp() {
    navigation.navigate('totp', { otp: otpValue });
}

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <Box flex={1} backgroundColor="$white">
      <ScrollView
        style={{ height: '100%' }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {device == null ? (
          <Box>
            <Text>Erro na camera</Text>
          </Box>
        ) : (
          <>
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              codeScanner={codeScanner}
            />
            <Box mb={34} style={StyleSheet.absoluteFill} pointerEvents="none">
              <Box flex={1} backgroundColor="rgba(0, 0, 0, 0.5)" />
              <HStack>
                <Box flex={1} backgroundColor="rgba(0, 0, 0, 0.5)" />
                <Box h={210} w={210} />
                <Box flex={1} backgroundColor="rgba(0, 0, 0, 0.5)" />
              </HStack>
              <Box flex={1} backgroundColor="rgba(0, 0, 0, 0.5)" />
            </Box>
          </>
        )}
        <BoxCodeReader />
      </ScrollView>
    </Box>
  );
};

const BoxCodeReader = () => {
  return (
    <Box alignSelf="center" h={200} width={200} position="absolute" top="35%" zIndex={1}>
      <HStack>
        <Box h={40} width={40} borderTopWidth={8} borderLeftWidth={8} borderColor="$primary400"></Box>
        <Box h={40} width={120} ></Box>
        <Box h={40} width={40} borderTopWidth={8} borderRightWidth={8} borderColor="$primary400"></Box>
      </HStack>
      <HStack>
        <Box h={120} width={40}></Box>
        <Box h={120} width={120} ></Box>
        <Box h={120} width={40}></Box>
      </HStack>
      <HStack>
        <Box h={40} width={40} borderBottomWidth={8} borderLeftWidth={8} borderColor="$primary400"></Box>
        <Box h={40} width={120} ></Box>
        <Box h={40} width={40} borderBottomWidth={8} borderRightWidth={8} borderColor="$primary400"></Box>
      </HStack>
    </Box>
  )
}