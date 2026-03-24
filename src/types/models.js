/**
 * Backend Data Models - API Ready Interfaces
 * This file serves as the strict structural contract for data flowing in/out of the UI.
 * Replace with proper TypeScript .ts file definitions in the future.
 */

/**
 * @typedef {Object} AuthUser
 * @property {string} id - Unique UUID
 * @property {string} email
 * @property {string} fullName
 * @property {string} role - Enum: 'owner' | 'admin' | 'manager' | 'member'
 * @property {string} companyId - Associated tenant
 * @property {Date} createdAt
 * @property {Date} lastLogin
 */

/**
 * @typedef {Object} Company
 * @property {string} id - Tenant ID
 * @property {string} name
 * @property {string} industry
 * @property {string} timezone
 * @property {Object} settings - Global tenant settings
 * @property {string} status - Enum: 'active' | 'suspended' | 'trial'
 */

/**
 * @typedef {Object} Contact
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} phone
 * @property {Array<string>} tags
 * @property {string} status - Enum: 'subscribed' | 'unsubscribed' | 'bounced'
 * @property {Object} customAttributes - Flexible key-value metadata
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} Segment
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {Object} rules - JSON representation of filter rules
 * @property {number} contactCount - Cached/computed
 * @property {Date} lastCalculatedAt
 */

/**
 * @typedef {Object} EmailTemplate
 * @property {string} id
 * @property {string} name
 * @property {string} thumbnail
 * @property {Array<Object>} blocks - JSON schema representing modular designer blocks
 * @property {Object} meta - Subject, preheader, etc.
 * @property {string} htmlStructure - Rendered or intermediate HTML output
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} WhatsAppTemplate
 * @property {string} id
 * @property {string} name
 * @property {string} category - Enum: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION'
 * @property {string} language - ISO code (e.g., 'en_US')
 * @property {Object} header - Type (TEXT, IMAGE, VIDEO, DOCUMENT) and content
 * @property {string} body - Text with {{n}} variables
 * @property {string} footer - Max 60 chars
 * @property {Array<Object>} buttons - Quick replies, URLs, call actions
 * @property {string} status - Provider approval status (e.g., 'APPROVED', 'PENDING', 'REJECTED')
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} Campaign
 * @property {string} id
 * @property {string} name
 * @property {string} channel - Enum: 'email' | 'whatsapp'
 * @property {string} templateId - Ref to active template
 * @property {string|Array<string>} audience - Segment IDs or explicit list definitions
 * @property {string} status - Enum: 'draft' | 'scheduled' | 'sending' | 'completed' | 'failed'
 * @property {Object} scheduleDetails - Timestamp and timezone rules for dispatch
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} AnalyticsSummary
 * @property {string} campaignId
 * @property {number} recipients
 * @property {number} delivered
 * @property {number} opened
 * @property {number} clicked
 * @property {number} bounced
 * @property {number} unsubscribed
 * @property {Array<Object>} timeline - Time-series delivery dataset
 */

/**
 * @typedef {Object} ApiErrorResponse
 * @property {number} status - HTTP status code
 * @property {string} errorCode - Internal error domain logic (e.g., 'AUTH_EXPIRED')
 * @property {string} message - Human-readable description
 * @property {Array<Object>} details - Specific validation errors maps (field -> message)
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {Array<any>} data - The dataset array
 * @property {Object} meta
 * @property {number} meta.total
 * @property {number} meta.page
 * @property {number} meta.limit
 * @property {number} meta.totalPages
 */
