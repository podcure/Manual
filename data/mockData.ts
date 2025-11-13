import { Model, Manual, PageContent, ManualType, Visibility } from '../types';

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
    }
];

export const allManuals: Manual[] = [
    {
        id: 'sm-5000',
        title: 'Service Manual',
        type: ManualType.Service,
        version: '1.2a',
        publishedDate: '2023-10-15',
        language: 'English',
        visibility: Visibility.Public,
        mappedMachineIds: ['exc-5000'],
        toc: [
            { id: 'toc-intro', title: 'Introduction', pageId: 'page-intro' },
            { id: 'toc-safety', title: '1. Safety Precautions', pageId: 'page-safety' },
            {
                id: 'toc-maintenance',
                title: '2. Maintenance Procedures',
                pageId: 'page-maintenance-intro',
                children: [
                    { id: 'toc-oil-change', title: '2.1 Engine Oil Change', pageId: 'page-oil-change', },
                    { id: 'toc-fuel-filter', title: '2.2 Fuel Filter Replacement', pageId: 'page-fuel-filter', },
                    { id: 'toc-track-tension', title: '2.3 Track Tension Adjustment', pageId: 'page-track-tension', },
                ],
            },
            {
                id: 'toc-troubleshooting',
                title: '3. Troubleshooting',
                pageId: 'page-troubleshooting-intro',
                children: [
                   { id: 'toc-ts-no-start', title: '3.1 Engine Cranks but No Start', pageId: 'page-ts-no-start', },
                   { id: 'toc-ts-overheat', title: '3.2 Engine Overheating', pageId: 'page-ts-overheat', },
                ],
            },
            {
                id: 'toc-diagrams', title: '4. Wiring Diagrams', pageId: 'page-diagrams'
            }
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
        mappedMachineIds: ['exc-5000', 'ldr-250'], // Example: mapped to two machines
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
    }
];

// Combine the above into the legacy format for components that might need it
// This is a derived data structure. The source of truth is allModels and allManuals.
export const models: Model[] = allModels.map(model => ({
    ...model,
    manuals: allManuals.filter(manual => manual.mappedMachineIds.includes(model.id))
}));


export const pageContents: Record<string, PageContent> = {
    'page-intro': {
        title: 'Introduction',
        type: 'content',
        html: `
            <h2 class="text-2xl font-bold mb-4">Introduction to the Excavator 5000X</h2>
            <p>This manual provides detailed service information for the Excavator 5000X. It contains procedures for maintenance, troubleshooting, and repair. Adherence to these guidelines will ensure the safe and efficient operation of your equipment.</p>
            <img src="https://images.unsplash.com/photo-1603758065366-0a560c579IRT?q=80&w=800&auto=format&fit=crop" alt="Excavator" class="my-4 rounded-lg"/>
        `,
    },
    'page-safety': {
        title: 'Safety Precautions',
        type: 'content',
        html: `
            <h2 class="text-2xl font-bold mb-4">General Safety Precautions</h2>
            <p>Safety is the top priority. Always read and understand all safety decals and instructions before operating or servicing the machine.</p>
            <ul>
                <li>Always wear personal protective equipment (PPE), including hard hat, safety glasses, and steel-toed boots.</li>
                <li>Never service the machine while the engine is running.</li>
                <li>Ensure the machine is on level ground and properly secured before beginning any work.</li>
            </ul>
        `,
    },
    'page-fuel-filter': {
        title: 'Fuel Filter Replacement',
        type: 'procedure',
        html: `
            <h2 class="text-2xl font-bold mb-4">2.2 Fuel Filter Replacement</h2>
            <p class="mb-4">This procedure details the steps required to safely and effectively replace the primary fuel filter element. This should be performed every 500 hours of operation or as indicated by the fuel system warning light.</p>
            <h3 class="text-xl font-semibold mb-2">Required Tools and Parts</h3>
            <ul>
                <li>14mm Filter Wrench</li>
                <li>Drain pan</li>
                <li>Clean, lint-free rags</li>
                <li>New Fuel Filter Element (Part # FF-5000X)</li>
                <li>New O-ring (Part # OR-123)</li>
            </ul>
            <h3 class="text-xl font-semibold mt-4 mb-2">Safety Precautions</h3>
            <p class="text-yellow-400"><strong>WARNING:</strong> Diesel fuel is flammable. Work in a well-ventilated area away from open flames or sparks. Wear appropriate PPE, including fuel-resistant gloves.</p>
            <h3 class="text-xl font-semibold mt-4 mb-2">Procedure Steps</h3>
            <ol>
                <li><strong>Step 1:</strong> Turn off the engine and engage the master disconnect.</li>
                <li><strong>Step 2:</strong> Place a drain pan under the fuel filter housing.</li>
                <li><strong>Step 3:</strong> Open the drain valve at the bottom of the filter housing to release pressure and drain fuel.</li>
                <li><strong>Step 4:</strong> Using the 14mm filter wrench, loosen and remove the filter bowl.</li>
                <li><strong>Step 5:</strong> Remove the old filter element and O-ring. Clean the filter bowl with a lint-free rag.</li>
                <li><strong>Step 6:</strong> Install the new O-ring and lightly coat it with clean engine oil.</li>
                <li><strong>Step 7:</strong> Install the new filter element into the housing.</li>
                <li><strong>Step 8:</strong> Screw the filter bowl back on and tighten to the specified torque.</li>
            </ol>
            <h3 class="text-xl font-semibold mt-4 mb-2">Torque Specifications</h3>
            <p>Filter Bowl: <strong>25 Nm (18.4 ft-lbs)</strong></p>
        `,
    },
     'page-ts-no-start': {
        title: 'Engine Cranks but No Start',
        type: 'troubleshooting',
        html: `
            <h2 class="text-2xl font-bold mb-4">Troubleshooting: Engine Cranks but Fails to Start</h2>
            <p>This section provides a systematic approach to diagnosing a no-start condition where the engine cranking speed is normal.</p>
            
            <h3 class="text-xl font-semibold mt-4 mb-2">Possible Cause 1: Fuel System Issue</h3>
            <ol>
                <li>Check fuel level in the tank.</li>
                <li>Inspect fuel lines for kinks or damage.</li>
                <li>Check for a clogged fuel filter. See Section 2.2 for replacement procedure.</li>
                <li>Verify fuel pump operation. Listen for the pump to prime when the key is turned on.</li>
            </ol>

            <h3 class="text-xl font-semibold mt-4 mb-2">Possible Cause 2: Air Intake System Issue</h3>
            <ol>
                <li>Inspect air filter for blockage.</li>
                <li>Check intake piping for leaks or obstructions.</li>
            </ol>
            
             <h3 class="text-xl font-semibold mt-4 mb-2">Possible Cause 3: Electrical System Issue</h3>
            <ol>
                <li>Check for diagnostic trouble codes (DTCs) using a diagnostic tool.</li>
                <li>Verify power to the Engine Control Module (ECM).</li>
                <li>Inspect glow plugs and associated wiring.</li>
            </ol>
        `,
    },
     'page-diagrams': {
        title: 'Wiring Diagrams',
        type: 'diagram',
        html: `
            <h2 class="text-2xl font-bold mb-4">Main Engine Harness Wiring Diagram</h2>
             <svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" class="my-4 rounded-lg bg-gray-800 border border-brand-accent">
                <style>
                    .interactive-part {
                        transition: all 0.2s ease-in-out;
                        cursor: pointer;
                    }
                    .interactive-part:hover {
                        stroke: #FFC107;
                        stroke-width: 4px;
                        opacity: 0.8;
                    }
                </style>
                <image href="https://images.unsplash.com/photo-1588612038753-c403ba45b05a?q=80&w=800&auto=format&fit=crop" width="800" height="600" opacity="0.9"/>
                
                <rect x="150" y="200" width="120" height="60" fill="rgba(255, 193, 7, 0.3)" 
                        class="interactive-part"
                        data-link-page-id="page-fuel-filter" />
                
                <text x="160" y="235" fill="#E0E1DD" font-size="16" font-family="Inter, sans-serif" pointer-events="none">Fuel Filter</text>
                
                <text x="15" y="30" fill="#E0E1DD" font-size="16" font-weight="bold" class="drop-shadow-md">
                    Click on the highlighted Fuel Filter area to see the replacement procedure.
                </text>
            </svg>
            <p>Figure 4.1 - Main Engine Harness. Refer to the table below for wire color codes and connector pinouts.</p>
        `
    },
};
