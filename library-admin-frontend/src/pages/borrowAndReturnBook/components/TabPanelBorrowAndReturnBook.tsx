import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { BorrowReturnManager } from './utils/BorrowReturnManager';
import { BorrowForm } from './utils/BorrowFormAdd';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const TabPanelBorrowAndReturnBook = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleAddBorrow = async (borrowData: any) => {
        try {
            const response = await fetch('http://localhost:8000/borrows/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(borrowData),
            });
            if (!response.ok) {
                throw new Error('Failed to add borrow');
            }
            alert('Thêm phiếu mượn thành công!');
            window.location.reload();  // Reload lại trang sau khi thêm thành công
        } catch (error) {
            console.error('Error adding borrow:', error);
            alert('Không thể thêm phiếu mượn!');
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Quản lý phiếu mượn, trả" {...a11yProps(0)} />
                    <Tab label="Tạo phiếu mượn" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <BorrowReturnManager />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <BorrowForm handleAddBorrow={handleAddBorrow} />
            </CustomTabPanel>
        </Box>
    );
};
