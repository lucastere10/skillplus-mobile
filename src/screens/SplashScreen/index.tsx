import { Text, Box, Spinner } from "@gluestack-ui/themed";

export default function SplashScreen() {
    return (
        <Box flex={1} h={"$full"} alignItems="center" justifyContent="center" backgroundColor="$white" pt={12} gap={16}>
            <Spinner size="large" />
            <Text>Carregando...</Text>
        </Box>
    )
}