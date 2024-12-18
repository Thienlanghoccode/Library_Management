import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { AuthorTable } from '../utils/AuthorTable';
import AuthorModel from '../../../../models/AuthorModel';
import { Button, CircularProgress, IconButton, Snackbar } from '@mui/material';
import { AuthorChart } from '../utils/AuthorChart';
import { GridCloseIcon } from '@mui/x-data-grid';
import { AuthorFormAdd } from '../utils/AuthorFormAdd';

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

export const TabAuthor = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [authors, setAuthors] = React.useState<AuthorModel[]>([]);
    const [isLoadingAuthors, setIsLoadingAuthors] = React.useState(true);
    const [trigger, setTrigger] = React.useState(false);

    const handleTrigger = () => {
        setTrigger(!trigger);
    };

    const [author, setAuthor] = React.useState<AuthorModel | null>(null);

    React.useEffect(() => {
        const fetchAuthors = async () => {
            const baseUrl: string = `http://localhost:8000/authors`;
            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson.result;
            const loadedAuthors: AuthorModel[] = [];
            for (const key in responseData) {
                loadedAuthors.push({
                    id: responseData[key].id,
                    name: responseData[key].name,
                    totalBook: responseData[key].totalBook,
                    image: responseData[key].image,
                    dateOfBirth: responseData[key].dateOfBirth,
                });
            }

            setAuthors(loadedAuthors);
            setIsLoadingAuthors(false);
        };
        fetchAuthors().catch((error) => {
            console.log(error.message);
            setIsLoadingAuthors(false);
        });
    }, [trigger]);

    const handleDeleteAuthor = (authorId: number) => {
        setIsLoadingAuthors(true);
        const fetchDeleteAuthor = async () => {
            const baseUrl: string = `http://localhost:8000/authors/${authorId}`;

            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await fetch(baseUrl, options);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== authorId));
            setIsLoadingAuthors(false);
            handleClick(1, 'Xóa tác giả thành công');
        };
        fetchDeleteAuthor().catch((error) => {
            setIsLoadingAuthors(false);
            handleClick(0, 'Xóa tác giả không thành công');
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    const handleAddAuthor = (authorData: AuthorModel) => {
        const fetchAddAuthor = async () => {
            const baseUrl: string = `http://localhost:8000/authors`;
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(authorData),
            });
            if (!response.ok) {
                console.log('Something went wrong!');
                handleClick(0, 'Thêm tác giả thất bại');
                return;
            }
            handleClick(1, 'Thêm tác giả thành công');
            handleTrigger();
        };
        fetchAddAuthor().catch(() => {
            handleClick(0, 'Thêm tác giả thất bại');
        });
    };

    const handleEditAuthor = (id: number, authorData: AuthorModel) => {
        const fetchEditAuthor = async () => {
            const baseUrl: string = `http://localhost:8000/authors/${id}`;

            const response = await fetch(baseUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(authorData),
            });
            if (!response.ok) {
                console.log('Something went wrong!');
                handleClick(0, 'Sửa tác giả thất bại');
                return;
            }
            handleClick(1, 'Sửa tác giả thành công');
            handleTrigger();
        };
        fetchEditAuthor().catch((error) => {
            console.log(error);
            handleClick(0, 'Sửa tác giả thất bại');
        });
    };

    const openAuthorEdit = (event: React.SyntheticEvent, id: number) => {
        const fetchBookById = async () => {
            const baseUrl: string = `http://localhost:8000/authors/${id}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const responseData = responseJson.result;
            console.log(responseData);

            const loadedBook: AuthorModel = {
                id: responseData.id,
                name: responseData.name,
                description: responseData.description,
                totalBook: responseData.totalBook,
                dateOfBirth: responseData.dateOfBirth,
            };
            console.log(loadedBook);
            setAuthor(loadedBook);
            handleChange(event, 2);
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchBookById().catch((error: any) => {
            console.log(error.message);
        });
    };

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState({ id: 0, name: '' });

    const handleClick = (id: number, name: string) => {
        setMessage({ id, name });
        setOpen(true);
    };

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
                    <Tab label="Bảng tác giả" {...a11yProps(0)} />
                    <Tab label="Thêm tác giả" {...a11yProps(1)} />
                    <Tab label="Sửa tác giả" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Box sx={{ display: 'flex' }}>
                    {isLoadingAuthors && (
                        <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress color="secondary" />
                        </Box>
                    )}
                    {!isLoadingAuthors && authors && (
                        <Box sx={{ width: '95%' }}>
                            <AuthorTable
                                openAuthorEdit={openAuthorEdit}
                                authors={authors}
                                handleDeleteAuthors={handleDeleteAuthor}
                            />
                        </Box>
                    )}
                    {!isLoadingAuthors && authors && (
                        <Box sx={{ width: '35%' }}>
                            <AuthorChart
                                authors={authors.filter((author) => author.totalBook !== undefined && author.totalBook > 0)}
                            />
                        </Box>
                    )}
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <AuthorFormAdd handleAddAuthor={handleAddAuthor} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                {author && <AuthorFormAdd author={author} handleEditAuthor={handleEditAuthor} />}
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
