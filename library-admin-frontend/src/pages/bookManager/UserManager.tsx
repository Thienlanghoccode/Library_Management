import { Box } from '@mui/material';
import PrimarySearchAppBar from '../../layouts/header/Header';
import { Footer } from '../../layouts/footer/Footer';

import TabUser from './components/tabchildren/tabUser';

export const UserManager = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <PrimarySearchAppBar />
            <Box
                component="main"
                sx={{
                    flexGrow: 2,
                    py: 3,
                }}
            >
                <TabUser />
            </Box>
            <Footer />
        </Box>
    );
};
