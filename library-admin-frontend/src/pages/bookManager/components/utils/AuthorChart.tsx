import * as React from 'react';
import { PieChart, PieChartProps } from '@mui/x-charts/PieChart';
import { legendClasses } from '@mui/x-charts/ChartsLegend';
import AuthorModel from '../../../../models/AuthorModel';
import { Box, Typography } from '@mui/material';

export const AuthorChart: React.FC<{ authors: AuthorModel[] }> = ({ authors }) => {
    // Cấu hình chung cho biểu đồ
    const otherProps: Partial<PieChartProps> = {
        width: 600,
        height: 400,
        sx: {
            [`.${legendClasses.root}`]: {
                transform: 'translate(20px, 0)',
            },
        },
    };

    // Chuẩn bị dữ liệu từ props.authors
    const data = authors.map((author) => ({
        team: author.name,
        rank: author.id,
        points: author.totalBook ?? 0,
    }));

    // Xử lý khi không có dữ liệu
    if (data.length === 0) {
        return (
            <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '2rem' }}>
                Không có dữ liệu để hiển thị biểu đồ.
            </Typography>
        );
    }

    return (
        <Box>
            <PieChart
                series={[
                    {
                        data: data.map((d) => ({ label: d.team, id: d.rank, value: d.points })),
                        valueFormatter: (_v, { dataIndex }) => {
                            const { team, points } = data[dataIndex];
                            return `${team} có ${points} quyển sách.`;
                        },
                    },
                ]}
                slotProps={{
                    legend: {
                        hidden: true,
                    },
                }}
                {...otherProps}
            />
            <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '1rem' }}>
                Biểu đồ thống kê số lượng sách theo tác giả
            </Typography>
        </Box>
    );
};
