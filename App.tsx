
import React, { useState, useMemo, useEffect } from 'react';
import { allModels as initialModels, allManuals as initialManuals, mockBranding } from './data/mockData';
import { ManualViewer } from './components/ManualViewer';
import type { Model, Manual, BrandingConfig } from './types';
import { DashboardLayout } from './components/DashboardLayout';
import { HomePage } from './components/HomePage';
import { MasterPage } from './components/MasterPage';
import { UploadPage } from './components/UploadPage';
import { ManualSelectionPage } from './components/ManualSelectionPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { SettingsPage } from './components/SettingsPage';
import { analyticsService } from './services/analyticsService';


export type AppView = 'home' | 'master' | 'upload' | 'manuals' | 'viewer' | 'analytics' | 'settings';

export default function App() {
    const [view, setView] = useState<AppView>('home');
    const [allModels, setAllModels] = useState<Model[]>(initialModels);
    const [allManuals, setAllManuals] = useState<Manual[]>(initialManuals);
    const [branding, setBranding] = useState<BrandingConfig>(mockBranding);
    
    const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
    const [selectedManualId, setSelectedManualId] = useState<string | null>(null);

    useEffect(() => {
        // In a real app, user/session IDs would come from an auth system
        const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
        const sessionId = `session_${Date.now()}`;
        analyticsService.init(userId, sessionId);
    }, []);

    const handleSelectModel = (modelId: string) => {
        setSelectedModelId(modelId);
        setView('manuals');
    };

    const handleSelectManual = (manualId: string) => {
        setSelectedManualId(manualId);
        setView('viewer');
    };
    
    const handleNavigation = (targetView: AppView) => {
        if(targetView !== 'viewer' && targetView !== 'manuals') {
            setSelectedModelId(null);
            setSelectedManualId(null);
        }
        setView(targetView);
    };

    const handleBackToMachineSelection = () => {
        setSelectedModelId(null);
        setSelectedManualId(null);
        setView('home');
    };

    const handleBackToManualSelection = () => {
        setSelectedManualId(null);
        setView('manuals');
    };


    const handleAddModel = (newModelData: Omit<Model, 'manuals'>) => {
         const newModel: Model = {
            ...newModelData,
            manuals: [],
        };
        setAllModels(prevModels => [newModel, ...prevModels]);
    };

    const handleUpdateModel = (updatedModelData: Omit<Model, 'manuals'>) => {
        setAllModels(prevModels => 
            prevModels.map(model => 
                model.id === updatedModelData.id 
                    ? { ...model, ...updatedModelData } // Preserve existing manuals array
                    : model
            )
        );
    };

    const handleAddManual = (newManualData: Omit<Manual, 'id' | 'toc'>) => {
        const newManual: Manual = {
            ...newManualData,
            id: `manual-${Date.now()}`,
            toc: [], // New manuals would have their TOC generated on processing
        };
        setAllManuals(prevManuals => [newManual, ...prevManuals]);
    };
    
    const modelsWithManuals = useMemo((): Model[] => {
        return allModels.map(model => ({
            ...model,
            manuals: allManuals.filter(manual => manual.mappedMachineIds.includes(model.id))
        }));
    }, [allModels, allManuals]);


    const renderContent = () => {
        if (view === 'viewer' && selectedModelId && selectedManualId) {
            const model = modelsWithManuals.find(m => m.id === selectedModelId);
            const manual = allManuals.find(m => m.id === selectedManualId);
            if (model && manual) {
                return <ManualViewer 
                    model={model} 
                    initialManual={manual}
                    onGoBack={handleBackToManualSelection}
                    onNavigateHome={handleBackToMachineSelection}
                    onNavigateToModel={handleBackToManualSelection}
                />;
            }
        }

        let pageComponent;
        switch(view) {
            case 'manuals':
                const model = modelsWithManuals.find(m => m.id === selectedModelId);
                if (model) {
                    pageComponent = <ManualSelectionPage 
                        model={model} 
                        onSelectManual={handleSelectManual} 
                        onGoBack={handleBackToMachineSelection} 
                    />;
                } else {
                    pageComponent = <div className="p-8 text-center">
                        <p className="text-brand-light">Model not found.</p>
                        <button onClick={handleBackToMachineSelection} className="mt-4 px-4 py-2 rounded-md bg-brand-accent hover:bg-brand-light hover:text-brand-primary text-brand-text font-semibold">Go Back</button>
                    </div>;
                }
                break;
            case 'master':
                pageComponent = <MasterPage allModels={allModels} onAddModel={handleAddModel} onUpdateModel={handleUpdateModel} />;
                break;
            case 'upload':
                pageComponent = <UploadPage allModels={allModels} onAddManual={handleAddManual} />;
                break;
            case 'analytics':
                pageComponent = <AnalyticsPage />;
                break;
            case 'settings':
                pageComponent = <SettingsPage branding={branding} onUpdateBranding={setBranding} />;
                break;
            case 'home':
            default:
                pageComponent = <HomePage models={modelsWithManuals} onSelectModel={handleSelectModel} />;
        }
        
        return (
            <DashboardLayout currentView={view} onNavigate={handleNavigation} branding={branding}>
                {pageComponent}
            </DashboardLayout>
        );
    };

    return <div className="antialiased" style={{ 
        '--color-brand-highlight': branding.accentColor 
    } as React.CSSProperties}>{renderContent()}</div>;
}
