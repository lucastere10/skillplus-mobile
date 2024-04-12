import React, { useState } from "react";
import { Icon, View, Text, ImageBackground, Image } from "@gluestack-ui/themed";
import { Nfc } from "lucide-react-native";

const circleSize = 250;
export default function SocialCardTypeOne({ card }: { card: Cartao }) {
    const [imageUri, setImageUri] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg/800px-Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg.png');
    return (
        <View borderRadius={12} width={360} backgroundColor="$blueGray500">
            <ImageBackground
                p={24} pt={20}
                borderRadius={12}
                source={{ uri: card.cartaoBackground }}
                style={{ flex: 1, justifyContent: "center" }}
            >
                <View flexDirection="row" justifyContent="space-between">
                    <View flexDirection="column" justifyContent="center">
                        <Text color="$white" fontFamily={"Courier"} fontSize={16} letterSpacing={0.53} >Nome</Text>
                        <Text color="$white" fontFamily={"Courier"} fontSize={16} letterSpacing={0.53}>{card.cartaoNome}</Text>
                    </View>
                    <View>
                        <Image
                            backgroundColor="$white"
                            w={60}
                            h={60}
                            source={{ uri: imageUri }}
                            alt={imageUri}
                        />
                    </View>
                </View>
                <View flexDirection="row" justifyContent="space-between">
                    <View flexDirection="column" justifyContent="center">
                        <Text color="$white" fontFamily={"Courier"} fontSize={16} letterSpacing={0.53}>Cartão</Text>
                        <Text color="$white" fontFamily={"Courier"} fontSize={16} letterSpacing={0.53}>{card.cartaoNome}</Text>
                    </View>
                    <View justifyContent="center" alignItems="center">
                        <Icon color="white" size="xl" as={Nfc}></Icon>
                    </View>
                </View>
                <View mt={8} flexDirection="row" justifyContent="space-between">
                    <View flexDirection="column" justifyContent="center">
                        <Text color="$white" fontFamily={"Courier"} fontSize={16} letterSpacing={0.53}>Tipo</Text>
                        <Text color="$white" fontFamily={"Courier"} fontSize={16} letterSpacing={0.53}>{card.cartaoUsuarioTipo}</Text>
                    </View>
                    <View flexDirection="column" justifyContent="center">
                        <Text color="$white" fontFamily={"Courier"} fontSize={16} letterSpacing={0.53}>Status</Text>
                        <Text color="$white" fontFamily={"Courier"} fontSize={16} letterSpacing={0.53}>{card.ativo ? ("Ativo") : ("Inativo")}</Text>
                    </View>
                    <View flexDirection="column" justifyContent="center">
                        <Text color="$white" fontFamily={"Courier"} fontSize={16} letterSpacing={0.53}>CVV</Text>
                        <Text color="$white" fontFamily={"Courier"} fontSize={16} letterSpacing={0.53}>...</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
