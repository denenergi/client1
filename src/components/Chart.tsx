import React, { FC } from 'react'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'

interface Props {
    totalIncome: number
    totalExpense: number
}

interface IData {
    value: number
    name: string
}

const COLORS = ['#FFBB28', '#FF8042'];

const Chart: FC<Props> = ({ totalIncome, totalExpense }) => {
    const data = new Array<IData>(
        { value: totalIncome, name: 'income' },
        { value: totalExpense, name: 'expense' }
    )
    return (
        <PieChart width={240} height={240}>
            <Pie
                data={data}
                cx={'50%'}
                cy={'50%'}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Legend />
            <Tooltip />
        </PieChart>
    )
}

export default Chart