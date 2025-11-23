
import React, { useState } from 'react';
import { SettingsOverview, PlansAndBilling, UsersAndRoles, BrandingSettings, AuditLogs } from './SettingsViews';
import { CreditCardIcon, UsersIcon, BuildingOfficeIcon, ShieldCheckIcon, HomeIcon } from './icons/SettingsIcons';
import type { BrandingConfig } from '../types';

type SettingsView = 'overview' | 'plans' | 'users' | 'branding' | 'audit';

interface SettingsPageProps {
    branding: BrandingConfig;
    onUpdateBranding: (config: BrandingConfig) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ branding, onUpdateBranding }) => {
    const [activeView, setActiveView] = useState<SettingsView>('overview');

    const renderView = () => {
        switch (activeView) {
            case 'overview': return <SettingsOverview />;
            case 'plans': return <PlansAndBilling />;
            case 'users': return <UsersAndRoles />;
            case 'branding': return <BrandingSettings branding={branding} onUpdate={onUpdateBranding} />;
            case 'audit': return <AuditLogs />;
            default: return <SettingsOverview />;
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-brand-primary h-full">
            <header className="flex-shrink-0 bg-brand-secondary/50 backdrop-blur-sm border-b border-brand-accent/50 p-4">
                <h2 className="text-2xl font-bold text-brand-text">Settings & Administration</h2>
                <p className="text-md text-brand-light">Manage your account, team, and preferences.</p>
            </header>
            <div className="flex-1 flex overflow-hidden">
                {/* Sub-sidebar for Settings */}
                <nav className="w-64 bg-brand-secondary/30 border-r border-brand-accent/30 overflow-y-auto p-4 space-y-2">
                    <button 
                        onClick={() => setActiveView('overview')}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeView === 'overview' ? 'bg-brand-accent text-brand-highlight shadow-sm' : 'text-brand-light hover:bg-brand-accent/30 hover:text-brand-text'}`}
                    >
                        <HomeIcon className="mr-3 h-5 w-5" /> Overview
                    </button>
                    <button 
                        onClick={() => setActiveView('plans')}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeView === 'plans' ? 'bg-brand-accent text-brand-highlight shadow-sm' : 'text-brand-light hover:bg-brand-accent/30 hover:text-brand-text'}`}
                    >
                        <CreditCardIcon className="mr-3 h-5 w-5" /> Plans & Billing
                    </button>
                     <button 
                        onClick={() => setActiveView('users')}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeView === 'users' ? 'bg-brand-accent text-brand-highlight shadow-sm' : 'text-brand-light hover:bg-brand-accent/30 hover:text-brand-text'}`}
                    >
                        <UsersIcon className="mr-3 h-5 w-5" /> Users & Roles
                    </button>
                     <button 
                        onClick={() => setActiveView('branding')}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeView === 'branding' ? 'bg-brand-accent text-brand-highlight shadow-sm' : 'text-brand-light hover:bg-brand-accent/30 hover:text-brand-text'}`}
                    >
                        <BuildingOfficeIcon className="mr-3 h-5 w-5" /> Branding
                    </button>
                     <button 
                        onClick={() => setActiveView('audit')}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeView === 'audit' ? 'bg-brand-accent text-brand-highlight shadow-sm' : 'text-brand-light hover:bg-brand-accent/30 hover:text-brand-text'}`}
                    >
                        <ShieldCheckIcon className="mr-3 h-5 w-5" /> Audit Logs
                    </button>
                </nav>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto bg-brand-primary p-6">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};
