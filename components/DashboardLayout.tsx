
import React from 'react';
import { HomeIcon, WrenchScrewdriverIcon, UploadIcon as UploadNavIcon, AnalyticsIcon, Cog6ToothIcon } from './icons/DashboardIcons';
import type { AppView } from '../App';
import type { BrandingConfig } from '../types';

interface DashboardLayoutProps {
    children: React.ReactNode;
    currentView: AppView;
    onNavigate: (view: AppView) => void;
    branding: BrandingConfig;
}

const mainNavItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'master', label: 'Master', icon: WrenchScrewdriverIcon },
    { id: 'upload', label: 'Upload', icon: UploadNavIcon },
    { id: 'analytics', label: 'Analytics', icon: AnalyticsIcon },
] as const;

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, currentView, onNavigate, branding }) => {
    return (
        <div className="flex h-screen bg-brand-primary text-brand-text overflow-hidden">
            <aside className="w-72 bg-brand-secondary flex-shrink-0 flex flex-col border-r border-brand-accent/30 shadow-xl z-20">
                 <div className="p-6 h-20 flex items-center border-b border-brand-accent/30">
                    {branding.logoUrl ? (
                        <img src={branding.logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-highlight to-yellow-600 flex items-center justify-center shadow-lg shadow-brand-highlight/20">
                                <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h1 className="text-lg font-bold tracking-tight text-brand-text leading-tight">
                                {branding.productName}
                            </h1>
                        </div>
                    )}
                </div>
                
                <div className="flex-1 flex flex-col justify-between p-4">
                    <nav className="space-y-1">
                        <p className="px-3 text-xs font-semibold text-brand-light/50 uppercase tracking-wider mb-3 mt-2">Menu</p>
                        {mainNavItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className={`w-full flex items-center p-3 rounded-xl text-left transition-all duration-200 group ${
                                    currentView === item.id 
                                    ? 'bg-brand-accent/30 text-brand-highlight shadow-md ring-1 ring-brand-accent/50' 
                                    : 'text-brand-light hover:bg-brand-accent/20 hover:text-brand-text'
                                }`}
                            >
                                <item.icon className={`h-5 w-5 mr-3 transition-colors ${currentView === item.id ? 'text-brand-highlight' : 'text-brand-light group-hover:text-brand-text'}`} />
                                <span className="font-medium tracking-wide">{item.label}</span>
                                {currentView === item.id && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-highlight shadow-[0_0_8px_rgba(255,193,7,0.6)]"></div>
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className="pt-4 border-t border-brand-accent/30">
                         <p className="px-3 text-xs font-semibold text-brand-light/50 uppercase tracking-wider mb-3">System</p>
                        <button
                            onClick={() => onNavigate('settings')}
                            className={`w-full flex items-center p-3 rounded-xl text-left transition-all duration-200 group ${
                                currentView === 'settings' 
                                ? 'bg-brand-accent/30 text-brand-highlight shadow-md ring-1 ring-brand-accent/50' 
                                : 'text-brand-light hover:bg-brand-accent/20 hover:text-brand-text'
                            }`}
                        >
                            <Cog6ToothIcon className={`h-5 w-5 mr-3 transition-colors ${currentView === 'settings' ? 'text-brand-highlight' : 'text-brand-light group-hover:text-brand-text'}`} />
                            <span className="font-medium tracking-wide">Settings</span>
                        </button>
                        
                        <div className="mt-4 px-3 py-3 bg-brand-primary/30 rounded-xl flex items-center gap-3 border border-brand-accent/20">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                                AJ
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-brand-text truncate">Alice Johnson</p>
                                <p className="text-xs text-brand-light truncate">Super Admin</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex-1 flex flex-col overflow-hidden relative z-10 bg-gradient-to-br from-brand-primary to-[#0b1623]">
                {children}
            </main>
        </div>
    );
};
