import React, { useState } from 'react';
import type { Model } from '../types';
import { CreateMachineModal } from './CreateMachineModal';
import { PlusIcon, EditIcon, TrashIcon } from './icons/AdminIcons';

interface MasterPageProps {
    allModels: Omit<Model, 'manuals'>[];
    onAddModel: (newModelData: Omit<Model, 'manuals' | 'id'>) => void;
}

export const MasterPage: React.FC<MasterPageProps> = ({ allModels, onAddModel }) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleAddModel = (newModel: Omit<Model, 'manuals' | 'id'>) => {
        onAddModel(newModel);
        setIsCreateModalOpen(false);
    };

    const handleAction = (action: string, id: string) => {
        alert(`${action} on item ${id}. \nThis would open a form/modal or confirmation dialog.`);
    }

    return (
        <>
            <CreateMachineModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onAddMachine={handleAddModel}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex-shrink-0 bg-brand-secondary/50 backdrop-blur-sm border-b border-brand-accent/50 p-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-brand-text">Master - Machines / Models</h2>
                        <p className="text-md text-brand-light">Manage machine definitions.</p>
                    </div>
                     <button onClick={() => setIsCreateModalOpen(true)} className="inline-flex items-center px-4 py-2 rounded-md bg-brand-accent hover:bg-brand-light hover:text-brand-primary text-brand-text font-semibold">
                        <PlusIcon className="mr-2" /> Add New Machine
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="bg-brand-secondary border border-brand-accent/50 rounded-lg shadow-lg">
                        <table className="w-full text-left">
                            <thead className="border-b border-brand-accent/50">
                                <tr>
                                    <th className="p-4">Model Name</th>
                                    <th className="p-4">Model Code</th>
                                    <th className="p-4">Manufacturer</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allModels.map(model => (
                                    <tr key={model.id} className="border-b border-brand-accent/20 last:border-b-0">
                                        <td className="p-4 font-semibold">{model.name}</td>
                                        <td className="p-4 text-brand-light">{model.modelCode}</td>
                                        <td className="p-4 text-brand-light">{model.manufacturer}</td>
                                        <td className="p-4 text-brand-light">{model.category}</td>
                                        <td className="p-4 text-right">
                                             <div className="flex items-center justify-end space-x-3">
                                                 <button onClick={() => handleAction('Edit Machine', model.id)} className="text-brand-light hover:text-brand-highlight"><EditIcon /></button>
                                                 <button onClick={() => handleAction('Delete Machine', model.id)} className="text-brand-light hover:text-red-500"><TrashIcon /></button>
                                             </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </>
    );
};
