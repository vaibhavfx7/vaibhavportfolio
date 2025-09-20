
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { SkillCategory } from '../types';

interface SkillsChartProps {
    data: SkillCategory[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-slate-700/80 backdrop-blur-sm border border-slate-600 rounded-md text-sm text-slate-200">
                <p className="label font-bold">{`${label}`}</p>
                <p className="intro">{`Proficiency: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

export const SkillsChart: React.FC<SkillsChartProps> = ({ data }) => {
    const chartData = data.flatMap(category => category.skills);

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 20,
                        left: -10,
                        bottom: 5,
                    }}
                    barGap={5}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={{ stroke: '#94a3b8' }} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={{ stroke: '#94a3b8' }} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(30, 41, 59, 0.5)' }}/>
                    <Bar dataKey="level" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
