import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import CategoryModel from '../../../../models/CategoryModel';

interface CategoryFormAddProps {
    handleAddCategory?: (categoryName: string) => void;
    handleEditCategory?: (categoryId: number, categoryName: string) => void;
    category?: CategoryModel;
}

export const CategoryFormAdd: React.FC<CategoryFormAddProps> = ({ handleAddCategory, handleEditCategory, category }) => {
    const [categoryName, setCategoryName] = useState<string>('');

    useEffect(() => {
        if (category) {
            setCategoryName(category.name);
        }
    }, [category]);

    const handleSubmit = () => {
        if (category?.id && handleEditCategory) {
            handleEditCategory(category.id, categoryName);
        } else if (handleAddCategory) {
            handleAddCategory(categoryName);
        }
        if (!category?.id) {
            setCategoryName('');
        }
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '50ch' },
                display: 'flex',
                flexDirection: 'column', // Xếp theo chiều dọc
                justifyContent: 'center',
                alignItems: 'center',
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-basic"
                label="Tên danh mục"
                variant="outlined"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
            />
            <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </Box>
    );
};
