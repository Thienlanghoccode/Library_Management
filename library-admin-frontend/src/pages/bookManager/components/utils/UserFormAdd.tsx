import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Checkbox, FormControlLabel, Grid } from '@mui/material';

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

// Định nghĩa prop types cho UserFormAdd
interface UserFormAddProps {
    handleAddUser?: (userData: UserCreate) => void; // Biến handleAddUser thành tùy chọn
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user?: UserCreate & { id?: any }; // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleEditUser?: (id: any, userData: UserCreate) => void; // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

const UserFormAdd: React.FC<UserFormAddProps> = ({ handleAddUser, user, handleEditUser }) => {
    const [formData, setFormData] = useState<UserCreate>({
        userName: user?.userName || '',
        userImage: user?.userImage || '',
        userCode: user?.userCode || '',
        userAccountName: user?.userAccountName || '',
        userAccountPassword: user?.userAccountPassword || '',
        userAddress: user?.userAddress || '',
        userRole: user?.userRole || '',
        userActive: user?.userActive || false,
    });

    useEffect(() => {
        if (user) {
            setFormData({
                userName: user.userName,
                userImage: user.userImage || '',
                userCode: user.userCode,
                userAccountName: user.userAccountName,
                userAccountPassword: user.userAccountPassword,
                userAddress: user.userAddress || '',
                userRole: user.userRole || '',
                userActive: user.userActive,
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFormData({
                ...formData,
                userImage: file.name, // Chỉ gửi tên ảnh
            });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user && user.id) {
            handleEditUser?.(user.id, formData); // Cập nhật thông tin người dùng nếu đã có user
        } else {
            handleAddUser?.(formData); // Thêm người dùng mới
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="userName"
                        label="Họ Tên"
                        value={formData.userName}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="outlined" component="label">
                        Chọn ảnh
                        <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                    {formData.userImage && <p>Ảnh chọn: {formData.userImage}</p>}  {/* Hiển thị tên ảnh chọn */}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="userCode"
                        label="Mã Người Dùng"
                        value={formData.userCode}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="userAccountName"
                        label="Email"
                        value={formData.userAccountName}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="userAccountPassword"
                        label="Mật Khẩu"
                        type="password"
                        value={formData.userAccountPassword}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="userAddress"
                        label="Địa Chỉ"
                        value={formData.userAddress}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="userRole"
                        label="Quyền (USER , ADMIN)"
                        value={formData.userRole}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="userActive"
                                checked={formData.userActive}
                                onChange={handleChange}
                            />
                        }
                        label="Hoạt Động"
                    />
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button type="submit" variant="contained" color="primary">
                    {user ? 'Chỉnh sửa' : 'Thêm '}
                </Button>
            </Box>
        </Box>
    );
};

export default UserFormAdd;
