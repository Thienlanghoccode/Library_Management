import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import { Tooltip, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BorrowTable: React.FC<{ borrows: any[] }> = ({ borrows }) => {
    const formatDate = (date: string): string => {
        if (!date) return 'Không xác định';
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };

    const initialRows: GridRowsProp = borrows.map((borrow) => ({
        id: borrow.id,
        user: borrow.user?.user_account_name || 'Không xác định',
        book: borrow.book?.name || 'Không xác định',
        due_date: formatDate(borrow.due_date),
    }));

    const [rows] = useState(initialRows);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedBorrow, setSelectedBorrow] = useState<any | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [returnDialogOpen, setReturnDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusReturn, setStatusReturn] = useState('');

    const fetchBorrowDetails = async (id: number) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/borrows/search/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch borrow details');
            }
            const data = await response.json();
            const borrowDetails = data.result[0]; // Lấy thông tin đầu tiên từ mảng result
            setSelectedBorrow(borrowDetails);
            setDialogOpen(true);
        } catch (error) {
            console.error('Error fetching borrow details:', error);
            alert('Không thể tải dữ liệu chi tiết phiếu mượn!');
        } finally {
            setLoading(false);
        }
    };

    const handleReturnBook = async (id: number) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/returnBook`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    borrowingFormId: id,
                    statusReturn: statusReturn,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to return book');
            }
            alert('Trả sách thành công!');
            setReturnDialogOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Error returning book:', error);
            alert('Không thể trả sách!');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenReturnDialog = (id: number) => {
        setSelectedBorrow({ borrowingFormId: id });
        setReturnDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedBorrow(null);
    };

    const handleCloseReturnDialog = () => {
        setReturnDialogOpen(false);
        setSelectedBorrow(null);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'user',
            headerName: 'Người mượn',
            type: 'string',
            width: 150,
        },
        {
            field: 'book',
            headerName: 'Tên sách',
            type: 'string',
            width: 180,
        },
        {
            field: 'due_date',
            headerName: 'Ngày hẹn trả',
            width: 150,
            type: 'string',
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Thao tác',
            width: 150,
            getActions: ({ id }) => [
                <GridActionsCellItem
                    icon={
                        <Tooltip title="Chi tiết phiếu mượn" arrow>
                            <BallotOutlinedIcon />
                        </Tooltip>
                    }
                    label="View"
                    onClick={() => fetchBorrowDetails(id as number)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={
                        <Tooltip title="Trả Sách" arrow>
                            <AssignmentTurnedInOutlinedIcon />
                        </Tooltip>
                    }
                    label="Return"
                    onClick={() => handleOpenReturnDialog(id as number)}
                    color="inherit"
                />,
            ],
        },
    ];

    return (
        <Box
            sx={{
                height: 500,
                width: '50%',
                '& .actions': {
                    color: 'text.secondary',
                },
            }}
        >
            <Typography variant="h5" sx={{ marginBottom: '10px' }}>
                Bảng Phiếu Mượn
            </Typography>

            <DataGrid rows={rows} columns={columns} />

            <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>
                    Chi Tiết Phiếu Mượn
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                            <CircularProgress />
                        </Box>
                    ) : selectedBorrow ? (
                        <Box>
                            <Typography><strong>ID:</strong> {selectedBorrow.borrowingFormId}</Typography>
                            <Typography><strong>Ngày mượn:</strong> {formatDate(selectedBorrow.borrowingFormDate)}</Typography>
                            <Typography><strong>Loại:</strong> {selectedBorrow.borrowingFormType}</Typography>
                            <Typography><strong>Đặt cọc:</strong> {selectedBorrow.borrowingFormDeposit} VND</Typography>
                            <Typography><strong>Ngày hẹn trả:</strong> {formatDate(selectedBorrow.borrowingFormDueDate)}</Typography>
                        </Box>
                    ) : (
                        <Typography>Không có dữ liệu!</Typography>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={returnDialogOpen} onClose={handleCloseReturnDialog} fullWidth maxWidth="sm">
                <DialogTitle>
                    Trả Sách
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseReturnDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Trạng thái trả sách"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={statusReturn}
                        onChange={(e) => setStatusReturn(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseReturnDialog} color="primary">
                        Hủy
                    </Button>
                    <Button
                        onClick={() => handleReturnBook(selectedBorrow.borrowingFormId)}
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'OK'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
