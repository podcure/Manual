import React, { useState } from 'react';
import { SearchIcon, SparklesIcon, CloseIcon } from './icons/SparklesIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import type { SearchScope } from '../types';
import { analyticsService } from '../services/analyticsService';

interface HeaderProps {
    onSearch: (query: string) => void;
    toggleAssistant: () => void;
    isAssistantOpen: boolean;
    onGoBack?: () => void;
    searchScope: SearchScope;
    onSearchScopeChange: (scope: SearchScope) => void;
    onSearchAllManualsChange: (checked: boolean) => void;
    isSearchingAllManuals: boolean;
    modelName?: string;
    modelId?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
    onSearch, 
    toggleAssistant, 
    isAssistantOpen, 
    onGoBack, 
    searchScope, 
    onSearchScopeChange, 
    onSearchAllManualsChange,
    isSearchingAllManuals,
    modelName,
    modelId
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm);
        if(searchTerm.trim() && modelId) {
             analyticsService.track('search_query', {
                query_text: searchTerm,
                search_scope: searchScope,
                is_searching_all_manuals: isSearchingAllManuals,
                machine_id: modelId,
            });
        }
    };
    
    const handleClear = () => {
        setSearchTerm('');
        onSearch('');
    };

    const searchScopes: { id: SearchScope, label: string }[] = [
        { id: 'page', label: 'Page' },
        { id: 'index', label: 'Index' },
        { id: 'manual', label: 'Current Manual' },
    ];

    return (
        <header className="flex-shrink-0 bg-brand-secondary/50 backdrop-blur-sm border-b border-brand-accent/50 p-3 flex items-center justify-between z-10 flex-col sm:flex-row gap-3">
            <div className="flex items-center self-start sm:self-center">
                 {onGoBack && (
                    <button
                        onClick={onGoBack}
                        className="p-2 mr-2 rounded-full hover:bg-brand-accent transition-colors focus:outline-none focus:ring-2 focus:ring-brand-highlight"
                        aria-label="Back to machine selection"
                    >
                        <ArrowLeftIcon className="h-6 w-6 text-brand-light" />
                    </button>
                )}
            </div>
            <div className="flex-1 w-full max-w-2xl mx-auto flex flex-col items-center">
                <form onSubmit={handleSearchSubmit} className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-brand-light" />
                    </div>
                    <input
                        type="search"
                        placeholder="Search by keyword, symptom, part name..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                             if (e.target.value === '') {
                                onSearch('');
                            }
                        }}
                        className="w-full bg-brand-primary border border-brand-accent rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-highlight text-brand-text"
                    />
                    {searchTerm && (
                         <button
                            type="button"
                            onClick={handleClear}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            aria-label="Clear search"
                        >
                            <CloseIcon className="h-5 w-5 text-brand-light hover:text-brand-text" />
                        </button>
                    )}
                </form>
                 <div className="mt-2 flex items-center justify-center flex-wrap gap-2 text-sm w-full">
                    <div className="flex items-center bg-brand-primary border border-brand-accent rounded-lg p-1">
                        <span className="text-brand-light px-2">Search In:</span>
                        {searchScopes.map(scope => (
                            <button
                                key={scope.id}
                                onClick={() => onSearchScopeChange(scope.id)}
                                className={`px-3 py-1 rounded-md transition-colors ${
                                    searchScope === scope.id
                                    ? 'bg-brand-highlight text-brand-primary font-semibold'
                                    : 'text-brand-text hover:bg-brand-accent'
                                }`}
                            >
                                {scope.label}
                            </button>
                        ))}
                    </div>
                     <label className="flex items-center text-brand-light cursor-pointer">
                        <input
                            type="checkbox"
                            className="form-checkbox bg-brand-primary border-brand-accent text-brand-highlight focus:ring-brand-highlight"
                            checked={isSearchingAllManuals}
                            onChange={(e) => onSearchAllManualsChange(e.target.checked)}
                        />
                        <span className="ml-2">Search all manuals for {modelName}</span>
                    </label>
                </div>
            </div>
            <div className="self-end sm:self-center">
                <button
                    onClick={toggleAssistant}
                    className="ml-4 p-2 rounded-full hover:bg-brand-accent transition-colors focus:outline-none focus:ring-2 focus:ring-brand-highlight"
                    aria-label={isAssistantOpen ? "Close AI Assistant" : "Open AI Assistant"}
                >
                    {isAssistantOpen ? <CloseIcon className="h-6 w-6 text-brand-highlight" /> : <SparklesIcon className="h-6 w-6 text-brand-highlight" />}
                </button>
            </div>
        </header>
    );
};