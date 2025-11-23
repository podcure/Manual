
import { Model, Manual, PageContent, ManualType, Visibility, TocItem, User, SubscriptionPlan, Invoice, AuditLogEntry, BrandingConfig } from '../types';

export const allModels: Omit<Model, 'manuals'>[] = [
    {
        id: 'exc-5000',
        name: 'Excavator 5000X',
        modelCode: 'EX5000-2023-A',
        manufacturer: 'Heavy Industries Inc.',
        year: '2023',
        category: 'Heavy Equipment',
        description: 'Heavy-duty hydraulic excavator for large-scale construction and earthmoving projects.',
        image: 'https://images.unsplash.com/photo-1553784342-33b6b1a33a1e?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'ldr-250',
        name: 'Loader 250-Pro',
        modelCode: 'LDR250-2022-C',
        manufacturer: 'ProLoad Systems',
        year: '2022',
        category: 'Material Handling',
        description: 'Versatile and powerful front-end loader, ideal for material handling and loading applications.',
        image: 'https://images.unsplash.com/photo-1621254363353-87a3b3b0b5d0?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'mict-seta',
        name: 'MICT SETA Portal',
        modelCode: 'MICT-2020',
        manufacturer: 'MICT SETA',
        year: '2020',
        category: 'Administrative',
        description: 'Sector Education and Training Authority portal for Skills Development Facilitators.',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop',
    }
];

