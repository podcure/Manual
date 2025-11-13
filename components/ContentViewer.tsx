
import React, { useState, useEffect, useRef } from 'react';
import type { PageContent, TocItem, Manual, ProcedureDetails, SearchScope } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface ContentViewerProps {
    page: PageContent | null;
    tocItem: TocItem | null;
    manual: Manual | null;
    generateProcedure: (htmlContent: string) => Promise<ProcedureDetails | null>;
    searchQuery: string;
    searchScope: SearchScope;
    onNavigate: (pageId: string) => void;
}

export const ContentViewer: React.FC<ContentViewerProps> = ({ page, tocItem, manual, generateProcedure, searchQuery, searchScope, onNavigate }) => {
    const [procedureDetails, setProcedureDetails] = useState<ProcedureDetails | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [highlightedHtml, setHighlightedHtml] = useState('');
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setProcedureDetails(null);
        setError(null);
    }, [page]);
    
    useEffect(() => {
        if (!page) return;

        if (!searchQuery || searchScope === 'index') {
            setHighlightedHtml(page.html);
            return;
        }

        try {
            // Escape special characters in search query for regex
            const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedQuery})`, 'gi');
            const newHtml = page.html.replace(regex, `<mark class="bg-brand-highlight text-brand-primary rounded px-1">$1</mark>`);
            setHighlightedHtml(newHtml);
        } catch (e) {
            console.error("Error creating regex for highlighting:", e);
            setHighlightedHtml(page.html);
        }

    }, [page, searchQuery, searchScope]);

    useEffect(() => {
        const contentElement = contentRef.current;
        if (!contentElement) return;

        const interactiveElements = contentElement.querySelectorAll('[data-link-page-id]');
        
        const handleClick = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const pageId = target.dataset.linkPageId;
            if (pageId) {
                onNavigate(pageId);
            }
        };

        interactiveElements.forEach(el => {
            el.addEventListener('click', handleClick);
        });

        return () => {
            interactiveElements.forEach(el => {
                el.removeEventListener('click', handleClick);
            });
        };
    }, [highlightedHtml, onNavigate]);

    const handleGenerateClick = async () => {
        if (!page) return;
        setIsGenerating(true);
        setError(null);
        setProcedureDetails(null);
        try {
            const details = await generateProcedure(page.html);
            setProcedureDetails(details);
        } catch (err) {
            setError('Failed to generate procedure. Please try again.');
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    };

    if (!page) {
        return <div className="flex-1 p-8 text-center">Select an item from the sidebar to view content.</div>;
    }
    
    return (
        <div className="flex-1 bg-brand-primary p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <div className="mb-4">
                     <p className="text-sm text-brand-light">{manual?.title} / {tocItem?.title || page.title}</p>
                     <h1 className="text-3xl font-bold text-brand-text mt-1">{tocItem?.title || page.title}</h1>
                </div>

                {page.type === 'procedure' && !procedureDetails && (
                    <div className="my-6">
                        <button
                            onClick={handleGenerateClick}
                            disabled={isGenerating}
                            className="inline-flex items-center px-4 py-2 bg-brand-highlight text-brand-primary font-semibold rounded-lg shadow-md hover:bg-yellow-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {isGenerating ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <SparklesIcon className="mr-2 h-5 w-5" />
                                    Generate Step-by-Step Procedure
                                </>
                            )}
                        </button>
                        {error && <p className="text-red-400 mt-2">{error}</p>}
                    </div>
                )}
                
                {procedureDetails ? (
                    <GeneratedProcedureView details={procedureDetails} />
                ) : (
                    <div ref={contentRef} className="prose prose-invert max-w-none prose-h2:text-brand-text prose-h3:text-brand-light prose-strong:text-brand-text prose-a:text-brand-highlight" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
                )}
            </div>
        </div>
    );
};

const GeneratedProcedureView: React.FC<{ details: ProcedureDetails }> = ({ details }) => (
    <div className="bg-brand-secondary p-6 rounded-lg border border-brand-accent">
        <h2 className="text-2xl font-bold text-brand-highlight mb-4">{details.title}</h2>
        
        {details.warnings.length > 0 && (
            <div className="mb-6 bg-red-900/50 border border-red-500 p-4 rounded-md">
                <h3 className="font-bold text-red-300">Safety Precautions</h3>
                <ul className="list-disc list-inside mt-2 text-red-200">
                    {details.warnings.map((warning, i) => <li key={i}>{warning}</li>)}
                </ul>
            </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
                <h3 className="font-bold text-brand-light">Tools Required</h3>
                <ul className="list-disc list-inside mt-2 text-brand-text">
                    {details.tools.map((tool, i) => <li key={i}>{tool}</li>)}
                </ul>
            </div>
             <div>
                <h3 className="font-bold text-brand-light">Torque Specs</h3>
                <ul className="list-disc list-inside mt-2 text-brand-text">
                    {details.torqueSpecs.map((spec, i) => <li key={i}><strong>{spec.part}:</strong> {spec.spec}</li>)}
                </ul>
            </div>
        </div>

        <div>
            <h3 className="text-xl font-bold text-brand-light mb-2">Steps</h3>
            <ol className="list-decimal list-outside pl-5 space-y-3">
                {details.steps.map((step) => (
                    <li key={step.step} className="pl-2">
                        {step.description}
                    </li>
                ))}
            </ol>
        </div>
    </div>
);
