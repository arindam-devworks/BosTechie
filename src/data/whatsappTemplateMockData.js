/**
 * Mock data for WhatsApp Templates page
 * Scoped to this page only — do NOT import from other pages.
 *
 * Preview fields (messageBody, headerType, footerText, buttons)
 * are shaped to match WhatsAppPhonePreview's data contract.
 */
export const WHATSAPP_TEMPLATE_MOCK = [
    {
        id: 'TPL-WA-001',
        name: 'Welcome Protocol',
        category: 'Marketing',
        status: 'approved',
        language: 'English (US)',
        lastUpdated: '2026-03-01',
        // Preview fields
        headerType: 'text',
        headerText: '👋 Welcome Aboard!',
        messageBody: 'Hey {{1}}! 🚀\n\nWelcome to **Bostechie Orbit** — your new mission control for global campaigns.\n\nYour account sync is now active and ready for deployment.',
        footerText: 'Bostechie Orbit • Unsubscribe',
        buttons: [
            { type: 'url', label: 'Launch Dashboard' },
            { type: 'quick_reply', label: 'Learn More' },
        ],
    },
    {
        id: 'TPL-WA-002',
        name: 'Flash Sale Alert',
        category: 'Marketing',
        status: 'pending',
        language: 'English (UK)',
        lastUpdated: '2026-03-04',
        // Preview fields
        headerType: 'image',
        headerText: '',
        messageBody: '⚡ *Flash Sale — 48 Hours Only!*\n\nHi {{1}}, your exclusive discount code is ready:\n\n🔖 Code: *{{2}}*\nDiscount: *{{3}}% OFF*\n\nHurry — offer expires soon!',
        footerText: 'Valid until {{4}} only.',
        buttons: [
            { type: 'url', label: 'Shop Now' },
        ],
    },
    {
        id: 'TPL-WA-003',
        name: 'OTP Verification',
        category: 'Utility',
        status: 'approved',
        language: 'Multilingual',
        lastUpdated: '2026-02-20',
        // Preview fields
        headerType: 'none',
        headerText: '',
        messageBody: 'Your one-time verification code is:\n\n*{{1}}*\n\nThis code expires in 10 minutes. Do not share it with anyone.',
        footerText: 'Bostechie Security Protocol',
        buttons: [],
    },
    {
        id: 'TPL-WA-004',
        name: 'Service Outage',
        category: 'Alert',
        status: 'rejected',
        language: 'Global',
        lastUpdated: '2026-02-28',
        // Preview fields
        headerType: 'text',
        headerText: '⚠️ Service Alert',
        messageBody: 'We are experiencing a service interruption affecting {{1}}.\n\nOur engineering team is actively working on a resolution.\n\nETA: *{{2}}*\n\nWe apologise for the inconvenience.',
        footerText: 'Status: status.bostechie.com',
        buttons: [
            { type: 'url', label: 'View Status Page' },
        ],
    },
    {
        id: 'TPL-WA-005',
        name: 'Order Confirmed',
        category: 'Transactional',
        status: 'approved',
        language: 'English (US)',
        lastUpdated: '2026-03-07',
        headerType: 'document',
        headerText: '',
        messageBody: 'Hi {{1}}! ✅\n\nYour order *#{{2}}* has been confirmed.\n\nItems: {{3}}\nTotal: *{{4}}*\nDelivery by: *{{5}}*\n\nThank you for choosing us!',
        footerText: 'Bostechie Commerce',
        buttons: [
            { type: 'url', label: 'Track Order' },
            { type: 'quick_reply', label: 'Cancel Order' },
        ],
    },
    {
        id: 'TPL-WA-006',
        name: 'Re-Engagement Blast',
        category: 'Marketing',
        status: 'pending',
        language: 'English (UK)',
        lastUpdated: '2026-03-09',
        headerType: 'video',
        headerText: '',
        messageBody: 'Hey {{1}}, we miss you! 😢\n\nIt has been a while since your last orbit. We have got exciting new features waiting for you.\n\nCome back and explore!',
        footerText: 'Unsubscribe anytime.',
        buttons: [
            { type: 'url', label: 'Explore Now' },
            { type: 'quick_reply', label: 'Not Interested' },
        ],
    },
];

/** Count templates by status */
export function countByStatus(templates) {
    return templates.reduce(
        (acc, t) => {
            acc[t.status] = (acc[t.status] || 0) + 1;
            acc.all = (acc.all || 0) + 1;
            return acc;
        },
        { all: 0, approved: 0, pending: 0, rejected: 0 }
    );
}
