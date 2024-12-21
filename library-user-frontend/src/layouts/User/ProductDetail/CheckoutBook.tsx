import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface BorrowBookButtonProps {
    bookId: number;
    bookName: string;
}

const BorrowBookButton: React.FC<BorrowBookButtonProps> = ({ bookId, bookName }) => {
    const [username, setUsername] = useState("");
    const [show, setShow] = useState(false);
    const [date, setDate] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [userAccountName, setUserAccountName] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem("authToken");
        if (storedData) {
            try {
                const payload = JSON.parse(atob(storedData.split(".")[1])); // Decode base64 payload
                const email = payload.sub;
                const displayName = email.split("@")[0];
                setUsername(displayName);
                setUserAccountName(email);
            } catch (error) {
                console.error("Invalid token format:", error);
            }
        }
    }, []);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
        setDueDate(today);
    }, []);

    const handleBorrowBook = async () => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            navigate('/auth/login');
            return;
        }
        setShow(true); // Hiển thị modal sau khi xác thực token
    };

    const handleConfirmBorrow = async () => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            navigate('/auth/login');
            return;
        }

        const accessToken = JSON.parse(authToken).accessToken; // Lấy accessToken từ authToken
        const borrowData = {
            bookId: Number(bookId),
            date: date ? new Date(date).toISOString() : '',
            dueDate: dueDate ? new Date(dueDate).toISOString() : '',
            userAccountName,
            userAccountPassword: '',  // Trường này rỗng vì không cần thiết
        };

        try {
            const response = await fetch('http://localhost:8000/borrow/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(borrowData),
            });
            if (!response.ok) {
                throw new Error('Failed to borrow book');
            }
            alert('Book borrowed successfully!');
            setShow(false);
        } catch (error) {
            console.error('Failed to borrow book:', error);
        }
    };

    return (
        <>
            <Button 
                className="tg-btn tg-active tg-btn-lg"
                onClick={(e) => {
                    e.preventDefault(); // Ngăn chặn hành động mặc định
                    handleBorrowBook();
                }}
            >
                Mượn Sách
            </Button>

            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Mượn Sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="borrowDate">
                            <Form.Label>Ngày mượn</Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </Form.Group>
                        <Form.Group controlId="dueDate">
                            <Form.Label>Ngày hẹn trả</Form.Label>
                            <Form.Control
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </Form.Group>
                        <Form.Group controlId="userAccountName">
                            <Form.Label>Tên tài khoản người mượn</Form.Label>
                            <Form.Control type="text" value={username} readOnly />
                        </Form.Group>
                        <Form.Group controlId="bookName">
                            <Form.Label>Tên sách</Form.Label>
                            <Form.Control type="text" value={bookName} readOnly />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleConfirmBorrow}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BorrowBookButton;
