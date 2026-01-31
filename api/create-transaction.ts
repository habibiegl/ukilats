import type { VercelRequest, VercelResponse } from '@vercel/node';

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const MIDTRANS_IS_PRODUCTION = true;

interface TransactionRequest {
    orderId: string;
    grossAmount: number;
    productName: string;
    productId: string;
    downloadLink: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { orderId, grossAmount, productName, productId, downloadLink, customerName, customerEmail, customerPhone } = req.body as TransactionRequest;

        if (!orderId || !grossAmount || !productName || !customerName || !customerEmail) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Midtrans Snap API URL
        const snapUrl = MIDTRANS_IS_PRODUCTION
            ? 'https://app.midtrans.com/snap/v1/transactions'
            : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

        // Create authorization header
        const authString = Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString('base64');

        // Transaction payload with custom fields for webhook
        const transactionPayload = {
            transaction_details: {
                order_id: orderId,
                gross_amount: grossAmount
            },
            item_details: [
                {
                    id: productId || orderId,
                    price: grossAmount,
                    quantity: 1,
                    name: productName.substring(0, 50) // Max 50 chars
                }
            ],
            customer_details: {
                first_name: customerName,
                email: customerEmail,
                phone: customerPhone
            },
            // Custom fields untuk webhook (akan diteruskan di notification)
            custom_field1: productId || '',
            custom_field2: productName || '',
            custom_field3: downloadLink || '',
            callbacks: {
                finish: `${req.headers.origin || 'https://ukilats.vercel.app'}/success?order_id=${orderId}`
            }
        };

        // Call Midtrans API
        const response = await fetch(snapUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic ${authString}`
            },
            body: JSON.stringify(transactionPayload)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Midtrans error:', data);
            return res.status(response.status).json({ error: data.error_messages || 'Transaction failed' });
        }

        return res.status(200).json({
            token: data.token,
            redirect_url: data.redirect_url
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
