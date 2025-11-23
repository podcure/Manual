import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { ClockIcon } from './icons/ClockIcon';
import { CursorArrowRaysIcon } from './icons/CursorArrowRaysIcon';
import { CubeIcon } from './icons/CubeIcon';
import { DocumentChartBarIcon } from './icons/DocumentChartBarIcon';

interface KpiCardProps {
    title: string;
    value: string;
    change?: string;
    changeType?: 'increase' | 'decrease';
    icon: React.ReactNode;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, changeType, icon }) => (
    <div className="bg-brand-secondary p-6 rounded-lg border border-brand-accent/50">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-brand-light">{title}</p>
                <p className="text-3xl font-bold text-brand-text mt-1">{value}</p>
            </div>
            <div className="p-3 bg-brand-accent/50 rounded-full">
                {icon}
            </div>
        </div>
        {change && (
            <p className={`mt-2 text-sm ${changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                {change} vs last period
            </p>
        )}
    </div>
);


const MostSearchedMachines: React.FC<{ data: { name: string; value: number; color: string }[] }> = ({ data }) => {
    const total = data.reduce((acc, item) => acc + item.value, 0);
    let cumulativePercent = 0;

    const pieSlices = data.map(item => {
        const percent = item.value / total;
        const slice = {
            ...item,
            percent,
            offset: cumulativePercent * 360,
        };
        cumulativePercent += percent;
        return slice;
    });
    
    const radius = 80;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className="bg-brand-secondary p-6 rounded-lg border border-brand-accent/50 h-full">
            <h3 className="text-lg font-semibold text-brand-text mb-4 flex items-center">
                <CubeIcon className="w-5 h-5 mr-2 text-brand-light" />
                Most Searched Machines
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-48 h-48">
                     <svg className="w-full h-full" viewBox="0 0 200 200">
                        {pieSlices.map(slice => (
                            <circle
                                key={slice.name}
                                r={radius}
                                cx="100"
                                cy="100"
                                fill="transparent"
                                stroke={slice.color}
                                strokeWidth="40"
                                strokeDasharray={`${slice.percent * circumference} ${circumference}`}
                                transform={`rotate(${slice.offset - 90} 100 100)`}
                            />
                        ))}
                    </svg>
                </div>
                <div className="flex-1 space-y-2 text-sm">
                    {data.map(item => (
                        <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                                <span className="text-brand-light">{item.name}</span>
                            </div>
                            <span className="font-semibold text-brand-text">{((item.value / total) * 100).toFixed(1)}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const TopSearchedTopics: React.FC<{ data: { manual: string; topic: string; searches: number }[] }> = ({ data }) => {
    const maxSearches = Math.max(...data.map(item => item.searches), 0);

    return (
        <div className="bg-brand-secondary p-6 rounded-lg border border-brand-accent/50 h-full">
            <h3 className="text-lg font-semibold text-brand-text mb-4 flex items-center">
                <DocumentChartBarIcon className="w-5 h-5 mr-2 text-brand-light" />
                Top Searched Topics (Problem Areas)
            </h3>
            <div className="space-y-4">
                {data.map((item, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center text-sm mb-1">
                            <p className="text-brand-text font-semibold truncate" title={`${item.manual} - ${item.topic}`}>{item.topic}</p>
                            <p className="text-brand-light font-medium">{item.searches} searches</p>
                        </div>
                        <div className="w-full bg-brand-primary rounded-full h-2.5">
                            <div className="bg-brand-highlight h-2.5 rounded-full" style={{ width: `${(item.searches / maxSearches) * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-brand-light/70 mt-1">{item.manual}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PopularManuals: React.FC<{ data: { name: string; opens: number }[] }> = ({ data }) => {
    const maxOpens = Math.max(...data.map(item => item.opens), 0);

    return (
        <div className="bg-brand-secondary p-6 rounded-lg border border-brand-accent/50 h-full">
            <h3 className="text-lg font-semibold text-brand-text mb-4 flex items-center">
                <BookOpenIcon className="w-5 h-5 mr-2 text-brand-light" />
                Most Opened Manuals
            </h3>
            <div className="space-y-4">
                {data.map((item, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center text-sm mb-1">
                            <p className="text-brand-text font-semibold truncate" title={item.name}>{item.name}</p>
                            <p className="text-brand-light font-medium">{item.opens} opens</p>
                        </div>
                        <div className="w-full bg-brand-primary rounded-full h-2.5">
                            <div className="bg-brand-highlight h-2.5 rounded-full" style={{ width: `${(item.opens / maxOpens) * 100}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const RecentSearchQueries: React.FC<{ data: { userId: string; machine: string; query: string; scope: string; timestamp: string }[] }> = ({ data }) => {
    return (
         <div className="bg-brand-secondary border border-brand-accent/50 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
                 <h3 className="text-lg font-semibold text-brand-text">Recent User Search Queries</h3>
                 <p className="text-sm text-brand-light">Live feed of user searches to identify information needs.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-t border-brand-accent/50 bg-brand-secondary/50">
                        <tr>
                            <th className="p-3 text-sm font-semibold">User ID</th>
                            <th className="p-3 text-sm font-semibold">Machine</th>
                            <th className="p-3 text-sm font-semibold">Query</th>
                            <th className="p-3 text-sm font-semibold">Scope</th>
                            <th className="p-3 text-sm font-semibold">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((search, index) => (
                            <tr key={index} className="border-b border-brand-accent/20 last:border-b-0">
                                <td className="p-3 text-sm text-brand-light font-mono whitespace-nowrap">{search.userId}</td>
                                <td className="p-3 text-sm text-brand-light whitespace-nowrap">{search.machine}</td>
                                <td className="p-3 text-sm font-semibold text-brand-text whitespace-nowrap">{search.query}</td>
                                <td className="p-3 text-sm text-brand-light"><span className="px-2 py-1 text-xs rounded-full bg-brand-accent/50 text-brand-light capitalize">{search.scope.replace('-', ' ')}</span></td>
                                <td className="p-3 text-sm text-brand-light whitespace-nowrap">{new Date(search.timestamp).toLocaleTimeString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export const AnalyticsPage: React.FC = () => {
    // Mock data for display
    const kpiData = [
        { title: 'Daily Active Users (DAU)', value: '1,428', change: '+12.5%', changeType: 'increase' as const, icon: <UserGroupIcon className="w-6 h-6 text-brand-highlight" /> },
        { title: 'Manuals Opened (Today)', value: '3,892', change: '+8.1%', changeType: 'increase' as const, icon: <BookOpenIcon className="w-6 h-6 text-brand-highlight" /> },
        { title: 'Avg. Session Duration', value: '12m 45s', change: '-2.3%', changeType: 'decrease' as const, icon: <ClockIcon className="w-6 h-6 text-brand-highlight" /> },
        { title: 'Search CTR', value: '78.2%', change: '+1.5%', changeType: 'increase' as const, icon: <CursorArrowRaysIcon className="w-6 h-6 text-brand-highlight" /> },
    ];

     const machineSearchData = [
        { name: 'Excavator 5000X', value: 450, color: '#FFC107' },
        { name: 'Loader 250-Pro', value: 280, color: '#778DA9' },
        { name: 'Bulldozer Z-10', value: 150, color: '#415A77' },
        { name: 'Other', value: 120, color: '#1B263B' },
    ];

    const topTopicsData = [
        { manual: 'Service Manual (EX5000)', topic: 'Engine Cranks but No Start', searches: 128 },
        { manual: 'Service Manual (EX5000)', topic: 'Engine Overheating', searches: 95 },
        { manual: 'Parts Manual (PM-5000)', topic: 'Engine Assembly Parts', searches: 72 },
        { manual: 'Service Manual (LDR250)', topic: 'Hydraulic System Errors', searches: 61 },
        { manual: 'Operator Manual (EX5000)', topic: 'Daily Startup Checklist', searches: 45 },
    ];
    
    const popularManualsData = [
        { name: 'Service Manual (EX5000)', opens: 320 },
        { name: 'Operator Manual (EX5000)', opens: 250 },
        { name: 'Parts Manual (PM-5000)', opens: 180 },
        { name: 'Service Manual (LDR250)', opens: 155 },
    ];

    const recentSearchesData = [
        { userId: 'user_abc123', machine: 'Excavator 5000X', query: 'hydraulic pump pressure low', scope: 'all-manuals', timestamp: new Date(Date.now() - 15000).toISOString() },
        { userId: 'user_def456', machine: 'Loader 250-Pro', query: 'transmission fluid type', scope: 'manual', timestamp: new Date(Date.now() - 32000).toISOString() },
        { userId: 'user_ghi789', machine: 'Excavator 5000X', query: 'DTC P0128', scope: 'page', timestamp: new Date(Date.now() - 45000).toISOString() },
        { userId: 'user_abc123', machine: 'Excavator 5000X', query: 'overheating solution', scope: 'manual', timestamp: new Date(Date.now() - 61000).toISOString() },
        { userId: 'user_jkl012', machine: 'Bulldozer Z-10', query: 'track tension spec', scope: 'index', timestamp: new Date(Date.now() - 122000).toISOString() },
    ];


    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <header className="flex-shrink-0 bg-brand-secondary/50 backdrop-blur-sm border-b border-brand-accent/50 p-4 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-brand-text">Analytics Overview</h2>
                    <p className="text-md text-brand-light">Key performance indicators and user search insights.</p>
                </div>
                 <div>
                    <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="bg-brand-primary border border-brand-accent rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-highlight text-brand-text" />
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {kpiData.map(item => <KpiCard key={item.title} {...item} />)}
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <MostSearchedMachines data={machineSearchData} />
                    <TopSearchedTopics data={topTopicsData} />
                    <PopularManuals data={popularManualsData} />
                </div>

                <div className="mt-8">
                    <RecentSearchQueries data={recentSearchesData} />
                </div>
            </main>
        </div>
    );
};