export const allManuals: Manual[] = [
    {
        id: 'sm-5000',
        title: 'Power Take Off Service Manual',
        type: ManualType.Service,
        version: 'LGPTO-WE-0091',
        publishedDate: '1999-11-01',
        language: 'English',
        visibility: Visibility.Public,
        mappedMachineIds: ['exc-5000'],
        toc: [
            { id: 'toc-isuzu-notice', title: 'Notice', pageId: 'page-isuzu-notice' },
            { id: 'toc-isuzu-contents', title: 'Table of Contents', pageId: 'page-isuzu-contents' },
            { id: 'toc-isuzu-gen-desc', title: '1. General Description', pageId: 'page-isuzu-gen-desc' },
            { id: 'toc-isuzu-hydraulic-diagram', title: '2. Hydraulic Circuit Diagram', pageId: 'page-isuzu-hydraulic-diagram' },
            {
                id: 'toc-isuzu-on-vehicle',
                title: '3. On-Vehicle Service',
                pageId: 'page-isuzu-on-vehicle-service',
                children: [
                    { id: 'toc-isuzu-fluid-supply-proc', title: '3.1 Supply Procedure of Hydraulic Fluid', pageId: 'page-isuzu-fluid-supply-proc' },
                    { id: 'toc-isuzu-dump-rise-disabled', title: '3.2 If Dump Rise is Disabled', pageId: 'page-isuzu-dump-rise-disabled' },
                    { id: 'toc-isuzu-total-replace', title: '3.3 Total Replacement of Fluid', pageId: 'page-isuzu-total-replace' },
                    { id: 'toc-isuzu-air-bleed', title: '3.4 Air Bleeding Procedure', pageId: 'page-isuzu-air-bleed' },
                ]
            },
            {
                id: 'toc-isuzu-control-cable',
                title: '4. Control Cable',
                pageId: 'page-isuzu-control-cable-removal',
                children: [
                    { id: 'toc-isuzu-cable-adj', title: '4.1 Control Cable Adjustment', pageId: 'page-isuzu-cable-adj' },
                    { id: 'toc-isuzu-three-rotation', title: '4.2 Three-Rotation Dump Truck Notes', pageId: 'page-isuzu-three-rotation' },
                ]
            },
            { id: 'toc-isuzu-oil-pump-replace', title: '5. Oil Pump Unit (Replacement)', pageId: 'page-isuzu-oil-pump-replace' },
            { id: 'toc-isuzu-pto-assembly', title: '6. PTO (With Oil Pump) Assembly', pageId: 'page-isuzu-pto-assembly' },
            {
                id: 'toc-isuzu-unit-repair',
                title: '7. Unit Repair',
                pageId: 'page-isuzu-unit-repair-disassembly',
                children: [
                    { id: 'toc-isuzu-unit-inspection', title: '7.1 Inspection and Repair', pageId: 'page-isuzu-unit-inspection' },
                    { id: 'toc-isuzu-unit-reassembly', title: '7.2 Reassembly', pageId: 'page-isuzu-unit-reassembly' },
                ]
            },
            { id: 'toc-isuzu-troubleshooting', title: '8. Troubleshooting', pageId: 'page-isuzu-troubleshooting' },
            { id: 'toc-isuzu-main-data', title: '9. Main Data and Specifications', pageId: 'page-isuzu-main-data' },
            { id: 'toc-isuzu-special-tools', title: '10. Special Tools', pageId: 'page-isuzu-special-tools' },
        ],
    },
    {
        id: 'om-5000',
        title: 'Operator Manual',
        type: ManualType.Operator,
        version: '1.0',
        publishedDate: '2023-01-20',
        language: 'English',
        visibility: Visibility.Public,
        mappedMachineIds: ['exc-5000'],
        toc: [
            { id: 'toc-om-controls', title: '1. Operator Controls', pageId: 'page-om-controls' },
            { id: 'toc-om-startup', title: '2. Daily Startup', pageId: 'page-om-startup' },
        ]
    },
    {
        id: 'pm-5000',
        title: 'Parts Manual',
        type: ManualType.Parts,
        version: '2.5',
        publishedDate: '2024-02-01',
        language: 'English',
        visibility: Visibility.Restricted,
        mappedMachineIds: ['exc-5000', 'ldr-250'], 
        toc: [
            { id: 'toc-pm-engine', title: '1. Engine Assembly', pageId: 'page-pm-engine' },
        ]
    },
    {
        id: 'sm-250',
        title: 'Service Manual',
        type: ManualType.Service,
        version: '3.0',
        publishedDate: '2022-08-11',
        language: 'English',
        visibility: Visibility.AdminOnly,
        mappedMachineIds: ['ldr-250'],
        toc: [
             { id: 'toc-sm-250-intro', title: 'Introduction', pageId: 'page-sm-250-intro' },
        ]
    },
    {
        id: 'sdf-ref-2020',
        title: 'Reference Manual for SDFs 2020',
        type: ManualType.Other,
        version: '2020',
        publishedDate: '2020-01-01',
        language: 'English',
        visibility: Visibility.Public,
        mappedMachineIds: ['mict-seta'],
        toc: [
            { id: 'toc-sdf-intro', title: 'Introduction & Background', pageId: 'page-sdf-intro' },
            { id: 'toc-sdf-acronyms', title: 'Acronyms & Definitions', pageId: 'page-sdf-acronyms' },
            {
                id: 'toc-sdf-process',
                title: 'Process Information',
                pageId: 'page-sdf-process-info',
                children: [
                    { id: 'toc-sdf-levy', title: 'Skills Development Levy Model', pageId: 'page-sdf-levy' },
                    { id: 'toc-sdf-committee', title: 'Training Committee', pageId: 'page-sdf-committee' },
                    { id: 'toc-sdf-role', title: 'Role of the SDF', pageId: 'page-sdf-role' },
                     { id: 'toc-sdf-mandatory', title: 'Mandatory Grants', pageId: 'page-sdf-mandatory' },
                ]
            },
            { id: 'toc-sdf-ofo', title: 'Organizing Framework for Occupations (OFO)', pageId: 'page-sdf-ofo' },
            { id: 'toc-sdf-skills', title: 'Scarce & Critical Skills', pageId: 'page-sdf-skills' },
            { id: 'toc-sdf-programmes', title: 'Learning Programmes', pageId: 'page-sdf-programmes' },
             {
                id: 'toc-sdf-sws',
                title: 'Skills Web System (SWS)',
                pageId: 'page-sdf-sws-intro',
                children: [
                    { id: 'toc-sdf-sws-reg', title: 'Registration', pageId: 'page-sdf-sws-reg' },
                    { id: 'toc-sdf-forms', title: 'Forms (WSP/ATR)', pageId: 'page-sdf-forms' }
                ]
            }
        ]
    }
];

