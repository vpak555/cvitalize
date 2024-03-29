import { useMantineColorScheme, SegmentedControl, Group, Center } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export default function ColorSchemeSwitcher() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center" my="xl">
      <SegmentedControl
        value={colorScheme}
        onChange={(value: 'light' | 'dark') => toggleColorScheme(value)}
        data={[
          {
            value: 'light',
            label: (
              <Center>
                <IconSun size="1rem" stroke={1.5} />
              </Center>
            ),
          },
          {
            value: 'dark',
            label: (
              <Center>
                <IconMoon size="1rem" stroke={1.5} />
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
}