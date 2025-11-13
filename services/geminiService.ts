
import { GoogleGenAI, Type } from '@google/genai';
import type { ProcedureDetails } from '../types';

// IMPORTANT: Do not expose this key on the client-side in a real production app.
// This is for demonstration purposes only. In a real app, this logic would
// be on a secure backend server.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
    console.warn("API_KEY environment variable not set. AI features will not work.");
}


export async function generateProcedureChecklist(htmlContent: string): Promise<ProcedureDetails | null> {
    if(!ai) throw new Error("AI client is not initialized. API key may be missing.");
    
    const prompt = `
        You are an expert mechanic's assistant. Based on the following service manual procedure HTML content, extract the key information.

        The output MUST be a single, valid JSON object that conforms to the provided schema. Do not include any text or markdown formatting before or after the JSON object.

        Here is the procedure content:
        ---
        ${htmlContent}
        ---
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING, description: 'A concise title for the procedure.' },
                        tools: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'An array of strings listing required tools.' },
                        parts: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'An array of strings listing required parts.' },
                        warnings: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'An array of strings for safety precautions.' },
                        steps: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    step: { type: Type.INTEGER },
                                    description: { type: Type.STRING }
                                },
                                required: ['step', 'description']
                            },
                            description: 'An array of step objects.'
                        },
                        torqueSpecs: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    part: { type: Type.STRING },
                                    spec: { type: Type.STRING }
                                },
                                required: ['part', 'spec']
                            },
                            description: 'An array of torque specification objects.'
                        }
                    },
                     required: ['title', 'tools', 'parts', 'warnings', 'steps', 'torqueSpecs']
                },
            },
        });
        
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        return parsedJson as ProcedureDetails;
        
    } catch (error) {
        console.error('Error generating procedure checklist:', error);
        return null;
    }
}

export async function getTroubleshootingAdvice(context: string, symptom: string): Promise<string> {
    if(!ai) throw new Error("AI client is not initialized. API key may be missing.");

    const prompt = `
        You are an AI-powered master technician and troubleshooting assistant. Your goal is to help a user diagnose a problem with their heavy machinery.
        Use the provided manual context to formulate your response. Be clear, concise, and provide actionable steps.
        Format your response using simple markdown. Use headings for sections, bullet points for lists, and bold text for emphasis.

        **Manual Context:**
        ${context}

        **User's Described Symptom:**
        "${symptom}"

        Based on this information, provide a diagnostic plan.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });

        return response.text;
    } catch (error) {
        console.error('Error getting troubleshooting advice:', error);
        return 'There was an error processing your request. Please check the console for details.';
    }
}
