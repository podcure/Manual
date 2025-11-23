import React, { useState } from 'react';
import type { Model, Manual } from '../types';
import { ManualType, Visibility } from '../types';
import { CloseIcon } from './icons/MenuIcon';

interface CreateManualModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddManual: (newManual: Omit<Manual, 'id' | 'toc'>) => void;
    allModels: Omit<Model, 'manuals'>[];
}

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string; id: string; }> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-brand-light mb-1">{label}</label>
        <input id={id} name={id} type="text" {...props} className="w-full bg-brand-primary border border-brand-accent rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-highlight text-brand-text" />
    </div>
);

const SelectField: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; id: string; children: React.ReactNode }> = ({ label, id, children, ...props }) => (
     <div>
        <label htmlFor={id} className="block text-sm font-medium text-brand-light mb-1">{label}</label>
        <select id={id} name={id} {...props} className="w-full bg-brand-primary border border-brand-accent rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-highlight text-brand-text">
            {children}
        </select>
    </div>
);


export const CreateManualModal: React.FC<CreateManualModalProps> = ({ isOpen, onClose, onAddManual, allModels }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState<ManualType>(ManualType.Service);
    const [version, setVersion] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [language, setLanguage] = useState('English');
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Public);
    const [mappedMachineIds, setMappedMachineIds] = useState<string[]>([]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddManual({
            title,
            type,
            version,
            publishedDate,
            language,
            visibility,
            mappedMachineIds,
        });
        // In a real app you'd want to clear the form state
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-brand-primary/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-brand-secondary w-full max-w-2xl rounded-lg shadow-xl border border-brand-accent/50 max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-brand-accent/50">
                    <h2 className="text-xl font-bold text-brand-highlight">Upload New Manual</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-brand-accent">
                        <CloseIcon className="w-6 h-6 text-brand-light" />
                    </button>
                </div>
                 <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                    {/* In a real app, this would be a file input */}
                    <div className="p-4 border-2 border-dashed border-brand-accent rounded-md text-center">
                        <p className="text-brand-text">PDF Upload Area</p>
                        <p className="text-sm text-brand-light">(File input UI is omitted for this demo)</p>
                    </div>

                    <InputField label="Manual Title" id="title" value={title} onChange={e => setTitle(e.target.value)} required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField label="Manual Type" id="type" value={type} onChange={e => setType(e.target.value as ManualType)}>
                            {Object.values(ManualType).map(t => <option key={t} value={t}>{t}</option>)}
                        </SelectField>
                        <InputField label="Version" id="version" value={version} onChange={e => setVersion(e.target.value)} />
                        <InputField label="Published Date" id="publishedDate" value={publishedDate} onChange={e => setPublishedDate(e.target.value)} type="date" />
                         <SelectField label="Language" id="language" value={language} onChange={e => setLanguage(e.target.value)}>
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                        </SelectField>
                        <SelectField label="Visibility" id="visibility" value={visibility} onChange={e => setVisibility(e.target.value as Visibility)}>
                             {Object.values(Visibility).map(v => <option key={v} value={v}>{v}</option>)}
                        </SelectField>
                    </div>

                    <div>
                        <label htmlFor="map-machines" className="block text-sm font-medium text-brand-light mb-1">Map to Machine(s)</label>
                        <select 
                            id="map-machines" 
                            multiple 
                            value={mappedMachineIds}
                            onChange={e => setMappedMachineIds(Array.from(e.target.selectedOptions, (option: HTMLOptionElement) => option.value))}
                            className="w-full h-32 bg-brand-primary border border-brand-accent rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-highlight text-brand-text"
                        >
                            {allModels.map(model => (
                                <option key={model.id} value={model.id}>{model.name} ({model.modelCode})</option>
                            ))}
                        </select>
                        <p className="text-xs text-brand-light mt-1">Hold Ctrl/Cmd to select multiple machines.</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-brand-accent/50 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-brand-accent/80 hover:bg-brand-accent text-brand-text font-semibold">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-md bg-brand-highlight hover:bg-yellow-400 text-brand-primary font-bold">Add Manual</button>
                    </div>
                 </form>
            </div>
        </div>
    );
};