import * as React from 'react';
import { Box, Tabs, Tab, CircularProgress, Snackbar, Button, IconButton } from '@mui/material';
import PublisherModel from '../../../../models/PublisherModel'; // Import model Publisher
import { PublisherFormAdd } from '../utils/PublisherFormAdd';
import { PublisherTable } from '../utils/PublisherTable';
import { GridCloseIcon } from '@mui/x-data-grid';

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

export const TabPublisher = () => {
    const [value, setValue] = React.useState(0);
    const [publishers, setPublishers] = React.useState<PublisherModel[]>([]);
    const [isLoadingAuthors, setIsLoadingAuthors] = React.useState(true);
    const [trigger, setTrigger] = React.useState(false);

    const [publisher, setPublisher] = React.useState<PublisherModel | null>(null);

    // Handle tab change
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleTrigger = () => {
        setTrigger(!trigger);
    };

    const handleClick = (id: number, name: string) => {
        setMessage({ id, name });
        setOpen(true);
    };

    // Handle edit publisher data
    const handleEditPublisher = (id: number, publisherData: PublisherModel) => {
        const fetchEditPublisher = async () => {
            const baseUrl: string = `http://localhost:8000/publishers/${id}`;
            const response = await fetch(baseUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(publisherData),
            });

            if (!response.ok) {
                console.log('Something went wrong!');
                handleClick(0, 'Sửa nhà xuất bản thất bại');
                return;
            }

            handleClick(1, 'Sửa nhà xuất bản thành công');
            handleTrigger();
        };

        fetchEditPublisher().catch((error) => {
            console.log(error);
            handleClick(0, 'Sửa nhà xuất bản thất bại');
        });
    };

    // Handle delete publisher
    const handleDeletePublisher = (id: number) => {
        setIsLoadingAuthors(true);
        const fetchDeletePublisher = async () => {
            const baseUrl: string = `http://localhost:8000/publishers/${id}`;
            const response = await fetch(baseUrl, {
                method: 'DELETE',
            });

            if (!response.ok) {
                console.log('Something went wrong!');
                handleClick(0, 'Xóa nhà xuất bản thất bại');
                return;
            }

            handleClick(1, 'Xóa nhà xuất bản thành công');
            handleTrigger();
        };

        fetchDeletePublisher().catch((error) => {
            console.log(error);
            handleClick(0, 'Xóa nhà xuất bản thất bại');
        });
    };

    // Handle add new publisher
    const handleAddPublisher = (publisherData: PublisherModel) => {
        const fetchAddPublisher = async () => {
            const baseUrl: string = `http://localhost:8000/publishers`;
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(publisherData),
            });

            if (!response.ok) {
                console.log('Something went wrong!');
                handleClick(0, 'Thêm nhà xuất bản thất bại');
                return;
            }

            handleClick(1, 'Thêm nhà xuất bản thành công');
            handleTrigger();
        };

        fetchAddPublisher().catch((error) => {
            console.log(error);
            handleClick(0, 'Thêm nhà xuất bản thất bại');
        });
    };

    const openPublisherEdit = (event: React.SyntheticEvent, id: number) => {
        const fetchBookById = async () => {
            const baseUrl: string = `http://localhost:8000/publishers/${id}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const responseData = responseJson.result;
            console.log(responseData);

            const loadedBook: PublisherModel = {
                id: responseData.id,
                name: responseData.name,
                address: responseData.address,
                phoneNumber: responseData.phoneNumber,
            };
            console.log(loadedBook);
            setPublisher(loadedBook);
            handleChange(event, 2);
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchBookById().catch((error: any) => {
            console.log(error.message);
        });
    };

    // Fetch publishers
    React.useEffect(() => {
        const fetchPublishers = async () => {
            const baseUrl: string = `http://localhost:8000/publishers`;
            const response = await fetch(baseUrl);

            if (!response.ok) {
                console.log('Something went wrong!');
                setIsLoadingAuthors(false);
                return;
            }

            const responseJson = await response.json();
            const responseData = responseJson.result;
            const loadedPublishers: PublisherModel[] = [];
            for (const key in responseData) {
                loadedPublishers.push({
                    id: responseData[key].id,
                    name: responseData[key].name,
                    phoneNumber: responseData[key].phoneNumber,
                    address: responseData[key].address,
                });
            }

            setPublishers(loadedPublishers);
            setIsLoadingAuthors(false);
        };

        fetchPublishers().catch((error) => {
            console.log(error.message);
            setIsLoadingAuthors(false);
        });
    }, [trigger]);

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState({ id: 0, name: '' });

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose} sx={{ color: 'white' }}>
                UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <GridCloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Bảng NXB" {...a11yProps(0)} />
                    <Tab label="Thêm mới NXB" {...a11yProps(1)} />
                    <Tab label="Sửa thông tin NXB" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Box sx={{ display: 'flex' }}>
                    {isLoadingAuthors && (
                        <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress color="secondary" />
                        </Box>
                    )}
                    {!isLoadingAuthors && publishers && (
                        <Box sx={{ width: '95%' }}>
                            <PublisherTable
                                openPublisherEdit={openPublisherEdit}
                                publishers={publishers}
                                handleDeletePublishers={handleDeletePublisher}
                            />
                        </Box>
                    )}
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <PublisherFormAdd handleAddPublisher={handleAddPublisher} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                {publishers && <PublisherFormAdd publisher={publisher} handleEditPublisher={handleEditPublisher} />}
            </CustomTabPanel>
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={message.name}
                    action={action}
                    ContentProps={{
                        style: {
                            backgroundColor: message.id === 1 ? 'green' : 'red',
                            color: 'white',
                        },
                    }}
                />
            </div>
        </Box>
    );
};
