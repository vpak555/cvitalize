import { SegmentedControl, Group, Center, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = async (language: string) => {
        await i18n.changeLanguage(language);
    }
    return (
        <Group position="center" my="xl">
            <SegmentedControl
                value={i18n.language}
                onChange={(value: 'ru' | 'en') => toggleLanguage(value)}
                data={[
                    {
                        value: 'ru',
                        label: (
                            <Center>
                                <Text size='xs'>ru</Text>
                            </Center>
                        ),
                    },
                    {
                        value: 'en',
                        label: (
                            <Center>
                                <Text size='xs'>en</Text>
                            </Center>
                        ),
                    },
                ]}
            />
        </Group>
    );
}