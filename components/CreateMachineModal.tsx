import React, { useState, useEffect } from 'react';
import type { Model } from '../types';
import { CloseIcon } from './icons/MenuIcon';
import { UploadIcon } from './icons/UploadIcon';

interface MachineModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (machineData: Omit<Model, 'manuals'>) => void;
    mode: 'create' | 'edit';
    initialData?: Omit<Model, 'manuals'> | null;
}

const InputField: React.FC<{ label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean; }> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-brand-light mb-1">{label}</label>
        <input id={id} name={id} type="text" {...props} className="w-full bg-brand-primary border border-brand-accent rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-highlight text-brand-text" />
    </div>
);

const emptyFormState = {
    id: '',
    name: '',
    modelCode: '',
    manufacturer: '',
    year: '',
    category: '',
    description: '',
    image: null as string | null,
    tags: [] as string[],
};


export const MachineModal: React.FC<MachineModalProps> = ({ isOpen, onClose, onSubmit, mode, initialData }) => {
    const [formData, setFormData] = useState(emptyFormState);
    const [tagInput, setTagInput] = useState('');

     useEffect(() => {
        if (isOpen) {
            if (mode === 'edit' && initialData) {
                setFormData({
                    id: initialData.id,
                    name: initialData.name || '',
                    modelCode: initialData.modelCode || '',
                    manufacturer: initialData.manufacturer || '',
                    year: initialData.year || '',
                    category: initialData.category || '',
                    description: initialData.description || '',
                    image: initialData.image || null,
                    tags: initialData.tags || [],
                });
            } else {
                setFormData(emptyFormState);
            }
             setTagInput('');
        }
    }, [isOpen, mode, initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({ ...prev, image: event.target?.result as string }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.endsWith(',')) {
            const newTag = value.slice(0, -1).trim();
            if (newTag && !formData.tags.includes(newTag)) {
                 setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
            }
            setTagInput('');
        } else {
            setTagInput(value);
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        let finalTags = [...formData.tags];
        const lastTag = tagInput.trim();
        if (lastTag && !finalTags.includes(lastTag)) {
            finalTags.push(lastTag);
        }

        const newMachine: Omit<Model, 'manuals'> = {
            ...formData,
            id: mode === 'create' ? `model-${Date.now()}` : formData.id,
            image: formData.image || undefined,
            tags: finalTags,
        };
        onSubmit(newMachine);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-brand-primary/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-brand-secondary w-full max-w-2xl rounded-lg shadow-xl border border-brand-accent/50 max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-brand-accent/50">
                    <h2 className="text-xl font-bold text-brand-highlight">{mode === 'edit' ? 'Edit Machine' : 'Create New Machine'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-brand-accent">
                        <CloseIcon className="w-6 h-6 text-brand-light" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Model Name" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                        <InputField label="Model Code" id="modelCode" name="modelCode" value={formData.modelCode} onChange={handleInputChange} required />
                        <InputField label="Manufacturer" id="manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleInputChange} required />
                        <InputField label="Year(s)" id="year" name="year" value={formData.year} onChange={handleInputChange} />
                        <div className="md:col-span-2">
                           <InputField label="Category" id="category" name="category" value={formData.category} onChange={handleInputChange} required />
                        </div>
                         <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-brand-light mb-1">Description</label>
                            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full bg-brand-primary border border-brand-accent rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-highlight text-brand-text"></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-brand-light mb-1">Primary Image</label>
                            <div className="mt-1 flex items-center space-x-4">
                                {formData.image ? (
                                    <img src={formData.image} alt="Preview" className="h-24 w-24 object-cover rounded-md bg-brand-primary" />
                                ) : (
                                    <div className="h-24 w-24 bg-brand-primary rounded-md flex items-center justify-center border border-dashed border-brand-accent">
                                        <span className="text-xs text-brand-light">No Image</span>
                                    </div>
                                )}
                                <label htmlFor="image-upload" className="cursor-pointer inline-flex items-center px-4 py-2 bg-brand-accent text-brand-text font-semibold rounded-lg shadow-sm hover:bg-brand-light hover:text-brand-primary transition-colors">
                                    <UploadIcon className="mr-2 h-5 w-5" />
                                    {formData.image ? 'Change Image' : 'Upload Image'}
                                </label>
                                <input id="image-upload" name="image-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>
                         <div className="md:col-span-2">
                            <label htmlFor="tags" className="block text-sm font-medium text-brand-light mb-1">Tags (comma-separated)</label>
                            <div className="flex flex-wrap items-center w-full bg-brand-primary border border-brand-accent rounded-md py-2 px-3">
                                {formData.tags.map(tag => (
                                    <span key={tag} className="flex items-center bg-brand-highlight/20 text-brand-highlight text-sm font-medium mr-2 mb-1 px-2 py-1 rounded-full">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)} className="ml-2 text-brand-highlight/70 hover:text-brand-highlight">
                                            <CloseIcon className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                                <input id="tags" name="tags" type="text" value={tagInput} onChange={handleTagInputChange} className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-brand-text" placeholder="Add a tag..." />
                            </div>
                        </div>
                    </div>
                
                    <div className="mt-8 pt-4 border-t border-brand-accent/50 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-brand-accent/80 hover:bg-brand-accent text-brand-text font-semibold">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-md bg-brand-highlight hover:bg-yellow-400 text-brand-primary font-bold">
                             {mode === 'edit' ? 'Save Changes' : 'Create Machine'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};