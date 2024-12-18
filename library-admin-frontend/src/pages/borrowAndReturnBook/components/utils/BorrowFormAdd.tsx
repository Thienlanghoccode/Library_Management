import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

interface BorrowFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleAddBorrow?: (borrowData: any) => void;  // Hàm thêm mới phiếu mượn
}

export const BorrowForm: React.FC<BorrowFormProps> = ({ handleAddBorrow }) => {
    const [date, setDate] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [userAccountName, setUserAccountName] = useState<string>('');
    const [userAccountPassword, setUserAccountPassword] = useState<string>('');
    const [bookId, setBookId] = useState<number>(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [books, setBooks] = useState<any[]>([]);  // Danh sách sách

    // Thiết lập ngày mặc định là ngày hiện tại
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
        setDueDate(today);
    }, []);

    // Lấy danh sách sách từ API
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:8000/books');
                const result = await response.json();
                setBooks(result.result.content);  // Cập nhật danh sách sách từ `content`
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleSubmit = () => {
        // Tạo đối tượng dữ liệu phiếu mượn
        const borrowData = {
            date: date ? new Date(date).toISOString() : '',
            dueDate: dueDate ? new Date(dueDate).toISOString() : '',
            userAccountName,
            userAccountPassword,
            bookId,
        };

        // Gọi hàm thêm mới phiếu mượn
        if (handleAddBorrow) {
            handleAddBorrow(borrowData);
        }

        // Reset state sau khi thêm mới
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
        setDueDate(today);
        setUserAccountName('');
        setUserAccountPassword('');
        setBookId(0);
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '50ch' },
                display: 'flex',
                flexDirection: 'column', // Sắp xếp theo chiều dọc
                justifyContent: 'center',
                alignItems: 'center',
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="date"
                label="Ngày mượn"
                variant="outlined"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    inputProps: { min: new Date().toISOString().split('T')[0] }, // Ngày tối thiểu là ngày hiện tại
                }}
            />
            <TextField
                id="dueDate"
                label="Ngày hẹn trả"
                variant="outlined"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    inputProps: { min: new Date().toISOString().split('T')[0] }, // Ngày tối thiểu là ngày hiện tại
                }}
            />
            <TextField
                id="userAccountName"
                label="Tên tài khoản người mượn"
                variant="outlined"
                value={userAccountName}
                onChange={(e) => setUserAccountName(e.target.value)}
            />
            <TextField
                id="userAccountPassword"
                label="Mật khẩu tài khoản"
                variant="outlined"
                type="password"
                value={userAccountPassword}
                onChange={(e) => setUserAccountPassword(e.target.value)}
            />
            <FormControl variant="outlined" sx={{ m: 1, width: '50ch' }}>
                <InputLabel id="select-book-label">Chọn sách</InputLabel>
                <Select
                    labelId="select-book-label"
                    id="bookId"
                    value={bookId}
                    onChange={(e) => setBookId(Number(e.target.value))}
                    label="Chọn sách"
                >
                    {books.map((book) => (
                        <MenuItem key={book.id} value={book.id}>
                            {book.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Thêm phiếu mượn
            </Button>
        </Box>
    );
};
    