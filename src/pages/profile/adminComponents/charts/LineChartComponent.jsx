import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const LineChartComponent = ({ payment }) => {
    const [maleProducts, setMaleProducts] = useState([]);
    const [femaleProducts, setFemaleProducts] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const maleData = payment?.flatMap(items => items.orderedItems.filter(item => item.gender === "Male")) ?? [];
        setMaleProducts(maleData);

        const femaleData = payment?.flatMap(items => items.orderedItems.filter(item => item.gender === "Female")) ?? [];
        setFemaleProducts(femaleData);
    }, [payment]);

    useEffect(() => {
        const processChartData = () => {
            const data = [];
            for (let i = 11; i >= 0; i--) {
                const month = moment().subtract(i, 'months').format('MMMM YYYY'); 
                data.push({
                    name: month,
                    male: maleProducts.filter(item => moment(item.date).format('MMMM YYYY') === month).length,
                    female: femaleProducts.filter(item => moment(item.date).format('MMMM YYYY') === month).length,
                });
            }
            setChartData(data);
        };

        processChartData();
    }, [maleProducts, femaleProducts]);

    return (
        <div>
            <h1 className=" text-center text-2xl font-bold mb-6">Total Orders [{maleProducts.length + femaleProducts.length}]</h1>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 20,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: '10px' }} />
                    <YAxis tick={{ fontSize: '10px' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" name="Male" dataKey="male" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" name="Female" dataKey="female" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartComponent;
