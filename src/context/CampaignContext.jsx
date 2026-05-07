import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

const INITIAL_EMAIL_DATA = {
    senderName: 'BosTechie Orbit Ops',
    from: 'ops@orbit.bostechie.io',
    replyTo: 'support@orbit.bostechie.io',
    subject: '',
    previewText: 'Incoming Transmission from Sector 7G',
    contacts: [],
    attachments: [],
    blocks: []
};

const INITIAL_WHATSAPP_DATA = {
    templateId: '',
    contacts: [],
    variables: { '1': '', '2': '' }
};

const CampaignContext = createContext();

export function CampaignProvider({ children }) {
    const [activeTab, setActiveTab] = useState('email'); // 'email', 'whatsapp'
    const [emailData, setEmailData] = useState(INITIAL_EMAIL_DATA);
    const [activeBlockId, setActiveBlockId] = useState(null);
    const [whatsAppData, setWhatsAppData] = useState(INITIAL_WHATSAPP_DATA);

    const isDirty = useMemo(() => {
        if (activeTab === 'email') {
            return JSON.stringify(emailData) !== JSON.stringify(INITIAL_EMAIL_DATA);
        }
        return JSON.stringify(whatsAppData) !== JSON.stringify(INITIAL_WHATSAPP_DATA);
    }, [emailData, whatsAppData, activeTab]);

    const value = {
        activeTab,
        setActiveTab,
        emailData,
        setEmailData,
        activeBlockId,
        setActiveBlockId,
        whatsAppData,
        setWhatsAppData,
        isDirty,
        INITIAL_EMAIL_DATA,
        INITIAL_WHATSAPP_DATA
    };

    return (
        <CampaignContext.Provider value={value}>
            {children}
        </CampaignContext.Provider>
    );
}

export function useCampaignContext() {
    const context = useContext(CampaignContext);
    if (!context) {
        throw new Error('useCampaignContext must be used within a CampaignProvider');
    }
    return context;
}