export const models: Model[] = allModels.map(model => ({
    ...model,
    manuals: allManuals.filter(manual => manual.mappedMachineIds.includes(model.id))
}));


export const pageContents: Record<string, PageContent> = {
    'page-om-controls': { title: 'Operator Controls', type: 'content', html: '<p>Content for Operator Controls.</p>' },
    'page-om-startup': { title: 'Daily Startup', type: 'content', html: '<p>Content for Daily Startup.</p>' },
    'page-pm-engine': { title: 'Engine Assembly', type: 'content', html: '<p>Content for Engine Assembly Parts.</p>' },
    'page-sm-250-intro': { title: 'Introduction', type: 'content', html: '<p>Content for Loader 250-Pro Service Manual Introduction.</p>' },
    'page-isuzu-notice': {
        title: 'Notice',
        type: 'content',
        html: `
            <h2 class="text-2xl font-bold mb-4">NOTICE</h2>
            <p class="mb-4">Before using this Workshop Manual to assist you in performing vehicle service and maintenance operations...</p>
        `,
    },
    'page-isuzu-contents': {
        title: 'Table of Contents',
        type: 'content',
        html: `
            <h2 class="text-2xl font-bold mb-4">CONTENTS</h2>
            <table class="w-full text-left">...</table>
        `,
    },
    'page-isuzu-gen-desc': {
        title: 'General Description',
        type: 'content',
        html: `
            <h2 class="text-2xl font-bold mb-4">GENERAL DESCRIPTION</h2>
            <p class="mb-4">The side with an oil pump PTO integrates the PTO and the oil pump...</p>
        `,
    },
    'page-sdf-intro': {
        title: 'Introduction and Background Information',
        type: 'content',
        html: `
            <h2 class="text-2xl font-bold mb-4">Introduction</h2>
            <p class="mb-4"><strong>References to Skills Development Facilitators (SDFs) and Independent Skills Development Facilitators (ISDFs)</strong></p>
            <ul class="list-disc pl-5 mb-4 space-y-2">
                <li>SDFs are employees of organisations; their responsibility is to collect and submit to SETAs data relating to past and planned training in the organisation.</li>
                <li>ISDFs perform the same roles as SDFs, but are sub-contracted by the organisation to perform this function.</li>
            </ul>
            <p class="mb-4">For the purposes of this document, unless otherwise stated, all references to SDFs must be interpreted as including ISDFs.</p>
            
            <h3 class="text-xl font-bold mb-2">Purpose of the SDF Reference Manual</h3>
            <p class="mb-4">As published on 03 December 2012 in Government Gazette Notice No 35940, there are two types of grants that the MICT SETA can/may provide to the MICT SETA employers/ stakeholders, namely:</p>
            <ul class="list-disc pl-5 mb-4 space-y-2">
                <li><strong>Mandatory Grant:</strong> This grant is paid to the MICT SETA employers on the basis of the submission and approval of the Annual Training Reports (ATRs), Workplace Skills Plans (WSPs) (including PIVOTAL Training Plans (PTPs and PIVOTAL Training Reports (PTRs) where applicable).</li>
                <li><strong>Discretionary Grant:</strong> This is funding awarded to the MICT SETA employers who are providing training that addresses respective workplaces’ scarce and critical skills needs and assists in the achievement of the MICT SETA commitments to the Department of Higher Education and Training (DHET).</li>
            </ul>
        `
    },
    'page-sdf-acronyms': {
        title: 'Acronyms and Definitions',
        type: 'content',
        html: `
            <h2 class="text-2xl font-bold mb-4">Acronyms and Definitions</h2>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-brand-accent/30">
                    <thead>
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-brand-light uppercase tracking-wider">Abbreviation</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-brand-light uppercase tracking-wider">Description</th>
                        </tr>
                    </thead>
                    <tbody class="bg-brand-primary divide-y divide-brand-accent/20">
                        <tr><td class="px-6 py-4 font-medium">ATR</td><td class="px-6 py-4">Annual Training Report</td></tr>
                        <tr><td class="px-6 py-4 font-medium">B-BBEE</td><td class="px-6 py-4">Broad-Based Black Economic Empowerment</td></tr>
                        <tr><td class="px-6 py-4 font-medium">DHET</td><td class="px-6 py-4">Department of Higher Education and Training</td></tr>
                        <tr><td class="px-6 py-4 font-medium">OFO</td><td class="px-6 py-4">Organising Framework of Occupations</td></tr>
                        <tr><td class="px-6 py-4 font-medium">PIVOTAL</td><td class="px-6 py-4">Professional, vocational, technical and academic learning programmes</td></tr>
                        <tr><td class="px-6 py-4 font-medium">WSP</td><td class="px-6 py-4">Workplace Skills Plan</td></tr>
                        <tr><td class="px-6 py-4 font-medium">SDL</td><td class="px-6 py-4">Skills Development Levy</td></tr>
                    </tbody>
                </table>
            </div>
        `
    },
    'page-sdf-process-info': {
        title: 'Process Information',
        type: 'content',
        html: `
            <h2 class="text-2xl font-bold mb-4">Process Information</h2>
            <h3 class="text-xl font-bold mb-2">Legislative Considerations</h3>
            <p class="mb-4">Organisations are allocated to SETAs based on the Standard Industrial Classification (SIC) code. Each month, organisations with a total annual payroll of R500,000.00 and more contribute 1% of the payroll in the form of a Skills Development Levy (SDL) to SARS.</p>
            <p class="mb-4">Employers are entitled to a Mandatory Grants amounting to 20% of their Skills Development Levy contributions upon submission of WSP/ATR.</p>
        `
    },
    'page-sdf-levy': {
        title: 'Skills Development Levy Model',
        type: 'content',
        html: `
             <h2 class="text-2xl font-bold mb-4">Skills Development Levy Model</h2>
             <p class="mb-4">The Levy is split as follows:</p>
             <ul class="list-disc pl-5 mb-4">
                <li><strong>National Skills Fund (NSF):</strong> 20%</li>
                <li><strong>Mandatory Grant:</strong> 20% (Returned to employer upon WSP/ATR approval)</li>
                <li><strong>Discretionary Grant:</strong> 49.5% (80% allocated to PIVOTAL programmes)</li>
                <li><strong>SETA Administration:</strong> 10.5%</li>
             </ul>
             <p><strong>PIVOTAL</strong> stands for Professional, Vocational, Technical and Academic Learning.</p>
        `
    },
    'page-sdf-committee': {
        title: 'Training Committee',
        type: 'content',
        html: `
            <h2 class="text-2xl font-bold mb-4">Training Committee</h2>
            <p class="mb-4">An employer with <strong>50 or more employees</strong> has to establish a Training Committee and ensure its active participation with regards to skills development matters within an organisation.</p>
            <h3 class="text-xl font-bold mb-2">Composition</h3>
            <p class="mb-4">The committee must comprise:</p>
            <ul class="list-disc pl-5 mb-4">
                <li>Employer Representative</li>
                <li>Employee Representative</li>
                <li>Union Representative (where applicable)</li>
            </ul>
            <p class="mb-4 bg-yellow-900/20 p-4 rounded border border-yellow-700/50 text-yellow-200"><strong>Note:</strong> No employee representative shall be a manager. The SDF serves as a critical member but cannot be the employee or employer representative.</p>
        `
    },
    'page-sdf-role': {
        title: 'Role of the SDF',
        type: 'content',
        html: `
            <h2 class="text-2xl font-bold mb-4">Role and Responsibilities of the SDF</h2>
            <p class="mb-4">The SDF is appointed by the organisation to facilitate skills development. Key responsibilities include:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li>Chair the Training Committee (non-voting member).</li>
                <li>Facilitate the development of employees.</li>
                <li>Complete and submit the ATR/PTR and WSP/PTP accurately.</li>
                <li>Serve as a liaison between the organisation and the SETA.</li>
                <li>Monitor grants and levies.</li>
            </ul>
        `
    },
    'page-sdf-mandatory': {
        title: 'Mandatory Grants',
        type: 'content',
        html: `
            <h2 class="text-2xl font-bold mb-4">Criteria for Mandatory Grant Payments</h2>
            <p class="mb-4">The MICT SETA pays a Mandatory Grant (20% of levy) if the employer:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li>Has registered with SARS and paid levies.</li>
                <li>Has submitted the ATR/PTR and WSP/PTP by the deadline (30 April).</li>
                <li>Has received approval for the submission.</li>
            </ul>
            <p class="mt-4"><strong>Important:</strong> No hard-copy submissions are accepted. All data must be submitted via the Skills Web System.</p>
        `
    },
    'page-sdf-ofo': {
        title: 'Organizing Framework for Occupations (OFO)',
        type: 'content',
        html: `
             <h2 class="text-2xl font-bold mb-4">The Organizing Framework for Occupations (OFO)</h2>
             <p class="mb-4">The OFO is a coded occupational classification system used to identify and report skills demand. It categorizes jobs into occupations based on similarity of tasks and skills.</p>
             <p class="mb-4"><strong>Note:</strong> Organizations' internal job titles should not be used directly. They must be mapped to the closest OFO occupation code (Version 2019 for the 2020/21 submission).</p>
        `
    },
     'page-sdf-skills': {
        title: 'Scarce and Critical Skills',
        type: 'content',
        html: `
             <h2 class="text-2xl font-bold mb-4">Scarce and Critical Skills</h2>
             <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-brand-secondary p-4 rounded-lg">
                    <h3 class="text-xl font-bold mb-2 text-brand-highlight">Scarce Skills</h3>
                    <p>Refers to occupations where there is a scarcity of qualified and experienced people. Can be Absolute (no people available) or Relative (available but don't meet criteria).</p>
                </div>
                 <div class="bg-brand-secondary p-4 rounded-lg">
                    <h3 class="text-xl font-bold mb-2 text-brand-highlight">Critical Skills</h3>
                    <p>Refers to specific key or generic skills <em>within</em> an occupation. Examples include problem-solving, ICT skills, or specific technical competencies required to fill a "skills gap".</p>
                </div>
             </div>
        `
    },
    'page-sdf-programmes': {
        title: 'Learning Programmes',
        type: 'content',
        html: `
            <h2 class="text-2xl font-bold mb-4">Types of Learning Programmes</h2>
            <div class="space-y-4">
                <div class="border-l-4 border-brand-highlight pl-4">
                    <h3 class="text-lg font-bold">Learnership</h3>
                    <p>Occupationally directed, 70% workplace experience, 30% theoretical learning. Results in a qualification.</p>
                </div>
                <div class="border-l-4 border-brand-highlight pl-4">
                    <h3 class="text-lg font-bold">Internship</h3>
                    <p>For tertiary graduates to gain workplace experience. Usually 6-12 months.</p>
                </div>
                <div class="border-l-4 border-brand-highlight pl-4">
                    <h3 class="text-lg font-bold">Skills Programme</h3>
                    <p>Short learning intervention against registered Unit Standards. Credit-bearing.</p>
                </div>
                <div class="border-l-4 border-brand-highlight pl-4">
                    <h3 class="text-lg font-bold">Short Course</h3>
                    <p>Not credit-bearing towards an NQF qualification. E.g., soft skills, product-specific training.</p>
                </div>
            </div>
        `
    },
    'page-sdf-sws-intro': {
        title: 'Skills Web System',
        type: 'content',
        html: `
            <h2 class="text-2xl font-bold mb-4">Skills Web System (SWS)</h2>
            <p>The MICT SETA Management Information System for WSP/ATR submissions.</p>
            <p>Access link: <a href="#" class="text-brand-highlight underline">www.mict.org.za</a></p>
        `
    },
    'page-sdf-sws-reg': {
        title: 'SDF Registration Process',
        type: 'procedure',
        html: `
            <h2 class="text-2xl font-bold mb-4">Registering as an SDF</h2>
            <p>Follow these steps to register on the Skills Web System:</p>
            <ol class="list-decimal pl-5 space-y-2">
                <li>Access the system via the "Stakeholder Login" on the MICT SETA website.</li>
                <li>Click "If you are a new external user click here".</li>
                <li>Enter full names and email address.</li>
                <li>Select "SDF" role and click "Complete Registration".</li>
                <li>Check email for system-generated login details.</li>
                <li>Log in and change password.</li>
                <li>Update personal details.</li>
                <li>Link your organization using the SDL (L) number.</li>
                <li>Upload signed Appointment Letter.</li>
            </ol>
        `
    },
     'page-sdf-forms': {
        title: 'WSP/ATR Forms',
        type: 'content',
        html: `
            <h2 class="text-2xl font-bold mb-4">WSP & ATR Forms</h2>
            <p>The system contains several forms to be completed:</p>
            <ul class="list-disc pl-5 mb-4 space-y-1">
                <li><strong>Form 1:</strong> Employment Profile (Demographics)</li>
                <li><strong>Form 2:</strong> WSP Training Budget</li>
                <li><strong>Form 3:</strong> Scarce Skills</li>
                <li><strong>Form 4:</strong> Critical Skills</li>
                <li><strong>Form 6/7:</strong> Planned Training (WSP/PTP)</li>
                <li><strong>Form 8/9:</strong> Actual Training (ATR/PTR)</li>
                <li><strong>Form 12:</strong> Workforce Dynamics</li>
            </ul>
            <p class="bg-blue-900/20 p-3 rounded border border-blue-800"><strong>Tip:</strong> Save your work frequently. Ensure all "Total" fields balance correctly (e.g., Gender totals vs Age totals).</p>
        `
    }
};

