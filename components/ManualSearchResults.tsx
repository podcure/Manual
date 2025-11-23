import React, { useMemo } from 'react';
import type { Manual, PageContent, SearchResult, TocItem } from '../types';
import { ListIcon } from './icons/ListIcon';
import { analyticsService } from '../services/analyticsService';

interface ManualSearchResultsProps {
    manuals: Manual[];
    allPages: Record<string, PageContent>;
    query: string;
    onResultClick: (result: SearchResult) => void;
}

// Helper to get a flat list of all pageIds and their corresponding TOC titles from a nested TOC structure
const getPageIdToTitleMap = (toc: TocItem[]): Map<string, string> => {
    const map = new Map<string, string>();
    const traverse = (items: TocItem[]) => {
        for (const item of items) {
            map.set(item.pageId, item.title);
            if (item.children) {
                traverse(item.children);
            }
        }
    };
    traverse(toc);
    return map;
};

// Helper to create a snippet from text content
const createSnippet = (text: string, query: string, snippetLength = 150): string => {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) return text.substring(0, snippetLength) + (text.length > snippetLength ? '...' : '');

    const start = Math.max(0, index - Math.floor((snippetLength - query.length) / 2));
    const end = Math.min(text.length, start + snippetLength);
    let snippet = text.substring(start, end);

    // Add ellipsis if snippet is truncated
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';
    
    // Highlight the query within the snippet
    const regex = new RegExp(`(${query})`, 'gi');
    return snippet.replace(regex, `<mark class="bg-brand-highlight text-brand-primary rounded px-1">$1</mark>`);
};


export const ManualSearchResults: React.FC<ManualSearchResultsProps> = ({ manuals, allPages, query, onResultClick }) => {
    const searchResults = useMemo<SearchResult[]>(() => {
        if (!manuals || manuals.length === 0 || !query) return [];

        const allResults: SearchResult[] = [];
        const tempDiv = document.createElement('div');

        for (const manual of manuals) {
            const pageIdToTitle = getPageIdToTitleMap(manual.toc);
            for (const [pageId, tocItemTitle] of pageIdToTitle.entries()) {
                const page = allPages[pageId];
                if (page) {
                    tempDiv.innerHTML = page.html;
                    const pageText = tempDiv.textContent || "";
                    
                    if (pageText.toLowerCase().includes(query.toLowerCase())) {
                        const snippet = createSnippet(pageText, query);
                        allResults.push({ 
                            pageId, 
                            tocItemTitle, 
                            snippet,
                            manualId: manual.id,
                            manualTitle: manual.title,
                        });
                    }
                }
            }
        }
        return allResults;
    }, [manuals, allPages, query]);

    const handleResultClick = (result: SearchResult) => {
        analyticsService.track('search_result_click', {
            query_text: query,
            clicked_page_id: result.pageId,
            clicked_toc_title: result.tocItemTitle,
        });
        onResultClick(result);
    };

    return (
        <div className="flex-1 bg-brand-primary p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-brand-text flex items-center">
                        <ListIcon className="h-6 w-6 mr-3 text-brand-light" />
                        Search Results for "{query}"
                    </h1>
                     <p className="text-brand-light mt-1">
                        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} {manuals.length > 1 ? 'across all manuals' : `in "${manuals[0]?.title}"`}.
                    </p>
                </div>
                
                {searchResults.length > 0 ? (
                    <div className="space-y-4">
                        {searchResults.map((result, index) => (
                            <div
                                key={`${result.pageId}-${index}`}
                                className="bg-brand-secondary p-4 rounded-lg border border-brand-accent/50 cursor-pointer hover:border-brand-highlight transition-colors"
                                onClick={() => handleResultClick(result)}
                            >
                                <div className="flex justify-between items-start">
                                    <h2 className="text-lg font-semibold text-brand-highlight">{result.tocItemTitle}</h2>
                                     {manuals.length > 1 && (
                                        <span className="text-xs font-medium text-brand-light bg-brand-accent/50 px-2 py-1 rounded-md whitespace-nowrap">{result.manualTitle}</span>
                                    )}
                                </div>
                                <p className="text-brand-light text-sm mt-2" dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-brand-light">No results found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};