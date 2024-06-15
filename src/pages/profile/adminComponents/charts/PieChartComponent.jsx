import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from 'recharts';

const PieChartComponent = ({ menCollections, womenCollections }) => {
    const totalMen = menCollections.length;
    const totalWomen = womenCollections.length;

    const data = [
        { name: 'Total Men Products', value: totalMen, fill: '#8884d8' }, 
        { name: 'Total Women Products', value: totalWomen, fill: '#82ca9d' }, 
    ];

    return (
        <div>
            <h1 className=" text-center text-2xl font-bold md:mt-6">Total Stock [{totalMen + totalWomen}]</h1>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" label />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartComponent;
