import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const BarChartComponent = ({ payment }) => {
    const [soldProducts, setSoldProducts] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [totaProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        const data = payment?.flatMap(items => items.orderedItems.map(item => item)) ?? [];
        setSoldProducts(data);
    }, [payment]);

    useEffect(() => {
        const aggregateData = () => {
            const result = [];
            const now = moment();

            for (let i = 0; i < 12; i++) {
                const month = now.subtract(i, 'months').format('MMMM YYYY');
                result.push({ month, totalQuantity: 0, totalPrice: 0 });
            }

            soldProducts.forEach(product => {
                const productDate = moment(product.date);
                const monthLabel = productDate.format('MMMM YYYY');

                const monthData = result.find(item => item.month === monthLabel);
                if (monthData) {
                    const quantity = parseInt(product.quantity);
                    const price = parseInt(product.price);
                    monthData.totalQuantity += quantity;
                    monthData.totalPrice += price * quantity;
                }
                setTotalProducts(monthData.totalQuantity)
            });

            result.reverse();
            setChartData(result);
        };

        if (soldProducts.length > 0) {
            aggregateData();
        }
    }, [soldProducts]);


    return (
        <div>
            <h1 className=" text-center text-2xl font-bold mb-6">Total Sale [{totaProducts}]</h1>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 20,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: '10px' }} />
                    <YAxis tick={{ fontSize: '10px' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalQuantity" name="Total Quantity" fill="#8884d8" />
                    <Bar dataKey="totalPrice" name="Total Price" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;
