import { useMantineTheme, ColorSwatch, Group } from "@mantine/core";

export default function ColorPalette() {
    const theme = useMantineTheme();
    const swatches = Object.keys(theme.colors).map((color) => (
        <ColorSwatch key={color} color={theme.colors[color][6]} onClick={() => console.log(color)} />
    ));
    
    return (
        <Group position="center" spacing="xs">
            {swatches}
        </Group>
    );
}