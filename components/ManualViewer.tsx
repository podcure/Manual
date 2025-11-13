import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './Header';
import { LeftSidebar } from './LeftSidebar';
import { ContentViewer } from './ContentViewer';
import { AiAssistant } from './AiAssistant';
import { ManualSearchResults } from './ManualSearchResults';
import { Breadcrumb } from './Breadcrumb';
import { pageContents } from '../data/mockData';
import type { Model, Manual, TocItem, PageContent, SearchScope } from '../types';
import { generateProcedureChecklist, getTroubleshootingAdvice } from '../services/geminiService';
import { MenuIcon, CloseIcon } from './icons/MenuIcon';
import { analyticsService } from '../services/analyticsService';

interface ManualViewerProps {
    model: Model;
    initialManual: Manual;
    onGoBack: () => void;
    onNavigateHome: () => void;
    onNavigateToModel: () => void;
}

export const ManualViewer: React.FC<ManualViewerProps> = ({ model, initialManual, onGoBack, onNavigateHome, onNavigateToModel }) => {
    const [selectedManual, setSelectedManual] = useState<Manual>(initialManual);
    const [selectedTocItem, setSelectedTocItem] = useState<TocItem | null>(initialManual?.toc[0] || null);
    const [selectedPage, setSelectedPage] = useState<PageContent | null>(pageContents[initialManual?.toc[0]?.pageId || ''] || null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isAssistantOpen, setIsAssistantOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchScope, setSearchScope] = useState<SearchScope>('page');
    const [isSearchingAllManuals, setIsSearchingAllManuals] = useState(false);

    // Effect to reset the view when the initial manual changes
    useEffect(() => {
        setSelectedManual(initialManual);
        const firstTocItem = initialManual.toc[0] || null;
        setSelectedTocItem(firstTocItem);
        setSelectedPage(pageContents[firstTocItem?.pageId || ''] || null);

        // Track manual open event
        analyticsService.track('manual_open', {
            machine_id: model.id,
            manual_id: initialManual.id,
            manual_title: initialManual.title
        });

    }, [initialManual, model.id]);

    const handleTocItemSelect = useCallback((tocItem: TocItem) => {
        setSelectedTocItem(tocItem);
        const page = pageContents[tocItem.pageId];
        if (page) {
            setSelectedPage(page);
        } else {
            setSelectedPage({
                title: tocItem.title,
                html: `<h1 class="text-2xl font-bold">${tocItem.title}</h1><p>Content for this section is not yet available.</p>`,
                type: 'content'
            });
        }
        
        // Track page view event
         analyticsService.track('page_view', {
            machine_id: model.id,
            manual_id: selectedManual.id,
            page_id: tocItem.pageId,
            chapter_title: tocItem.title,
        });

        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    }, [model.id, selectedManual.id]);
    
    const handleNavigate = useCallback((pageId: string) => {
        const findTocItem = (items: TocItem[]): TocItem | null => {
            for (const item of items) {
                if (item.pageId === pageId) return item;
                if (item.children) {
                    const found = findTocItem(item.children);
                    if (found) return found;
                }
            }
            return null;
        };

        const tocItem = findTocItem(selectedManual.toc);
        if (tocItem) {
            handleTocItemSelect(tocItem);
        } else {
             console.warn(`Could not find navigation target for pageId: ${pageId} within the current manual.`);
        }

    }, [selectedManual, handleTocItemSelect]);


    return (
        <div className="flex h-screen font-sans bg-brand-primary">
            <div className={`fixed top-0 left-0 z-30 p-2 md:hidden`}>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md bg-brand-secondary hover:bg-brand-accent">
                    {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>
            
            <LeftSidebar
                selectedManual={selectedManual}
                selectedTocItem={selectedTocItem}
                onTocItemSelect={handleTocItemSelect}
                isOpen={isSidebarOpen}
                searchQuery={searchQuery}
                searchScope={searchScope}
            />

            <div className="flex-1 flex flex-col min-w-0">
                <Header 
                    onGoBack={onGoBack}
                    onSearch={setSearchQuery} 
                    toggleAssistant={() => setIsAssistantOpen(!isAssistantOpen)}
                    isAssistantOpen={isAssistantOpen}
                    searchScope={searchScope}
                    onSearchScopeChange={setSearchScope}
                    isSearchingAllManuals={isSearchingAllManuals}
                    onSearchAllManualsChange={setIsSearchingAllManuals}
                    modelName={model.name}
                    modelId={model.id}
                />
                <main className="flex-1 flex flex-col overflow-hidden">
                    <Breadcrumb 
                        model={model} 
                        manual={selectedManual} 
                        onNavigateHome={onNavigateHome}
                        onNavigateToModel={onNavigateToModel}
                    />
                    <div className="flex-1 flex overflow-hidden">
                        {(searchScope === 'manual' || (isSearchingAllManuals && searchScope !== 'index')) && searchQuery ? (
                            <ManualSearchResults 
                                manual={selectedManual}
                                allPages={pageContents}
                                query={searchQuery}
                                onNavigate={(pageId) => {
                                    handleNavigate(pageId);
                                    setSearchScope('page');
                                }}
                            />
                        ) : (
                            <ContentViewer 
                                page={selectedPage} 
                                tocItem={selectedTocItem} 
                                manual={selectedManual}
                                generateProcedure={generateProcedureChecklist}
                                searchQuery={searchQuery}
                                searchScope={searchScope}
                                onNavigate={handleNavigate}
                            />
                        )}
                        <AiAssistant 
                            isOpen={isAssistantOpen} 
                            contextPage={selectedPage} 
                            manual={selectedManual}
                            troubleshoot={getTroubleshootingAdvice}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}