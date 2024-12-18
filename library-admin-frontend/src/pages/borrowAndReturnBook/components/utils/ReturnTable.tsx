import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import { Tooltip, Typography, Dialog, DialogTitle, DialogContent, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const ReturnTable: React.FC = () => {
    const [rows, setRows] = useState<GridRowsProp>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedReturn, setSelectedReturn] = useState<any | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const formatDate = (date: string): string => {
        if (!date) return 'Không xác định';
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/returnBook');
                const result = await response.json();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const data = result.result.map((item: any) => ({
                    id: item.returnSlipId,
                    book: item.book?.name || 'Không xác định',
                    borrowDate: formatDate(item.borrowDate),
                    returnSlipDate: formatDate(item.returnSlipDate),
                }));
                setRows(data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    const fetchReturnDetails = async (id: number) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/returnBook/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch return details');
            }
            const result = await response.json();
            const data = {
                returnSlipId: result.result.returnSlipId,
                returnSlipDate: formatDate(result.result.returnSlipDate),
                returnSlipRefund: result.result.returnSlipRefund,
                returnSlipLateFee: result.result.returnSlipLateFee,
                book: result.result.book.name || 'Không xác định',
                borrowDate: formatDate(result.result.borrowDate),
                statusReturn: result.result.statusReturn,
                late: result.result.late ? "Có" : "Không",
            };
            setSelectedReturn(data);
            setDialogOpen(true);
        } catch (error) {
            console.error('Error fetching return details:', error);
            alert('Không thể tải dữ liệu chi tiết phiếu trả sách!');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedReturn(null);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'book', headerName: 'Tên sách', width: 200 },
        { field: 'borrowDate', headerName: 'Ngày mượn', width: 150 },
        { field: 'returnSlipDate', headerName: 'Ngày trả', width: 150 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Thao tác',
            width: 100,
            getActions: ({ id }) => [
                <GridActionsCellItem
                    icon={
                        <Tooltip title="Chi tiết phiếu trả sách" arrow>
                            <IconButton onClick={() => fetchReturnDetails(id as number)}>
                                <BallotOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    label="View"
                    onClick={() => {}}
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant="h5">Bảng Phiếu Trả Sách</Typography>
            </Box>
            <DataGrid rows={rows} columns={columns} />
            <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>
                    Chi Tiết Phiếu Trả Sách
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
                    ) : selectedReturn ? (
                        <Box>
                            <Typography><strong>ID:</strong> {selectedReturn.returnSlipId}</Typography>
                            <Typography><strong>Ngày trả:</strong> {selectedReturn.returnSlipDate}</Typography>
                            <Typography><strong>Phí phạt:</strong> {selectedReturn.returnSlipLateFee}</Typography>
                            <Typography><strong>Hoàn trả (VND):</strong> {selectedReturn.returnSlipRefund}</Typography>
                            <Typography><strong>Tên sách:</strong> {selectedReturn.book}</Typography>
                            <Typography><strong>Ngày mượn:</strong> {selectedReturn.borrowDate}</Typography>
                            <Typography><strong>Trạng thái trả:</strong> {selectedReturn.statusReturn}</Typography>
                            <Typography><strong>Trễ hạn:</strong> {selectedReturn.late}</Typography>
                        </Box>
                    ) : (
                        <Typography>Không có dữ liệu!</Typography>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};
