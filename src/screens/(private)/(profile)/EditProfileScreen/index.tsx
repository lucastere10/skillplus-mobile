import React from "react";
import { Box, ScrollView, View } from "@gluestack-ui/themed";

export default function EditProfileScreen() {

    return (
        <Box>
            <ScrollView
                style={{ height: '100%' }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
            <View backgroundColor={'$primary600'} h={48}></View>
            </ScrollView>
        </Box>
    );
};