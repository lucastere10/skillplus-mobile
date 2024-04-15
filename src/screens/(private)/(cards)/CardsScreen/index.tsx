import { Box, ScrollView, View } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { useStateChange } from "../../../../contexts/stateChangeContext";
import { fetchUserCards } from "../../../../service/api/cards";
import { AddCardDialog } from "../../../../components/Dialogs/AddCardDialog";
import { ChangeCardDialog } from "../../../../components/Dialogs/ChangeCardDialog";

export default function CardsScreen() {
    const [cards, setCards] = useState<Cartao[]>([]);
    const { stateChanged } = useStateChange();

    useEffect(() => {
        handleUserCards();
    }, [stateChanged]);

    async function handleUserCards() {
        try {
            const data = await fetchUserCards();
            setCards(data.content)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box>
            <ScrollView
                style={{ height: '100%' }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View backgroundColor={'$primary600'} h={48} mb={24}></View>
                <View gap={16} padding={16} justifyContent="center" alignItems="center">
                    <AddCardDialog />
                    {cards.map((card) => (
                        <ChangeCardDialog key={card.cartaoId} card={card} />
                    ))}
                </View>
            </ScrollView>
        </Box>
    );
};