// --- Mock Data for Admin / Settings ---

export const mockUsers: User[] = [
    { id: 'u1', name: 'Alice Johnson', email: 'alice@heavyind.com', role: 'Super Admin', status: 'Active', lastLogin: '2024-05-20T09:15:00Z', avatar: 'https://i.pravatar.cc/150?u=u1' },
    { id: 'u2', name: 'Bob Smith', email: 'bob@heavyind.com', role: 'Technician', status: 'Active', lastLogin: '2024-05-19T14:30:00Z', avatar: 'https://i.pravatar.cc/150?u=u2' },
    { id: 'u3', name: 'Charlie Davis', email: 'charlie@heavyind.com', role: 'Billing Admin', status: 'Active', lastLogin: '2024-05-15T10:00:00Z' },
    { id: 'u4', name: 'Diana Miller', email: 'diana@heavyind.com', role: 'Technician', status: 'Invited', lastLogin: '' },
    { id: 'u5', name: 'Evan Wright', email: 'evan@heavyind.com', role: 'Read-only', status: 'Deactivated', lastLogin: '2024-01-10T08:00:00Z' },
];

export const mockPlans: SubscriptionPlan[] = [
    {
        id: 'plan_basic',
        name: 'Basic',
        slug: 'basic',
        priceMonthly: 49,
        priceYearly: 490,
        description: 'Essential tools for small workshops.',
        features: [
            { name: 'Up to 5 Machines', included: true },
            { name: 'Standard Search', included: true },
            { name: 'PDF View Only', included: true },
            { name: 'AI Troubleshooting', included: false },
            { name: 'API Access', included: false },
        ],
        machineLimit: 5,
        userLimit: 2,
    },
    {
        id: 'plan_std',
        name: 'Standard',
        slug: 'standard',
        priceMonthly: 149,
        priceYearly: 1490,
        description: 'Advanced features for growing teams.',
        isPopular: true,
        features: [
            { name: 'Up to 20 Machines', included: true },
            { name: 'Visual AI Search', included: true },
            { name: 'Procedure Generation', included: true },
            { name: 'AI Troubleshooting', included: true },
            { name: 'API Access', included: false },
        ],
        machineLimit: 20,
        userLimit: 10,
    },
    {
        id: 'plan_ent',
        name: 'Enterprise',
        slug: 'enterprise',
        priceMonthly: 399,
        priceYearly: 3990,
        description: 'Full scale automation and support.',
        features: [
            { name: 'Unlimited Machines', included: true },
            { name: 'Visual AI Search', included: true },
            { name: 'Procedure Generation', included: true },
            { name: 'AI Troubleshooting', included: true },
            { name: 'API Access', included: true },
        ],
        machineLimit: 9999,
        userLimit: 9999,
    },
];

