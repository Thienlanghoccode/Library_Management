import * as React from 'react';
import { Box, Tabs, Tab, CircularProgress, Snackbar, Button, IconButton } from '@mui/material';
import GridCloseIcon from '@mui/icons-material/Close';
import { UserTable } from '../utils/UserTable';
import UserFormAdd from '../utils/UserFormAdd';

// Định nghĩa giao diện User
interface User {
    id: number;
    userName: string;
    userImage: string;
    userPhoneNumber: string;
    userAddress: string;
    userAccountName: string;
    userRole: string;
    userCode: string;
    userMoney: string;
}

// Định nghĩa giao diện UserCreate để tạo người dùng mới
interface UserCreate {
    userName: string;
    userImage?: string;
    userCode: string;
    userAccountName: string;
    userAccountPassword: string;
    userAddress?: string;
    userRole?: string;
    userActive: boolean;
}

// Định nghĩa component TabPanel để hiển thị các tab
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

const TabUser: React.FC = () => {
    const [value, setValue] = React.useState(0);
    const [users, setUsers] = React.useState<User[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = React.useState(true);
    const [trigger, setTrigger] = React.useState(false);
    const [user, setUser] = React.useState<UserCreate | null>(null);

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

    // Xử lý chỉnh sửa dữ liệu người dùng
    const handleEditUser = (id: number, userData: UserCreate) => {
        const fetchEditUser = async () => {
            const baseUrl = `http://localhost:8000/user/${id}`;
            const response = await fetch(baseUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                console.log('Something went wrong!');
                handleClick(0, 'Sửa người dùng thất bại');
                return;
            }

            handleClick(1, 'Sửa người dùng thành công');
            handleTrigger();
        };

        fetchEditUser().catch((error) => {
            console.log(error);
            handleClick(0, 'Sửa người dùng thất bại');
        });
    };

    // Xử lý xóa người dùng
    const handleDeleteUser = (id: number) => {
        setIsLoadingUsers(true);
        const fetchDeleteUser = async () => {
            const baseUrl = `http://localhost:8000/user/${id}`;
            const response = await fetch(baseUrl, {
                method: 'DELETE',
            });

            if (!response.ok) {
                console.log('Something went wrong!');
                handleClick(0, 'Xóa người dùng thất bại');
                return;
            }

            handleClick(1, 'Xóa người dùng thành công');
            handleTrigger();
        };

        fetchDeleteUser().catch((error) => {
            console.log(error);
            handleClick(0, 'Xóa người dùng thất bại');
        });
    };

    // Xử lý thêm người dùng mới
    const handleAddUser = (userData: UserCreate) => {
        const fetchAddUser = async () => {
            const baseUrl = `http://localhost:8000/user`;
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                console.log('Something went wrong!');
                handleClick(0, 'Thêm người dùng thất bại');
                return;
            }

            handleClick(1, 'Thêm người dùng thành công');
            handleTrigger();
        };

        fetchAddUser().catch((error) => {
            console.log(error);
            handleClick(0, 'Thêm người dùng thất bại');
        });
    };

    const openUserEdit = (event: React.SyntheticEvent, id: number) => {
        const fetchUserById = async () => {
            const baseUrl = `http://localhost:8000/user/${id}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const responseData = responseJson.result;

            const loadedUser: UserCreate = {
                userName: responseData.userName,
                userImage: responseData.userImage,
                userCode: responseData.userCode,
                userAccountName: responseData.userAccountName,
                userAccountPassword: '', // Password thường không được trả về từ server
                userAddress: responseData.userAddress,
                userRole: responseData.userRole,
                userActive: responseData.userActive,
            };
            setUser(loadedUser);
            handleChange(event, 2);
        };
        fetchUserById().catch((error) => {
            console.log(error.message);
        });
    };

    // Lấy danh sách người dùng
    React.useEffect(() => {
        const fetchUsers = async () => {
            const baseUrl = `http://localhost:8000/user/all`;
            const response = await fetch(baseUrl);

            if (!response.ok) {
                console.log('Something went wrong!');
                setIsLoadingUsers(false);
                return;
            }

            const responseJson = await response.json();
            setUsers(responseJson);
            setIsLoadingUsers(false);
        };

        fetchUsers().catch((error) => {
            console.log(error.message);
            setIsLoadingUsers(false);
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
                    <Tab label="Danh sách người mượn" {...a11yProps(0)} />
                    <Tab label="Thêm người" {...a11yProps(1)} />
                    <Tab label="Chỉnh sửa" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Box sx={{ display: 'flex' }}>
                    {isLoadingUsers && (
                        <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress color="secondary" />
                        </Box>
                    )}
                    {!isLoadingUsers && users && (
                        <Box sx={{ width: '95%' }}>
                            <UserTable users={users} handleDeleteUser={handleDeleteUser} openUserEdit={openUserEdit} />
                        </Box>
                    )}
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <UserFormAdd handleAddUser={handleAddUser} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                {user && <UserFormAdd user={user} handleEditUser={handleEditUser} />}
            </CustomTabPanel>
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
        </Box>
    );
};

export default TabUser;
