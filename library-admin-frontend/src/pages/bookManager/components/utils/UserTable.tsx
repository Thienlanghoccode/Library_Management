// UserTable.js
import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
    DataGrid,
    GridRowsProp,
    GridRowModesModel,
    GridColDef,
    GridActionsCellItem,
    GridRowModes,
    GridRowModel,
    GridRowEditStopReasons,
    GridEventListener
} from '@mui/x-data-grid';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip,
    Typography
} from '@mui/material';

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

interface UserTableProps {
    users: User[];
    openUserEdit: (event: React.SyntheticEvent, id: number) => void;
    handleDeleteUser: (id: number) => void;
}

export const UserTable: React.FC<UserTableProps> = (props) => {
    const initialRows: GridRowsProp = props.users.map((user) => ({
        id: user.id,
        userName: user.userName,
        userImage: user.userImage,
        userPhoneNumber: user.userPhoneNumber,
        userAddress: user.userAddress,
        userAccountName: user.userAccountName,
        userRole: user.userRole,
        userCode: user.userCode,
        userMoney: user.userMoney,
    }));

    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [open, setOpen] = React.useState(false);
    const [userId, setUserId] = React.useState(0);
    const [userName, setUserName] = React.useState('');

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
        { field: 'userCode', headerName: 'User Code', width: 150 },
        { field: 'userName', headerName: 'User Name', width: 200 },
        {
            field: 'userImage',
            headerName: 'Image',
            width: 100,
            renderCell: (params) => params.value ? <img src={params.value} alt={params.row.userName} width="50" /> : null,
        },
        { field: 'userPhoneNumber', headerName: 'Phone Number', width: 200 },
        { field: 'userAddress', headerName: 'Address', width: 300 },
        { field: 'userAccountName', headerName: 'Account Name', width: 200 },
        { field: 'userRole', headerName: 'Role', width: 150 },
        { field: 'userMoney', headerName: 'Money', width: 150 },
        {
            field: 'actions', type: 'actions', headerName: 'Actions', width: 150, getActions: ({ id, row }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem icon={<EditIcon />} label="Save" sx={{ color: 'primary.main' }} onClick={() => handleSaveEdit(row)} />,
                        <GridActionsCellItem icon={<EditIcon />} label="Cancel" className="textPrimary" color="inherit" onClick={() => handleCancelEdit(row)} />,
                    ];
                }
                return [
                    <GridActionsCellItem
                        icon={<Tooltip title="Edit"><EditIcon /></Tooltip>}
                        label="Edit"
                        className="textPrimary"
                        color="inherit"
                        onClick={(event) => props.openUserEdit(event, row.id)}
                    />,
                    <GridActionsCellItem
                        icon={<Tooltip title="Delete"><DeleteIcon /></Tooltip>}
                        label="Delete"
                        color="inherit"
                        onClick={() => handleClickOpen(row.id, row.userName)}
                    />,
                ];
            },
        },
    ];

    const handleSaveEdit = (row: GridRowModel) => {
        const updatedRow = { ...row, userName: userName };
        setRows(rows.map((r) => (r.id === row.id ? updatedRow : r)));
        setRowModesModel({ ...rowModesModel, [row.id]: { mode: GridRowModes.View } });
    };

    const handleCancelEdit = (row: GridRowModel) => {
        setRowModesModel({ ...rowModesModel, [row.id]: { mode: GridRowModes.View } });
    };

    const handleClickOpen = (id: number, name: string) => {
        setOpen(true);
        setUserId(id);
        setUserName(name);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ height: 500, width: '100%' }}>
            <Box sx={{ display: 'flex', gap: '16px', marginBottom: '10px' }}>
                <Typography variant="h5">Danh sách người dùng</Typography>
            </Box>
            <DataGrid
                rows={rows}
                columns={columns}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{'Are you sure you want to delete this user?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you really want to delete user: {userName} with code: {userId}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={async () => {
                            await handleClose();
                            props.handleDeleteUser(userId);
                        }}
                        autoFocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
