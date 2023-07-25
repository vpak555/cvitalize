import { Flex, Title, useMantineTheme } from "@mantine/core";
import SectionModel from "../../../models/SectionModel";

export default function Section({ title, children }: SectionModel) {
    const { primaryColor } = useMantineTheme();
    return (
        <Flex direction={'column'} gap={10}>
            <Title order={3} size={18} color={primaryColor}>{title}</Title>
            {children}
        </Flex>
    );
}