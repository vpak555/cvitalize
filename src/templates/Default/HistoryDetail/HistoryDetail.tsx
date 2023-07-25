import { Flex, Title, Text, ThemeIcon } from "@mantine/core";
import { IconCalendar, IconIdBadge2, IconLocation } from "@tabler/icons-react";
import './HistoryDetail.scss';
import HistoryDetailModel from "../../../models/HistoryDetailModel";

export default function HistoryDetail({ title, institution, startDate, endDate, location, description }: HistoryDetailModel) {
    return (
        <Flex direction='column' gap={5}>
            <Title order={4} size={14} weight={600}>{institution}</Title>
            <Flex gap={10} align='center' wrap='wrap'>
                {title &&
                    <Flex align='baseline' gap={3}>
                        <ThemeIcon size={12}>
                            <IconIdBadge2 />
                        </ThemeIcon>
                        <Title order={6} size={12} weight={500}>{title}</Title>
                    </Flex>
                }
                <Flex align='baseline' gap={3}>
                    <ThemeIcon size={12}>
                        <IconCalendar />
                    </ThemeIcon>
                    <Title order={6} size={12} weight={500}>{startDate} - {endDate}</Title>
                </Flex>
                <Flex align='baseline' gap={3}>
                    <ThemeIcon size={12}>
                        <IconLocation />
                    </ThemeIcon>
                    <Title order={6} size={12} weight={500}>
                        {location}
                    </Title>
                </Flex>
            </Flex>
            <Text size={12}>
                {description}
            </Text>
        </Flex>
    );
}