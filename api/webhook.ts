import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

/**
 * Midtrans Webhook Handler
 * 
 * Menerima notification dari Midtrans dan forward ke Google Apps Script
 * untuk proses selanjutnya (simpan transaksi, generate token, kirim email)
 */

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

interface MidtransNotification {
    order_id: string;
    transaction_status: string;
    gross_amount: string;
    signature_key: string;
    status_code: string;
    payment_type: string;
    fraud_status?: string;
    // Customer details from Midtrans (nested object)
    customer_details?: {
        first_name?: string;
        last_name?: string;
        full_name?: string;
        email?: string;
        phone?: string;
    };
    // Custom fields from transaction creation
    custom_field1?: string; // product_id
    custom_field2?: string; // product_title
    custom_field3?: string; // download_link
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only accept POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const notification = req.body as MidtransNotification;

        console.log('=== MIDTRANS WEBHOOK RECEIVED ===');
        console.log('Order ID:', notification.order_id);
        console.log('Status:', notification.transaction_status);
        console.log('Amount:', notification.gross_amount);
        console.log('Customer Details:', JSON.stringify(notification.customer_details));
        console.log('Custom Fields:', {
            field1: notification.custom_field1,
            field2: notification.custom_field2,
            field3: notification.custom_field3
        });

        // Verify signature
        if (!verifySignature(notification)) {
            console.error('❌ Invalid signature for order:', notification.order_id);
            return res.status(401).json({ error: 'Invalid signature' });
        }
        console.log('✅ Signature verified');

        // Check if Apps Script URL is configured
        if (!APPS_SCRIPT_URL) {
            console.error('❌ APPS_SCRIPT_URL not configured');
            return res.status(200).json({
                status: 'error',
                message: 'Apps Script URL not configured'
            });
        }

        // Extract customer details from nested object OR custom fields
        const customerDetails = notification.customer_details || {};
        const customerName = customerDetails.full_name ||
            customerDetails.first_name ||
            (customerDetails.first_name && customerDetails.last_name
                ? `${customerDetails.first_name} ${customerDetails.last_name}`
                : '');
        const customerEmail = customerDetails.email || '';
        const customerPhone = customerDetails.phone || '';

        // Prepare data for Apps Script
        const webhookData = {
            action: 'webhook',
            order_id: notification.order_id,
            transaction_status: notification.transaction_status,
            gross_amount: parseFloat(notification.gross_amount),
            product_id: notification.custom_field1 || '',
            product_title: notification.custom_field2 || '',
            download_link: notification.custom_field3 || '',
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
            payment_type: notification.payment_type,
            fraud_status: notification.fraud_status
        };

        console.log('📤 Sending to Apps Script:', JSON.stringify(webhookData));

        // Forward to Google Apps Script
        const appsScriptResponse = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(webhookData)
        });

        const responseText = await appsScriptResponse.text();
        console.log('📥 Apps Script raw response:', responseText);

        let appsScriptResult;
        try {
            appsScriptResult = JSON.parse(responseText);
        } catch (e) {
            appsScriptResult = { raw: responseText };
        }

        console.log('✅ Apps Script processed:', JSON.stringify(appsScriptResult));

        // Always return 200 to Midtrans
        return res.status(200).json({
            status: 'ok',
            message: 'Webhook processed',
            order_id: notification.order_id,
            apps_script_result: appsScriptResult
        });

    } catch (error) {
        console.error('❌ Webhook error:', error);
        // Still return 200 to prevent Midtrans from retrying
        return res.status(200).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Verify Midtrans signature
 * Signature = SHA512(order_id + status_code + gross_amount + server_key)
 */
function verifySignature(notification: MidtransNotification): boolean {
    if (!MIDTRANS_SERVER_KEY) {
        console.warn('⚠️ MIDTRANS_SERVER_KEY not set, skipping signature verification');
        return true; // Skip verification if key not set (for testing)
    }

    const signatureString = `${notification.order_id}${notification.status_code}${notification.gross_amount}${MIDTRANS_SERVER_KEY}`;
    const calculatedSignature = crypto
        .createHash('sha512')
        .update(signatureString)
        .digest('hex');

    const isValid = calculatedSignature === notification.signature_key;
    console.log('Signature check:', isValid ? 'VALID' : 'INVALID');

    return isValid;
}
