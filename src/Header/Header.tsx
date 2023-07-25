import { Header as MantineHeader, Title, Flex } from '@mantine/core';
import ColorSchemeSwitcher from '../ColorSchemeSwitcher/ColorSchemeSwitcher';



export default function Header() {

    return (
        <MantineHeader height={56} mb={36} display='flex'>
            <Flex justify='space-between' mx={48} className='container'>
                <Flex align='center'>
                    <Title size={28}>CVitalize</Title>
                </Flex>
                <Flex align='center'>
                    <ColorSchemeSwitcher />
                </Flex>
            </Flex>

        </MantineHeader>
    );
}