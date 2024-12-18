import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Container, Typography, CircularProgress, Card, CardContent, CardHeader } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';

// Fetch data function
const fetchData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

const Statistics: React.FC = () => {
    const [userCountByRegion, setUserCountByRegion] = useState<[string, number][]>([]);
    const [lateReturns, setLateReturns] = useState<number | null>(null);
    const [totalRevenueByAuthor, setTotalRevenueByAuthor] = useState<[string, number][]>([]);
    const [booksByStatus, setBooksByStatus] = useState<[string, number][]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchStatistics = async () => {
        setLoading(true);
        try {
            setUserCountByRegion(await fetchData('http://localhost:8000/api/statistics/user-count-by-region'));
            setLateReturns(await fetchData('http://localhost:8000/api/statistics/late-returns'));
            setTotalRevenueByAuthor(await fetchData('http://localhost:8000/api/statistics/total-revenue-by-author'));
            setBooksByStatus(await fetchData('http://localhost:8000/api/statistics/books-by-status'));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchStatistics();
    }, []);

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Thống Kê</Typography>

            {lateReturns !== null && (
                <Box marginBottom="20px">
                    <Card variant="outlined">
                        <CardHeader title="Số lượng trả muộn" />
                        <CardContent>
                            <Typography variant="h5">{lateReturns}</Typography>
                        </CardContent>
                    </Card>
                </Box>
            )}

            {userCountByRegion.length > 0 && (
                <Box marginBottom="20px">
                    <Card variant="outlined">
                        <CardHeader title="Người dùng theo khu vực" />
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={userCountByRegion.map(item => ({ region: item[0], count: item[1] }))}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="region" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Box>
            )}

            {totalRevenueByAuthor.length > 0 && (
                <Box marginBottom="20px">
                    <Card variant="outlined">
                        <CardHeader title="Doanh thu theo tác giả" />
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={totalRevenueByAuthor.map(item => ({ author: item[0], revenue: item[1] }))}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="author" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Box>
            )}

            {booksByStatus.length > 0 && (
                <Box marginBottom="20px">
                    <Card variant="outlined">
                        <CardHeader title="Trạng thái sách" />
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={booksByStatus.map(item => ({ name: item[0], value: item[1] }))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                        {booksByStatus.map((_item, index) => (
                                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#82ca9d" : "#8884d8"} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Container>
    );
};

export default Statistics;
