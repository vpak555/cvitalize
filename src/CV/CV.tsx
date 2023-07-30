import { MantineProvider, Paper } from '@mantine/core';
import Default from '../templates/Default/Default';
import './CV.scss';

export default function CV() {

    return (
        <MantineProvider theme={{ fontFamily: 'Montserrat', primaryColor: 'teal' }}>
            <Paper withBorder id='cv' className='paper'>
                <Default />
            </Paper>
        </MantineProvider>
    );
}