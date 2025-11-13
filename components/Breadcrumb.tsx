import React from 'react';
import type { Model, Manual } from '../types';

interface BreadcrumbProps {
    model: Model | null;
    manual: Manual | null;
    onNavigateHome: () => void;
    onNavigateToModel: () => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ model, manual, onNavigateHome, onNavigateToModel }) => {
    return (
        <nav className="flex-shrink-0 bg-brand-primary border-b border-brand-accent/30 px-4 py-2 text-sm text-brand-light" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex items-center">
                <li className="flex items-center">
                    <button onClick={onNavigateHome} className="hover:text-brand-highlight transition-colors">Home</button>
                </li>
                {model && (
                     <li className="flex items-center">
                        <span className="mx-2">/</span>
                        <button onClick={onNavigateToModel} className="hover:text-brand-highlight transition-colors">{model.name}</button>
                    </li>
                )}
                 {manual && (
                     <li className="flex items-center">
                        <span className="mx-2">/</span>
                        <span className="font-semibold text-brand-text">{manual.title}</span>
                    </li>
                )}
            </ol>
        </nav>
    );
};