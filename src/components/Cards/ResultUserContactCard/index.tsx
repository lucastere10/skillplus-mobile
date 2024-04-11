import React from "react";
import {
    HStack, Link, Icon, LinkText} from "@gluestack-ui/themed";
import { Github, Instagram, Linkedin, Mail, Rss, Globe, Facebook } from "lucide-react-native";

const IconMap = {
    INSTAGRAM: Instagram,
    EMAIL: Mail,
    GITHUB: Github,
    BLOG: Rss,
    WEBSITE: Globe,
    LINKEDIN: Linkedin,
    FACEBOOK: Facebook
};

export function ResultUserContactCard({ contact }: Readonly<{ contact: Contato }>) {
    const IconComponent = IconMap[contact.contatoTipo];

    return (
        <HStack key={contact.contatoId} justifyContent="space-between">
            <HStack gap={16}>
                <Icon color="$blue500" size="xl" as={IconComponent} />
                <Link href={contact.contatoUrl}>
                    <LinkText color="$black" textDecorationLine="none" size="lg">{contact.contatoNome}</LinkText>
                </Link>
            </HStack>
        </HStack>
    );
}