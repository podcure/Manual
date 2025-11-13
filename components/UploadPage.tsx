import React, { useState } from 'react';
import type { Model, Manual } from '../types';
import { CreateManualModal } from './CreateManualModal';
import { UploadIcon } from './icons/UploadIcon';

interface UploadPageProps {
    allModels: Omit<Model, 'manuals'>[];
    onAddManual: (newManualData: Omit<Manual, 'id' | 'toc'>) => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({ allModels, onAddManual }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleAddManual = (newManualData: Omit<Manual, 'id' | 'toc'>) => {
        onAddManual(newManualData);
        setIsModalOpen(false);
    }
    
    return (
        <>
        <CreateManualModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddManual={handleAddManual}
            allModels={allModels}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
            <header className="flex-shrink-0 bg-brand-secondary/50 backdrop-blur-sm border-b border-brand-accent/50 p-4">
                 <h2 className="text-2xl font-bold text-brand-text">Upload Center</h2>
                 <p className="text-md text-brand-light">Upload new manuals and map them to machines.</p>
            </header>
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                 <div className="text-center">
                    <div className="p-8 border-2 border-dashed border-brand-accent rounded-lg">
                        <UploadIcon className="mx-auto h-12 w-12 text-brand-light" />
                        <h3 className="mt-4 text-lg font-medium text-brand-text">Upload a new manual</h3>
                        <p className="mt-1 text-sm text-brand-light">Upload a PDF and provide its details to add it to the library.</p>
                        <div className="mt-6">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-brand-primary bg-brand-highlight hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-primary focus:ring-brand-highlight"
                        >
                            <UploadIcon className="-ml-1 mr-2 h-5 w-5" />
                            Upload New Manual
                        </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        </>
    );
};
