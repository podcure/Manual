import React from 'react';
import type { Model } from '../types';

interface HomePageProps {
    models: Model[];
    onSelectModel: (modelId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ models, onSelectModel }) => {
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <header className="flex-shrink-0 bg-brand-secondary/50 backdrop-blur-sm border-b border-brand-accent/50 p-4">
                 <h2 className="text-2xl font-bold text-brand-text">Home - Select a Machine</h2>
                 <p className="text-md text-brand-light">Choose a model to view its available manuals.</p>
            </header>
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                     {models.map(model => (
                        <div 
                            key={model.id} 
                            className="bg-brand-secondary rounded-lg shadow-lg border border-brand-accent/50 flex flex-col group cursor-pointer hover:border-brand-highlight hover:scale-105 transition-all duration-200"
                            onClick={() => onSelectModel(model.id)}
                        >
                            <div className="relative h-48 w-full">
                                <img src={model.image} alt={model.name} className="w-full h-full object-cover rounded-t-lg" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-4">
                                     <h3 className="text-xl font-bold text-brand-text">{model.name}</h3>
                                     <p className="text-sm text-brand-light">{model.modelCode}</p>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-brand-light">{model.category}</p>
                            </div>
                        </div>
                     ))}
                 </div>
            </main>
        </div>
    );
};