import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
    GridRowsProp,
    GridRowModesModel,
    DataGrid,
    GridColDef,
    GridActionsCellItem,
    GridEventListener,
    GridRowModel,
    GridRowEditStopReasons,
    GridRowModes,
} from '@mui/x-data-grid';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip,
    Typography,
} from '@mui/material';
import PublisherModel from '../../../../models/PublisherModel';

export const PublisherTable: React.FC<{
    publishers: PublisherModel[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    openPublisherDelete?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    openPublisherEdit: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleDeletePublishers: any;
}> = (props) => {
    const initialRows: GridRowsProp = props.publishers.map((publisher) => ({
        id: publisher.id,
        name: publisher.name,
        phoneNumber: publisher.phoneNumber,
        address: publisher.address,
    }));
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [open, setOpen] = React.useState(false);
    const [publisherId, setPublisherId] = React.useState(0);
    const [publisherName, setPublisherName] = React.useState('');
    const [publisherTotalBook] = React.useState(0);

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 30 },
        {
            field: 'name',
            headerName: 'Tên Nhà Xuất Bản',
            type: 'string',
            width: 200,
            align: 'left',
            headerAlign: 'left',
        },
        {
          field: 'phoneNumber',
          headerName: 'Số Điện Thoại',
          width: 200,
          type: 'string',
      },
        {
            field: 'address',
            headerName: 'Địa Chỉ',
            width: 350,
            type: 'string',
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Thao tác',
            width: 100,
            cellClassName: 'actions',
            align: 'right',
            headerAlign: 'right',
            getActions: ({ id, row }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Save"
                            sx={{ color: 'primary.main' }}
                            onClick={() => handleSaveEdit(row)}
                        />,
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Cancel"
                            className="textPrimary"
                            color="inherit"
                            onClick={() => handleCancelEdit(row)}
                        />,
                    ];
                }
                return [
                    <GridActionsCellItem
                        icon={
                            <Tooltip title="Sửa thông tin" arrow>
                                <EditIcon />
                            </Tooltip>
                        }
                        label="Sửa thông tin"
                        className="textPrimary"
                        color="inherit"
                        onClick={(event: React.SyntheticEvent) => {
                            props.openPublisherEdit(event, row.id);
                        }}
                    />,
                    <GridActionsCellItem
                        icon={
                            <Tooltip title="Xóa nhà xuất bản" arrow>
                                <DeleteIcon />
                            </Tooltip>
                        }
                        label="Xóa"
                        color="inherit"
                        onClick={() => handleClickOpen(row.id, row.name)}
                    />,
                ];
            },
        },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSaveEdit = (row: any) => {
        const updatedRow = { ...row, name: publisherName, total_book: publisherTotalBook };
        setRows(rows.map((r) => (r.id === row.id ? updatedRow : r)));
        setRowModesModel({ ...rowModesModel, [row.id]: { mode: GridRowModes.View } });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCancelEdit = (row: any) => {
        setRowModesModel({ ...rowModesModel, [row.id]: { mode: GridRowModes.View } });
    };

    const handleClickOpen = (publisherId: number, publisherName: string) => {
        setOpen(true);
        setPublisherId(publisherId);
        setPublisherName(publisherName);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ height: 500, width: '75%' }}>
            <Box sx={{ display: 'flex', gap: '16px', marginBottom: '10px' }}>
                <Typography variant="h5">Bảng Nhà Xuất Bản</Typography>
            </Box>

            <DataGrid
                rows={rows}
                columns={columns}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slotProps={{ toolbar: { setRows, setRowModesModel } }}
            />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{'Bạn có thật sự muốn xóa nhà xuất bản?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có muốn xóa nhà xuất bản: {publisherName} có mã là: {publisherId}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy bỏ</Button>
                    <Button
                        onClick={async () => {
                            await handleClose();
                            props.handleDeletePublishers(publisherId);
                        }}
                        autoFocus
                    >
                        Xác nhận xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
