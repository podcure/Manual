import React from 'react';

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

export const AnalyticsPage: React.FC = () => {
    // Mock data for display
    const kpiData = [
        { title: 'Daily Active Users (DAU)', value: '1,428', change: '+12.5%', changeType: 'increase' as const, icon: <UserGroupIcon /> },
        { title: 'Manuals Opened (Today)', value: '3,892', change: '+8.1%', changeType: 'increase' as const, icon: <BookOpenIcon /> },
        { title: 'Avg. Session Duration', value: '12m 45s', change: '-2.3%', changeType: 'decrease' as const, icon: <ClockIcon /> },
        { title: 'Search CTR', value: '78.2%', change: '+1.5%', changeType: 'increase' as const, icon: <CursorArrowRaysIcon /> },
    ];

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <header className="flex-shrink-0 bg-brand-secondary/50 backdrop-blur-sm border-b border-brand-accent/50 p-4 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-brand-text">Analytics Overview</h2>
                    <p className="text-md text-brand-light">Key performance indicators for platform usage.</p>
                </div>
                 <div>
                    <input type="date" className="bg-brand-primary border border-brand-accent rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-highlight text-brand-text" />
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {kpiData.map(item => <KpiCard key={item.title} {...item} />)}
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ChartPlaceholder title="Usage Over Time (Sessions)" />
                    <ChartPlaceholder title="Top Manuals by Views" />
                </div>
            </main>
        </div>
    );
};

// Dummy icons for the KPI cards
const UserGroupIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-brand-highlight"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.51.056 1.02.083 1.531.083c1.244 0 2.433-.203 3.536-.585m-1.531 2.962a2.25 2.25 0 01-2.248 2.035c-.836 0-1.61-.32-2.248-1.033a2.25 2.25 0 01-2.248-2.035c0-.836.32-1.61 1.033-2.248m1.033-2.248a2.25 2.25 0 002.248-2.035c0-.836-.32-1.61-1.033-2.248a2.25 2.25 0 00-2.248-2.035c-.836 0-1.61.32-2.248 1.033m11.496 4.478c.22-.053.442-.102.662-.152m-11.496 0c.22.053.442.102.662.152m8.674-1.21c.338.083.68.156 1.026.219m-8.674 0c.338-.083.68-.156 1.026-.219m0 0a48.455 48.455 0 011.026-2.19m-1.026 2.19a48.455 48.455 0 001.026 2.19m-4.34-4.34a2.25 2.25 0 013.182 0m-3.182 0a2.25 2.25 0 003.182 0" /></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-brand-highlight"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-brand-highlight"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CursorArrowRaysIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-brand-highlight"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>;

const ChartPlaceholder: React.FC<{ title: string }> = ({ title }) => (
    <div className="bg-brand-secondary p-6 rounded-lg border border-brand-accent/50">
        <h3 className="text-lg font-semibold text-brand-text mb-4">{title}</h3>
        <div className="h-64 bg-brand-primary rounded-md flex items-center justify-center">
            <p className="text-brand-light">[Chart Data Would Be Visualized Here]</p>
        </div>
    </div>
);
