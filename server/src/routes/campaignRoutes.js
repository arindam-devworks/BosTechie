import express from 'express';
import { sendEmailCampaign, sendWhatsAppCampaign, saveTemplate, getAnalytics } from '../controllers/campaignController.js';

const router = express.Router();

router.post('/send-email', sendEmailCampaign);
router.post('/send-whatsapp', sendWhatsAppCampaign);
router.post('/templates', saveTemplate);
router.get('/analytics', getAnalytics);

export default router;
