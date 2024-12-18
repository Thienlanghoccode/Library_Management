import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import PublisherModel from '../../../../models/PublisherModel';

interface PublisherFormAddProps {
    handleAddPublisher?: (publisherData: PublisherModel) => void;
    handleEditPublisher?: (publisherId: number, publisherData: PublisherModel) => void;
    publisher?: PublisherModel|null;
}

export const PublisherFormAdd: React.FC<PublisherFormAddProps> = ({ handleAddPublisher, handleEditPublisher, publisher }) => {
    const [publisherName, setPublisherName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    useEffect(() => {
        if (publisher) {
            setPublisherName(publisher.name);
            setPhoneNumber(publisher.phoneNumber || '');
            setAddress(publisher.address || '');
        }
    }, [publisher]);

    const handleSubmit = () => {
        const publisherData: PublisherModel = {
            id: publisher?.id || 0,
            name: publisherName,
            phoneNumber: phoneNumber,
            address: address,
        };

        if (publisher?.id && handleEditPublisher) {
            handleEditPublisher(publisher.id, publisherData);
        } else if (handleAddPublisher) {
            handleAddPublisher(publisherData);
        }

        if (!publisher?.id) {
            setPublisherName('');
            setPhoneNumber('');
            setAddress('');
        }
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '50ch' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-name"
                label="Tên nhà xuất bản"
                variant="outlined"
                value={publisherName}
                onChange={(e) => setPublisherName(e.target.value)}
            />
            <TextField
                id="outlined-phone"
                label="Số điện thoại"
                variant="outlined"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
                id="outlined-address"
                label="Địa chỉ"
                variant="outlined"
                multiline
                rows={4}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                {publisher ? 'Cập nhật nhà xuất bản' : 'Thêm nhà xuất bản'}
            </Button>
        </Box>
    );
};
