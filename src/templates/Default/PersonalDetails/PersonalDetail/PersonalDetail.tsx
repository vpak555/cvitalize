import { Flex, ThemeIcon, Title } from "@mantine/core";
import { Icon } from "@tabler/icons-react";

export default function PersonalDetail({ detail, icon }: { detail: string, icon: Icon }) {
    const Icon = icon;

    return (
        <Flex align='baseline' gap={3}>
            <ThemeIcon size={12}>
                <Icon />
            </ThemeIcon>
            <Title order={6} size={12} weight={500}>
                {detail}
            </Title>
        </Flex>
    );
}