export const mockInvoices: Invoice[] = [
    { id: 'inv_001', number: 'INV-2024-001', date: '2024-05-01', amount: 149.00, status: 'Paid', pdfUrl: '#', items: ['Standard Plan (Monthly)'] },
    { id: 'inv_002', number: 'INV-2024-002', date: '2024-04-01', amount: 149.00, status: 'Paid', pdfUrl: '#', items: ['Standard Plan (Monthly)'] },
    { id: 'inv_003', number: 'INV-2024-003', date: '2024-03-01', amount: 149.00, status: 'Paid', pdfUrl: '#', items: ['Standard Plan (Monthly)'] },
    { id: 'inv_004', number: 'INV-2024-004', date: '2024-02-01', amount: 49.00, status: 'Paid', pdfUrl: '#', items: ['Basic Plan (Monthly)'] },
];

export const mockAuditLogs: AuditLogEntry[] = [
    { id: 'log_1', action: 'User Login', user: 'Alice Johnson', userRole: 'Super Admin', target: 'System', timestamp: '2024-05-20T09:15:00Z', ipAddress: '192.168.1.45', status: 'Success' },
    { id: 'log_2', action: 'Update Plan', user: 'Alice Johnson', userRole: 'Super Admin', target: 'Subscription', timestamp: '2024-05-18T11:20:00Z', ipAddress: '192.168.1.45', status: 'Success' },
    { id: 'log_3', action: 'Add Machine', user: 'Bob Smith', userRole: 'Technician', target: 'LDR250-2022-C', timestamp: '2024-05-18T10:05:00Z', ipAddress: '10.0.0.12', status: 'Success' },
    { id: 'log_4', action: 'Failed Login', user: 'Unknown', userRole: '-', target: 'System', timestamp: '2024-05-17T23:45:00Z', ipAddress: '45.33.22.11', status: 'Failed' },
    { id: 'log_5', action: 'Invite User', user: 'Charlie Davis', userRole: 'Billing Admin', target: 'diana@heavyind.com', timestamp: '2024-05-16T14:00:00Z', ipAddress: '192.168.1.50', status: 'Success' },
];

export const mockBranding: BrandingConfig = {
    productName: 'Service Manuals AI',
    primaryColor: '#0D1B2A',
    accentColor: '#415A77',
    logoUrl: '',
    customDomain: 'manuals.heavyind.com'
};
