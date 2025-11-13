import React from 'react';
import { HomeIcon, WrenchScrewdriverIcon, UploadIcon as UploadNavIcon, AnalyticsIcon } from './icons/DashboardIcons';
import type { AppView } from '../App';

interface DashboardLayoutProps {
    children: React.ReactNode;
    currentView: AppView;
    onNavigate: (view: AppView) => void;
}

const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'master', label: 'Master', icon: WrenchScrewdriverIcon },
    { id: 'upload', label: 'Upload', icon: UploadNavIcon },
    { id: 'analytics', label: 'Analytics', icon: AnalyticsIcon },
] as const;


export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, currentView, onNavigate }) => {
    return (
        <div className="flex h-screen bg-brand-primary text-brand-text">
            <aside className="w-64 bg-brand-secondary flex-shrink-0 flex flex-col border-r border-brand-accent/50">
                 <div className="p-4 border-b border-brand-accent/50 h-16 flex items-center">
                    <h1 className="text-xl font-bold text-brand-highlight">Service Manuals AI</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full flex items-center p-3 rounded-md text-left transition-colors ${
                                currentView === item.id 
                                ? 'bg-brand-highlight text-brand-primary font-semibold' 
                                : 'text-brand-light hover:bg-brand-accent hover:text-brand-text'
                            }`}
                        >
                            <item.icon className="h-5 w-5 mr-3" />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>
            <main className="flex-1 flex flex-col overflow-hidden">
                {children}
            </main>
        </div>
    );
};