
import React, { useState, useEffect } from 'react';
import { mockPlans, mockUsers, mockInvoices, mockAuditLogs } from '../data/mockData';
import { UserRole, User, BrandingConfig } from '../types';
import { EditIcon, TrashIcon, PlusIcon } from './icons/AdminIcons';
import { BuildingOfficeIcon, CreditCardIcon, UsersIcon, ShieldCheckIcon, DocumentTextIcon } from './icons/SettingsIcons';
import { UploadIcon } from './icons/UploadIcon';

// --- Overview View ---
export const SettingsOverview: React.FC = () => {
    return (
        <div className="space-y-6 max-w-6xl">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-brand-secondary p-6 rounded-lg border border-brand-accent/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-brand-light">Current Plan</p>
                            <h3 className="text-2xl font-bold text-brand-highlight mt-1">Standard</h3>
                            <p className="text-xs text-brand-light mt-1">Renews on Jun 1, 2024</p>
                        </div>
                        <div className="p-2 bg-brand-accent/30 rounded-lg">
                            <CreditCardIcon className="w-6 h-6 text-brand-highlight" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="w-full bg-brand-primary rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" style={{ width: '60%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-brand-light mt-1">
                            <span>12/20 Machines</span>
                            <span>60% Used</span>
                        </div>
                    </div>
                    <button className="mt-4 w-full py-2 rounded-md bg-brand-accent/30 hover:bg-brand-accent text-brand-text text-sm font-semibold transition-colors border border-brand-accent/50">Manage Subscription</button>
                </div>

                <div className="bg-brand-secondary p-6 rounded-lg border border-brand-accent/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-brand-light">Users</p>
                            <h3 className="text-2xl font-bold text-brand-text mt-1">{mockUsers.length} / 10</h3>
                            <p className="text-xs text-brand-light mt-1">Active Team Members</p>
                        </div>
                        <div className="p-2 bg-brand-accent/30 rounded-lg">
                            <UsersIcon className="w-6 h-6 text-brand-highlight" />
                        </div>
                    </div>
                     <div className="mt-4 flex -space-x-2 overflow-hidden">
                        {mockUsers.slice(0,5).map(u => (
                             <img key={u.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-brand-secondary" src={u.avatar || `https://ui-avatars.com/api/?name=${u.name}&background=random`} alt={u.name} />
                        ))}
                    </div>
                    <button className="mt-4 w-full py-2 rounded-md bg-brand-accent/30 hover:bg-brand-accent text-brand-text text-sm font-semibold transition-colors border border-brand-accent/50">Invite User</button>
                </div>

                 <div className="bg-brand-secondary p-6 rounded-lg border border-brand-accent/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-brand-light">Monthly Spend</p>
                            <h3 className="text-2xl font-bold text-brand-text mt-1">$149.00</h3>
                            <p className="text-xs text-green-400 mt-1">No overages this month</p>
                        </div>
                        <div className="p-2 bg-brand-accent/30 rounded-lg">
                            <DocumentTextIcon className="w-6 h-6 text-brand-highlight" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                        <span className="text-sm text-brand-light">Last Invoice: #INV-2024-001</span>
                        <button className="text-brand-highlight text-sm hover:underline">Download</button>
                    </div>
                </div>
            </div>

            <div className="bg-brand-secondary border border-brand-accent/50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-brand-text mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="p-4 border border-brand-accent rounded-lg hover:bg-brand-accent/30 hover:border-brand-highlight transition-all flex flex-col items-center text-center group">
                        <PlusIcon className="w-6 h-6 text-brand-light group-hover:text-brand-highlight mb-2 transition-colors" />
                        <span className="text-sm font-medium text-brand-text group-hover:text-white">Add Machine</span>
                    </button>
                     <button className="p-4 border border-brand-accent rounded-lg hover:bg-brand-accent/30 hover:border-brand-highlight transition-all flex flex-col items-center text-center group">
                        <UsersIcon className="w-6 h-6 text-brand-light group-hover:text-brand-highlight mb-2 transition-colors" />
                        <span className="text-sm font-medium text-brand-text group-hover:text-white">Invite Team</span>
                    </button>
                     <button className="p-4 border border-brand-accent rounded-lg hover:bg-brand-accent/30 hover:border-brand-highlight transition-all flex flex-col items-center text-center group">
                        <BuildingOfficeIcon className="w-6 h-6 text-brand-light group-hover:text-brand-highlight mb-2 transition-colors" />
                        <span className="text-sm font-medium text-brand-text group-hover:text-white">Update Branding</span>
                    </button>
                     <button className="p-4 border border-brand-accent rounded-lg hover:bg-brand-accent/30 hover:border-brand-highlight transition-all flex flex-col items-center text-center group">
                        <CreditCardIcon className="w-6 h-6 text-brand-light group-hover:text-brand-highlight mb-2 transition-colors" />
                        <span className="text-sm font-medium text-brand-text group-hover:text-white">View Invoices</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Plans & Billing View ---
export const PlansAndBilling: React.FC = () => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <div className="space-y-8 max-w-6xl">
            {/* Plan Comparison */}
            <div>
                <div className="flex justify-center mb-8">
                    <div className="bg-brand-secondary border border-brand-accent p-1 rounded-xl inline-flex shadow-inner">
                        <button 
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${billingCycle === 'monthly' ? 'bg-brand-highlight text-brand-primary shadow-md' : 'text-brand-light hover:text-brand-text'}`}
                            onClick={() => setBillingCycle('monthly')}
                        >
                            Monthly
                        </button>
                        <button 
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${billingCycle === 'yearly' ? 'bg-brand-highlight text-brand-primary shadow-md' : 'text-brand-light hover:text-brand-text'}`}
                            onClick={() => setBillingCycle('yearly')}
                        >
                            Yearly (Save 15%)
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mockPlans.map(plan => (
                        <div key={plan.id} className={`relative bg-brand-secondary rounded-xl border transition-all duration-300 ${plan.isPopular ? 'border-brand-highlight shadow-[0_0_20px_rgba(255,193,7,0.15)] scale-105 z-10' : 'border-brand-accent/50 hover:border-brand-accent' } p-6 flex flex-col`}>
                            {plan.isPopular && <div className="absolute top-0 right-0 bg-brand-highlight text-brand-primary text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">POPULAR</div>}
                            <h3 className="text-xl font-bold text-brand-text">{plan.name}</h3>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-extrabold text-brand-text tracking-tight">${billingCycle === 'monthly' ? plan.priceMonthly : Math.round(plan.priceYearly / 12)}</span>
                                <span className="ml-1 text-brand-light">/mo</span>
                            </div>
                            <p className="text-sm text-brand-light mt-2">{plan.description}</p>
                            <ul className="mt-8 space-y-4 flex-1">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <svg className={`h-5 w-5 mr-3 flex-shrink-0 ${feature.included ? 'text-green-400' : 'text-brand-accent'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {feature.included ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
                                        </svg>
                                        <span className={`text-sm ${feature.included ? 'text-brand-text' : 'text-brand-light line-through'}`}>{feature.name}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className={`mt-8 w-full py-3 rounded-lg font-bold transition-colors ${plan.slug === 'standard' ? 'bg-brand-accent cursor-default text-brand-text opacity-60' : 'bg-brand-highlight hover:bg-yellow-400 text-brand-primary shadow-lg shadow-brand-highlight/20'}`}>
                                {plan.slug === 'standard' ? 'Current Plan' : 'Upgrade'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Billing History */}
            <div className="bg-brand-secondary border border-brand-accent/50 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-brand-accent/50 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-brand-text">Billing History</h3>
                    <button className="text-sm text-brand-highlight hover:underline">Update Payment Method</button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-brand-primary/50 text-xs uppercase text-brand-light">
                        <tr>
                            <th className="p-4">Date</th>
                            <th className="p-4">Description</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Invoice</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-accent/20">
                        {mockInvoices.map(inv => (
                            <tr key={inv.id}>
                                <td className="p-4 text-brand-text">{inv.date}</td>
                                <td className="p-4 text-brand-light">{inv.items[0]}</td>
                                <td className="p-4 text-brand-text font-medium">${inv.amount.toFixed(2)}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-900/50">{inv.status}</span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-brand-highlight hover:text-yellow-300 text-sm font-medium">Download PDF</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Users & Roles View ---
export const UsersAndRoles: React.FC = () => {
    const [users, setUsers] = useState<User[]>(mockUsers);

    return (
        <div className="max-w-6xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-brand-text">Team Members</h3>
                    <p className="text-brand-light text-sm">Manage access and roles.</p>
                </div>
                <button className="inline-flex items-center px-4 py-2 rounded-md bg-brand-highlight hover:bg-yellow-400 text-brand-primary font-bold shadow-lg shadow-brand-highlight/20">
                    <PlusIcon className="w-5 h-5 mr-2" /> Invite User
                </button>
            </div>

            <div className="bg-brand-secondary border border-brand-accent/50 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-brand-primary/50 text-xs uppercase text-brand-light">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Last Login</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-accent/20">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-brand-accent/10 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center">
                                        <img className="h-8 w-8 rounded-full mr-3 ring-2 ring-brand-accent" src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="" />
                                        <div>
                                            <div className="font-medium text-brand-text">{user.name}</div>
                                            <div className="text-xs text-brand-light">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <select 
                                        className="bg-brand-primary border border-brand-accent rounded text-sm py-1 px-2 text-brand-text focus:ring-1 focus:ring-brand-highlight outline-none"
                                        value={user.role}
                                        onChange={() => {}} 
                                    >
                                        <option>Super Admin</option>
                                        <option>Billing Admin</option>
                                        <option>Technician</option>
                                        <option>Read-only</option>
                                    </select>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                        user.status === 'Active' ? 'bg-green-900/20 text-green-400 border-green-900/50' :
                                        user.status === 'Invited' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-900/50' :
                                        'bg-red-900/20 text-red-400 border-red-900/50'
                                    }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-brand-light">{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : '-'}</td>
                                <td className="p-4 text-right">
                                    <button className="text-brand-light hover:text-red-400 transition-colors">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Branding View ---
interface BrandingSettingsProps {
    branding: BrandingConfig;
    onUpdate: (config: BrandingConfig) => void;
}

export const BrandingSettings: React.FC<BrandingSettingsProps> = ({ branding, onUpdate }) => {
    const [formData, setFormData] = useState(branding);

    useEffect(() => {
        setFormData(branding);
    }, [branding]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setFormData(prev => ({ ...prev, logoUrl: event.target?.result as string }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        onUpdate(formData);
        // You could show a toast here
    };

    return (
        <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="bg-brand-secondary border border-brand-accent/50 rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-brand-text mb-4 border-b border-brand-accent/30 pb-2">Brand Identity</h3>
                    <div className="space-y-6">
                         <div>
                            <label className="block text-sm font-medium text-brand-light mb-2">Company Logo</label>
                            <div className="flex items-center space-x-4">
                                <div className="h-20 w-20 bg-brand-primary border border-dashed border-brand-accent rounded-lg flex items-center justify-center overflow-hidden">
                                    {formData.logoUrl ? (
                                        <img src={formData.logoUrl} alt="Logo" className="h-full w-full object-contain" />
                                    ) : (
                                        <span className="text-xs text-brand-light">No Logo</span>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="logo-upload" className="cursor-pointer inline-flex items-center px-4 py-2 bg-brand-accent/50 hover:bg-brand-accent text-brand-text font-medium rounded-md transition-colors border border-brand-accent">
                                        <UploadIcon className="mr-2 h-4 w-4" />
                                        Upload New Logo
                                    </label>
                                    <input id="logo-upload" type="file" accept="image/*" className="sr-only" onChange={handleLogoUpload} />
                                    <p className="text-xs text-brand-light mt-2">Recommended: PNG or SVG, max 2MB.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-brand-light mb-1">Product Name</label>
                            <input type="text" name="productName" value={formData.productName} onChange={handleChange} className="w-full bg-brand-primary border border-brand-accent rounded-md p-2 text-brand-text focus:ring-brand-highlight focus:outline-none" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-brand-light mb-1">Primary Color</label>
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 rounded-md border border-brand-accent shadow-sm" style={{ backgroundColor: formData.primaryColor }}></div>
                                    <input type="text" name="primaryColor" value={formData.primaryColor} onChange={handleChange} className="flex-1 bg-brand-primary border border-brand-accent rounded-md p-2 text-brand-text focus:ring-brand-highlight focus:outline-none" />
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-brand-light mb-1">Accent Color</label>
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 rounded-md border border-brand-accent shadow-sm" style={{ backgroundColor: formData.accentColor }}></div>
                                    <input type="text" name="accentColor" value={formData.accentColor} onChange={handleChange} className="flex-1 bg-brand-primary border border-brand-accent rounded-md p-2 text-brand-text focus:ring-brand-highlight focus:outline-none" />
                                </div>
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-brand-light mb-1">Custom Domain (CNAME)</label>
                            <input type="text" name="customDomain" value={formData.customDomain} onChange={handleChange} className="w-full bg-brand-primary border border-brand-accent rounded-md p-2 text-brand-text focus:ring-brand-highlight focus:outline-none" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button onClick={handleSave} className="px-6 py-2 bg-brand-highlight hover:bg-yellow-400 text-brand-primary font-bold rounded-md shadow-lg shadow-brand-highlight/20 transition-all">Save Changes</button>
                </div>
            </div>

            <div className="bg-brand-primary border border-brand-accent rounded-lg p-8 flex flex-col items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
                 <p className="text-brand-light mb-4 text-sm font-medium uppercase tracking-wide">Live Preview</p>
                 
                 <div className="w-full max-w-xs bg-brand-secondary rounded-lg shadow-2xl border border-brand-accent overflow-hidden">
                     <div className="h-12 flex items-center px-4 border-b border-brand-accent/50" style={{ backgroundColor: formData.primaryColor }}>
                         {formData.logoUrl ? (
                            <img src={formData.logoUrl} className="h-6 w-auto" alt="Logo" />
                         ) : (
                             <span className="font-bold text-white">{formData.productName}</span>
                         )}
                     </div>
                     <div className="p-4 space-y-3">
                         <div className="h-4 bg-brand-accent/20 rounded w-3/4"></div>
                         <div className="h-4 bg-brand-accent/20 rounded w-1/2"></div>
                         <div className="mt-4">
                            <button className="w-full py-2 rounded text-xs font-bold text-brand-primary" style={{ backgroundColor: formData.accentColor }}>Call to Action</button>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    );
};

// --- Audit Logs View ---
export const AuditLogs: React.FC = () => {
    return (
        <div className="max-w-6xl">
            <h3 className="text-xl font-bold text-brand-text mb-4">Audit Trail</h3>
            <div className="bg-brand-secondary border border-brand-accent/50 rounded-lg overflow-hidden">
                 <table className="w-full text-left">
                    <thead className="bg-brand-primary/50 text-xs uppercase text-brand-light">
                        <tr>
                            <th className="p-4">Timestamp</th>
                            <th className="p-4">Action</th>
                            <th className="p-4">User</th>
                            <th className="p-4">Target</th>
                            <th className="p-4">IP Address</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-accent/20">
                        {mockAuditLogs.map(log => (
                            <tr key={log.id} className="hover:bg-brand-accent/10">
                                <td className="p-4 text-sm text-brand-light">{new Date(log.timestamp).toLocaleString()}</td>
                                <td className="p-4 text-sm font-medium text-brand-text">{log.action}</td>
                                <td className="p-4 text-sm text-brand-text">
                                    {log.user} <span className="text-xs text-brand-light">({log.userRole})</span>
                                </td>
                                <td className="p-4 text-sm text-brand-text">{log.target}</td>
                                <td className="p-4 text-sm text-brand-light font-mono">{log.ipAddress}</td>
                                <td className="p-4">
                                     <span className={`px-2 py-1 rounded-full text-xs font-medium border ${log.status === 'Success' ? 'bg-green-900/20 text-green-400 border-green-900/50' : 'bg-red-900/20 text-red-400 border-red-900/50'}`}>
                                        {log.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
