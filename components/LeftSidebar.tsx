import React, { useState, useEffect } from 'react';
import { type Manual, type TocItem } from '../types';
import { ChevronDownIcon, ChevronRightIcon } from './icons/ChevronRightIcon';

interface LeftSidebarProps {
    selectedManual: Manual;
    selectedTocItem: TocItem | null;
    onTocItemSelect: (tocItem: TocItem) => void;
    isOpen: boolean;
    searchQuery: string;
    searchScope: 'index' | 'page' | 'manual' | 'all-manuals';
}

const filterTocItems = (items: TocItem[], query: string): TocItem[] => {
    const lowerCaseQuery = query.toLowerCase();
    return items.map((item): TocItem | null => {
        const children = item.children ? filterTocItems(item.children, query) : undefined;
        if (item.title.toLowerCase().includes(lowerCaseQuery) || (children && children.length > 0)) {
            return { ...item, children };
        }
        return null;
    }).filter((item): item is TocItem => item !== null);
};


export const LeftSidebar: React.FC<LeftSidebarProps> = ({ selectedManual, selectedTocItem, onTocItemSelect, isOpen, searchQuery, searchScope }) => {
    
    const filteredToc = (searchScope === 'index' && searchQuery) ? filterTocItems(selectedManual.toc, searchQuery) : selectedManual.toc;
    const isInitiallyExpanded = !!searchQuery && searchScope === 'index';

    return (
        <aside className={`fixed top-0 left-0 h-full bg-brand-secondary w-80 flex-shrink-0 flex flex-col border-r border-brand-accent/50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:static z-20`}>
            <div className="p-4 border-b border-brand-accent/50">
                <h1 className="text-xl font-bold text-brand-highlight">{selectedManual.title}</h1>
                <p className="text-sm text-brand-light">Table of Contents</p>
            </div>
            <nav className="flex-1 overflow-y-auto p-2">
                {filteredToc.map(item => (
                    <TocNode
                        key={item.id}
                        item={item}
                        selectedTocItem={selectedTocItem}
                        onTocItemSelect={onTocItemSelect}
                        level={0}
                        isInitiallyExpanded={isInitiallyExpanded}
                    />
                ))}
            </nav>
        </aside>
    )
}

const TocNode: React.FC<{ 
    item: TocItem; 
    selectedTocItem: TocItem | null; 
    onTocItemSelect: (tocItem: TocItem) => void; 
    level: number; 
    isInitiallyExpanded: boolean; 
}> = ({ item, selectedTocItem, onTocItemSelect, level, isInitiallyExpanded }) => {
    const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);
    const isSelected = item.id === selectedTocItem?.id;

     useEffect(() => {
        setIsExpanded(isInitiallyExpanded);
    }, [isInitiallyExpanded]);

    return (
        <div>
            <div className={`flex items-center p-1.5 rounded-md cursor-pointer ${isSelected ? 'bg-brand-highlight/20' : 'hover:bg-brand-accent/50'}`}>
                {item.children && item.children.length > 0 && (
                    <button onClick={() => setIsExpanded(!isExpanded)} className="mr-1">
                        {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
                    </button>
                )}
                <span onClick={() => onTocItemSelect(item)} className={`flex-1 ${(!item.children || item.children.length === 0) ? 'ml-5' : ''} ${isSelected ? 'text-brand-highlight font-semibold' : 'text-brand-text'}`}>
                    {item.title}
                </span>
            </div>
            {isExpanded && item.children && (
                <div className="pl-5 border-l-2 border-brand-accent/30 ml-3">
                    {item.children.map(child => (
                        <TocNode
                            key={child.id}
                            item={child}
                            selectedTocItem={selectedTocItem}
                            onTocItemSelect={onTocItemSelect}
                            level={level + 1}
                            isInitiallyExpanded={isInitiallyExpanded}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};