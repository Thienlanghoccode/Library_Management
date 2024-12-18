import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import AuthorModel from '../../../../models/AuthorModel';

interface AuthorFormAddProps {
    handleAddAuthor?: (authorData: AuthorModel) => void;  // Chuyển sang AuthorModel
    handleEditAuthor?: (authorId: number, authorData: AuthorModel) => void;  // Chuyển sang AuthorModel
    author?: AuthorModel;  // Đảm bảo author là AuthorModel
}

export const AuthorFormAdd: React.FC<AuthorFormAddProps> = ({ handleAddAuthor, handleEditAuthor, author }) => {
    const [authorName, setAuthorName] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);  // Lưu trữ tệp ảnh
    const [totalBook, setTotalBook] = useState<number>(0);

    // Khi props author thay đổi, cập nhật state
    useEffect(() => {
        if (author) {
            setAuthorName(author.name);
            setDateOfBirth(author.dateOfBirth || ''); // Đảm bảo ngày sinh hợp lệ
            setDescription(author.description || '');
            setImage(null); // Reset ảnh khi chỉnh sửa
            setTotalBook(author.totalBook || 0);
        }
    }, [author]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file); 
        }
    };

    const handleSubmit = () => {
        // Tạo đối tượng dữ liệu theo kiểu AuthorModel
        const authorData: AuthorModel = {
            id: author?.id || 0, // Nếu có id thì gửi id, nếu không sẽ là 0 (để thêm mới)
            name: authorName,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString().split('T')[0] : '', // Chuyển ngày thành string
            description: description,
            image: image ? image.name : '', // Chỉ gửi tên ảnh
            totalBook: totalBook,
        };

        // Nếu có ID của tác giả thì gọi hàm chỉnh sửa
        if (author?.id && handleEditAuthor) {
            handleEditAuthor(author.id, authorData); // Chỉnh sửa tác giả
        } else if (handleAddAuthor) {
            handleAddAuthor(authorData); // Thêm mới tác giả
        }

        // Reset state nếu là tác giả mới
        if (!author?.id) {
            setAuthorName('');
            setDateOfBirth('');
            setDescription('');
            setImage(null);  // Reset ảnh sau khi gửi
            setTotalBook(0);
        }
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
                id="outlined-basic"
                label="Tên tác giả"
                variant="outlined"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
            />
            <TextField
                id="outlined-date-of-birth"
                label="Ngày sinh"
                variant="outlined"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="outlined-description"
                label="Mô tả"
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            
            {/* Input để chọn tệp ảnh */}
            <Button variant="outlined" component="label">
                Chọn ảnh
                <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                />
            </Button>
            {image && <p>Ảnh chọn: {image.name}</p>}  {/* Hiển thị tên ảnh chọn */}

            <TextField
                id="outlined-total-book"
                label="Số sách đã viết"
                variant="outlined"
                type="number"
                value={totalBook}
                onChange={(e) => setTotalBook(Number(e.target.value))}
            />
            <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                {author ? 'Cập nhật tác giả' : 'Thêm tác giả'}
            </Button>
        </Box>
    );
};
