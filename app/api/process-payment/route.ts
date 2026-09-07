import { NextResponse } from 'next/server';
import axios from 'axios';
import https from 'https';

interface PaymentData {
  amount: number;
  orderId: string;
  cardData: {
    number: string;
    name: string;
    month: string;
    year: string;
    cvv: string;
  };
  customer: {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    direccion2?: string;
    ciudad: string;
    estado: string;
    pais?: string;
    cp: string;
    empresa?: string;
  };
  metadata?: {
    ip?: string;
    deviceId?: string;
    notes?: string;
  };
}

// Base URL oficial según documentación KeyCop v2.0.2
const API_URL = "https://pagos.keycop.com.mx/api/v1";

// Crear agente HTTPS que ignora errores de certificado
// Esto es necesario porque el servidor de KeyCop tiene problemas con SNI
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  servername: 'pagos.keycop.com.mx',
  minVersion: 'TLSv1.2',
});

async function getAuthToken() {
  console.log('=== PASO 1: AUTENTICACIÓN ===');
  console.log('URL:', `${API_URL}/signin`);
  
  try {
    const { data } = await axios.post(`${API_URL}/signin`, {
      email: process.env.KEYCOP_EMAIL,
      password: process.env.KEYCOP_PASSWORD
    }, {
      httpsAgent,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('✓ Autenticación exitosa');
    console.log('Respuesta:', JSON.stringify(data));
    
    return data.authToken;
  } catch (error: any) {
    console.error('Error en autenticación:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data));
    }
    throw error;
  }
}

async function tokenizeCard(token: string, payment: PaymentData) {
  console.log('=== PASO 2: TOKENIZACIÓN ===');
  console.log('URL:', `${API_URL}/card/tokenizer`);
  
  const card = payment.cardData;
  
  try {
    const { data } = await axios.post(`${API_URL}/card/tokenizer`, {
      cardData: {
        cardNumber: card.number.replace(/\s/g, ''),
        cardholderName: card.name,
        expirationMonth: card.month,
        expirationYear: card.year
      }
    }, {
      httpsAgent,
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
    
    console.log('✓ Tokenización exitosa');
    console.log('Respuesta:', JSON.stringify(data));
    
    return data.cardNumberToken;
  } catch (error: any) {
    console.error('Error en tokenización:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data));
    }
    throw error;
  }
}

async function executeSale(token: string, cardToken: string, payment: PaymentData) {
  console.log('=== PASO 3: VENTA ===');
  console.log('URL:', `${API_URL}/sale`);
  
  const salePayload = {
    amount: Number(payment.amount),
    currency: "484",
    reference: payment.orderId,
    customerInformation: {
      firstName: payment.customer.nombre,
      lastName: payment.customer.apellido,
      phone1: payment.customer.telefono,
      email: payment.customer.email,
      city: payment.customer.ciudad,
      address1: payment.customer.direccion,
      address2: payment.customer.direccion2 || "",
      postalCode: payment.customer.cp,
      state: payment.customer.estado,
      country: payment.customer.pais || "MX",
      ip: payment.metadata?.ip || "127.0.0.1",
    },
    cardData: {
      cardNumberToken: cardToken,
      cvv: payment.cardData.cvv,
    },
  };
  
  console.log('Payload:', JSON.stringify(salePayload, null, 2));
  
  try {
    const { data } = await axios.post(`${API_URL}/sale`, salePayload, {
      httpsAgent,
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
    
    console.log('✓ Venta procesada');
    console.log('Respuesta:', JSON.stringify(data, null, 2));
    
    return data;
  } catch (error: any) {
    console.error('Error en venta:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data));
    }
    throw error;
  }
}

export async function POST(request: Request) {
  console.log('========================================');
  console.log('=== INICIO DE PROCESO DE PAGO ===');
  console.log('API URL:', API_URL);
  console.log('========================================');
  
  try {
    const payment: PaymentData = await request.json();
    console.log('Monto:', payment.amount);
    console.log('OrderId:', payment.orderId);
    console.log('Cliente:', payment.customer?.nombre, payment.customer?.apellido);
    console.log('Email:', payment.customer?.email);

    if (!payment.amount || payment.amount <= 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Monto inválido' 
      }, { status: 400 });
    }

    if (!payment.cardData?.number || !payment.cardData?.cvv) {
      return NextResponse.json({ 
        success: false, 
        error: 'Datos de tarjeta incompletos' 
      }, { status: 400 });
    }

    // 1. Autenticación
    const authToken = await getAuthToken();
    console.log('✓ Token de autenticación obtenido');
    
    // 2. Tokenización
    const cardToken = await tokenizeCard(authToken, payment);
    console.log('✓ Token de tarjeta obtenido');
    
    // 3. Venta
    const data = await executeSale(authToken, cardToken, payment);
    console.log('✓ Venta completada');
    
    const status = data?.status || '';
    const isApproved = status === "APPROVED" || status === "approved";
    
    return NextResponse.json({
      success: isApproved,
      orderId: data?.orderId || data?.id || payment.orderId,
      reference: data?.reference,
      status: status,
      data: data
    });
  } catch (error: any) {
    console.error('=== ERROR EN PROCESO DE PAGO ===');
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Status Text:', error.response.statusText);
      console.error('Response data:', JSON.stringify(error.response.data));
    }
    
    return NextResponse.json({
      success: false,
      status: "error",
      error: error.response?.data?.message || error.message || "Error procesando el pago"
    }, { status: 500 });
  }
}