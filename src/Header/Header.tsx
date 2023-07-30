import { Header as MantineHeader, Title, Flex } from '@mantine/core';
import ColorSchemeSwitcher from '../ColorSchemeSwitcher/ColorSchemeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import DownloadPDF from '../DownloadPDF/DownloadPDF';
import './Header.scss';


export default function Header() {

    return (
        <MantineHeader height={56} mb={36} display='flex' className='header'>
            <Flex justify='space-between' mx={48} className='container'>
                <Flex align='center'>
                    <Title>CVitalize</Title>
                </Flex>
                <Flex align='center' gap={20}>
                    <DownloadPDF />
                    <LanguageSwitcher />
                    <ColorSchemeSwitcher />
                </Flex>
            </Flex>

        </MantineHeader>
    );
}