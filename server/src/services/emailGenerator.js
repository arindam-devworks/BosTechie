/**
 * emailGenerator.js
 * Service to convert JSON template structure into responsive, table-based HTML.
 */

export const generateEmailHTML = (templateJSON) => {
    const { sections } = templateJSON;

    const bodyStyle = "margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important; background-color: #f4f4f4; font-family: 'Helvetica', 'Arial', sans-serif;";
    const containerStyle = "max-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse; border-spacing: 0;";

    let htmlBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            @media only screen and (max-width: 600px) {
                .container { width: 100% !important; }
                .mobile-padding { padding: 20px !important; }
            }
        </style>
    </head>
    <body style="${bodyStyle}">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
            <tr>
                <td align="center">
                    <table class="container" width="600" border="0" cellspacing="0" cellpadding="0" style="${containerStyle}">
    `;

    sections.forEach(section => {
        htmlBody += renderSection(section);
    });

    htmlBody += `
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

    return htmlBody;
};

const renderSection = (section) => {
    const { type, content, style } = section;
    const paddingY = style.paddingY || 0;
    const bgColor = style.bgColor || '#ffffff';
    const textColor = style.textColor || '#000000';
    const fontSize = style.fontSize || 16;
    const textAlign = style.textAlign || 'left';

    let contentHtml = '';

    switch (type) {
        case 'navbar':
            contentHtml = `
                <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="${bgColor}">
                    <tr>
                        <td style="padding: ${paddingY}px 20px; text-align: center;">
                            <img src="${content.logo}" alt="Logo" style="max-height: 40px; display: inline-block;">
                        </td>
                    </tr>
                </table>
            `;
            break;

        case 'text':
            contentHtml = `
                <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="${bgColor}">
                    <tr>
                        <td style="padding: ${paddingY}px 40px; color: ${textColor}; font-size: ${fontSize}px; line-height: 1.6; text-align: ${textAlign};">
                            ${content.text}
                        </td>
                    </tr>
                </table>
            `;
            break;

        case 'image':
            contentHtml = `
                <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="${bgColor}">
                    <tr>
                        <td style="padding: ${paddingY}px 0; text-align: center;">
                            <a href="${content.link || '#'}" target="_blank">
                                <img src="${content.src}" alt="Image" style="width: 100%; max-width: 600px; display: block; border-radius: ${style.borderRadius || 0}px;">
                            </a>
                        </td>
                    </tr>
                </table>
            `;
            break;

        case 'button':
            contentHtml = `
                <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="${bgColor}">
                    <tr>
                        <td align="center" style="padding: ${paddingY}px 20px;">
                            <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" bgcolor="${style.buttonBg || '#000000'}" style="border-radius: ${style.borderRadius || 4}px;">
                                        <a href="${content.url || '#'}" target="_blank" style="display: inline-block; padding: 12px 30px; color: ${style.buttonTextColor || '#ffffff'}; font-size: ${fontSize}px; text-decoration: none; font-weight: bold;">
                                            ${content.label}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            `;
            break;

        case 'divider':
            contentHtml = `
                <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="${bgColor}">
                    <tr>
                        <td style="padding: ${paddingY}px 40px;">
                            <div style="border-top: 1px solid #eeeeee;"></div>
                        </td>
                    </tr>
                </table>
            `;
            break;

        case 'footer':
            contentHtml = `
                <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="${bgColor}">
                    <tr>
                        <td style="padding: ${paddingY}px 40px; color: ${textColor}; font-size: ${fontSize}px; text-align: center; line-height: 1.4;">
                            <p style="margin: 0;">${content.address || ''}</p>
                            <p style="margin: 10px 0 0;">WhatsApp: ${content.whatsapp || ''}</p>
                        </td>
                    </tr>
                </table>
            `;
            break;

        default:
            contentHtml = `<!-- Block type ${type} not recognized -->`;
    }

    return contentHtml;
};
