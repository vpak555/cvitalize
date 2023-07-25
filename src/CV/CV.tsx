import { MantineProvider, Paper } from '@mantine/core';
import Default from '../templates/Default/Default';


export default function CV() {

    return (
        <MantineProvider>
            <Paper withBorder id='cv'>
                <Default />
            </Paper>
        </MantineProvider>
    );
}