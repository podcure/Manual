import React from 'react';
import type { Model, Manual } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface ManualSelectionPageProps {
    model: Model;
    onSelectManual: (manualId: string) => void;
    onGoBack: () => void;
}

export const ManualSelectionPage: React.FC<ManualSelectionPageProps> = ({ model, onSelectManual, onGoBack }) => {
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <header className="flex-shrink-0 bg-brand-secondary/50 backdrop-blur-sm border-b border-brand-accent/50 p-4">
                <div className="flex items-center">
                    <button
                        onClick={onGoBack}
                        className="p-2 mr-4 rounded-full hover:bg-brand-accent transition-colors focus:outline-none focus:ring-2 focus:ring-brand-highlight"
                        aria-label="Back to machine selection"
                    >
                        <ArrowLeftIcon className="h-6 w-6 text-brand-light" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-brand-text">{model.name}</h2>
                        <p className="text-md text-brand-light">Select a manual to view</p>
                    </div>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                {model.manuals && model.manuals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {model.manuals.map(manual => (
                            <div 
                                key={manual.id} 
                                className="bg-brand-secondary rounded-lg shadow-lg border border-brand-accent/50 flex flex-col group cursor-pointer hover:border-brand-highlight transition-colors"
                                onClick={() => onSelectManual(manual.id)}
                            >
                                <div className="p-5 flex-grow">
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-lg font-bold text-brand-highlight flex items-center">
                                            <BookOpenIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                                            {manual.title}
                                        </h3>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${manual.type === 'Service' ? 'bg-blue-500/50 text-blue-200' : 'bg-gray-500/50 text-gray-200'}`}>
                                            {manual.type}
                                        </span>
                                    </div>
                                    <div className="text-sm text-brand-light mt-3 space-y-1">
                                        <p><strong>Version:</strong> {manual.version}</p>
                                        <p><strong>Published:</strong> {manual.publishedDate}</p>
                                    </div>
                                </div>
                                <div className="bg-brand-accent/30 p-3 mt-auto">
                                    <div className="w-full text-center p-2 rounded-md bg-brand-accent/80 group-hover:bg-brand-accent text-brand-text font-semibold transition-colors">
                                        Open Manual
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-brand-light text-lg">No manuals found for this machine.</p>
                    </div>
                )}
            </main>
        </div>
    );
};