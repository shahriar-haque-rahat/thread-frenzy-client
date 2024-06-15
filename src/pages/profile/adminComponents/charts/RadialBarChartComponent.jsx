import { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import moment from 'moment';

const RadialBarChartComponent = ({ user }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const aggregateData = () => {
            const result = [];
            const now = moment();
            const colors = ["#8884d8", "#82ca9d"];

            for (let i = 0; i < 12; i++) {
                const month = now.subtract(i, 'months').format('MMMM');
                const year = now.format('YYYY');
                result.push({ month, year, newUserCount: 0, fill: colors[i % colors.length] });
            }

            user.forEach(userData => {
                const userDate = moment(userData.date);
                const monthData = result.find(item => item.month === userDate.format('MMMM') && item.year === userDate.format('YYYY'));
                if (monthData) {
                    monthData.newUserCount += 1;
                }
            });

            result.reverse();
            setChartData(result);
        };

        if (user.length > 0) {
            aggregateData();
        }
    }, [user]);

    const style = {
        top: '50%',
        right: 0,
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
        fontSize: '10px',
    };

    return (
        <div>
            <h1 className=" text-center text-2xl font-bold md:mt-6">Total Users [{user.length}]</h1>
            <ResponsiveContainer width="100%" height={400}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={chartData}>
                    <RadialBar
                        minAngle={15}
                        label={{ position: 'insideStart', fill: '#fff', fontSize: '0.7em' }}
                        background
                        clockWise
                        dataKey="newUserCount"
                    />
                    <Tooltip
                        content={({ payload }) => {
                            if (payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                    <div className="custom-tooltip bg-white p-2">
                                        <p>{`${data.month} ${data.year}`}</p>
                                        <p>{`New Users: ${data.newUserCount}`}</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RadialBarChartComponent;
