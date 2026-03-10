/**
 * Mock Service for WhatsApp Templates
 * Simulates a real backend API with artificial delays to test async UI states.
 */

const MOCK_DB = [
    {
        id: 'TPL-WA-001',
        name: 'Welcome Protocol',
        category: 'marketing',
        status: 'approved',
        language: 'en',
        updatedAt: '2026-03-01T10:00:00Z',
        headerType: 'none',
        messageBody: 'Hello {{1}}, welcome to BosTechie! We are excited to have you on board. Your reference ID is {{2}}.',
        footerText: 'Reply STOP to unsubscribe',
        buttons: [
            { type: 'url', label: 'Visit Website', value: 'https://bostechie.com' }
        ],
        variableMapping: { 1: 'John Doe', 2: 'REF-83892' }
    },
    {
        id: 'TPL-WA-002',
        name: 'Flash Sale Alert',
        category: 'marketing',
        status: 'pending',
        language: 'en_GB',
        updatedAt: '2026-03-04T15:30:00Z',
        headerType: 'image',
        headerText: '',
        messageBody: 'Hurry up {{1}}! Our spring flash sale is live now. Get 50% off sitewide using code SPRING50.',
        footerText: 'Limited time offer',
        buttons: [
            { type: 'url', label: 'Shop Now', value: 'https://bostechie.com/sale' },
            { type: 'quick_reply', label: 'Stop Promos', value: 'STOP' }
        ],
        variableMapping: { 1: 'Jane' }
    },
    {
        id: 'TPL-WA-003',
        name: 'OTP Verification',
        category: 'authentication',
        status: 'approved',
        language: 'en',
        updatedAt: '2026-02-20T08:15:00Z',
        headerType: 'text',
        headerText: 'Security Code',
        messageBody: 'Your Bostechie verification code is {{1}}. Do not share this code with anyone. It expires in 5 minutes.',
        footerText: 'Bostechie Security Team',
        buttons: [],
        variableMapping: { 1: '839201' }
    },
    {
        id: 'TPL-WA-004',
        name: 'Service Outage',
        category: 'utility',
        status: 'rejected',
        language: 'global',
        updatedAt: '2026-02-28T22:45:00Z',
        headerType: 'none',
        messageBody: 'Dear {{1}}, we are currently experiencing a brief service interruption. Our engineers are investigating. We will notify you once resolved.',
        footerText: '',
        buttons: [
            { type: 'url', label: 'Status Page', value: 'https://status.bostechie.com' }
        ],
        variableMapping: { 1: 'Customer' }
    }
];

// Helper to simulate network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const whatsappService = {
    /**
     * Fetch all templates (with optional filtering backend-side simulation)
     */
    async getTemplates() {
        await delay(1200); // Artificial 1.2s delay for realistic loading state

        // Uncomment to test error state:
        // throw new Error("Failed to connect to WhatsApp Business API");

        // Return cloned mock DB to prevent accidental mutation
        return JSON.parse(JSON.stringify(MOCK_DB));
    },

    /**
     * Optional: Delete a template mock
     */
    async deleteTemplate(id) {
        await delay(800);
        return { success: true, id };
    }
};
