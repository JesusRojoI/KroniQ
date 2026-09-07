import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, name, company, email, phone, message, type, orderData, language, customData } = body;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const isEnglish = language === 'en';

    if (type === 'contact') {
      const contactHTML = `
        <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#6B21A8,#4C1D95);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;">${isEnglish ? 'New Contact Message' : 'Nuevo mensaje de contacto'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p style="font-size:16px;"><strong>${isEnglish ? 'Name:' : 'Nombre:'}</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>${isEnglish ? 'Message:' : 'Mensaje:'}</strong></p>
            <p style="background:#f1f5f9;padding:15px;border-radius:8px;">${message}</p>
          </div>
        </div>`;

      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'studio@kroniq.com.mx',
          to: adminEmail,
          subject: isEnglish ? '[FWD] New Contact Message - KroniQ' : '[FWD] Nuevo mensaje de contacto - KroniQ',
          html: contactHTML,
        });
      }

      const clientHTML = `
        <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#6B21A8,#4C1D95);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;">${isEnglish ? 'Message Received' : 'Mensaje recibido'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p>${isEnglish ? `Hello <strong>${name}</strong>,` : `Hola <strong>${name}</strong>,`}</p>
            <p>${isEnglish ? 'We have received your message and will contact you soon.' : 'Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.'}</p>
            <p style="color:#6B7280;">KroniQ - studio@kroniq.com.mx</p>
          </div>
        </div>`;

      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'studio@kroniq.com.mx',
        to: to,
        subject: isEnglish ? 'Message Received - KroniQ' : 'Mensaje recibido - KroniQ',
        html: clientHTML,
      });

      return NextResponse.json({ success: true });
    }

    if (type === 'custom' && customData) {
      const customHTML = `
        <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#6B21A8,#4C1D95);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;">${isEnglish ? 'Custom Package Request' : 'Solicitud de Paquete Personalizado'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p>${isEnglish ? `Hello <strong>${customData.firstName}</strong>,` : `Hola <strong>${customData.firstName}</strong>,`}</p>
            <p>${isEnglish ? 'We have received your request for a custom package. Validation will be pending in the following days.' : 'Hemos recibido tu solicitud de paquete personalizado. La validación quedará pendiente en los próximos días.'}</p>
            <p><strong>${isEnglish ? 'Quote ID:' : 'ID de Cotización:'}</strong> ${customData.quoteId}</p>
            <p><strong>${isEnglish ? 'Amount:' : 'Monto:'}</strong> $${customData.amount} MXN</p>
            <p style="color:#6B7280;">KroniQ - studio@kroniq.com.mx</p>
          </div>
        </div>`;

      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'studio@kroniq.com.mx',
          to: adminEmail,
          subject: isEnglish ? '[FWD] Custom Package Request - KroniQ' : '[FWD] Solicitud de Paquete Personalizado - KroniQ',
          html: customHTML,
        });
      }

      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'studio@kroniq.com.mx',
        to: customData.email,
        subject: isEnglish ? 'Custom Package Request Received - KroniQ' : 'Solicitud de Paquete Personalizado Recibida - KroniQ',
        html: customHTML,
      });

      return NextResponse.json({ success: true });
    }

    if (orderData) {
      const productosHTML = orderData.productos
        .map((p: any) => `<tr><td style="padding:8px;border-bottom:1px solid rgba(107,33,168,0.2);color:#1F2937;">${p.nombre} × ${p.cantidad}</td><td style="padding:8px;border-bottom:1px solid rgba(107,33,168,0.2);text-align:right;color:#6B21A8;">$${p.precio.toFixed(2)}</td></tr>`)
        .join('');

      const emailHTML = `
        <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#6B21A8,#4C1D95);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;">${isEnglish ? 'Purchase Confirmed!' : '¡Compra confirmada!'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p style="font-size:16px;">${isEnglish ? `Hello <strong style="color:#6B21A8;">${orderData.nombre}</strong>,` : `Hola <strong style="color:#6B21A8;">${orderData.nombre}</strong>,`}</p>
            <p>${isEnglish ? 'Your order has been processed successfully.' : 'Tu pedido ha sido procesado correctamente.'}</p>
            <h2 style="color:#1F2937;font-size:18px;border-bottom:2px solid #6B21A8;padding-bottom:8px;">${isEnglish ? 'Order Summary' : 'Resumen de tu pedido'}</h2>
            <table style="width:100%;border-collapse:collapse;">${productosHTML}</table>
            <div style="margin-top:20px;padding:20px;background:#EDE9FE;border-radius:8px;border:1px solid rgba(107,33,168,0.2);">
              <p><strong>${isEnglish ? 'Subtotal:' : 'Subtotal:'}</strong> <span style="color:#6B21A8;">$${orderData.subtotal.toFixed(2)}</span></p>
              <p><strong>${isEnglish ? 'Tax (16%):' : 'IVA (16%):'}</strong> <span style="color:#6B21A8;">$${orderData.impuesto.toFixed(2)}</span></p>
              <p style="font-size:18px;"><strong>${isEnglish ? 'Total:' : 'Total:'}</strong> <span style="color:#6B21A8;">$${orderData.total.toFixed(2)} <span style="font-size:14px;">MXN</span></span></p>
            </div>
            <p style="color:#6B7280;"><strong>${isEnglish ? 'Transaction:' : 'Transacción:'}</strong> ${orderData.transactionId}</p>
            <p>${isEnglish ? 'Thank you for your purchase at' : 'Gracias por tu compra en'} <strong style="color:#6B21A8;">KroniQ</strong>.</p>
          </div>
          <div style="background:#EDE9FE;padding:20px;text-align:center;border-top:1px solid rgba(107,33,168,0.1);">
            <p style="color:#6B7280;font-size:12px;margin:0;">KroniQ - studio@kroniq.com.mx</p>
          </div>
        </div>`;

      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'studio@kroniq.com.mx',
        to: to,
        subject: isEnglish ? 'Purchase Confirmed! - KroniQ' : '¡Compra confirmada! - KroniQ',
        html: emailHTML,
      });

      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'studio@kroniq.com.mx',
          to: adminEmail,
          subject: isEnglish ? `[FWD] New Purchase - ${orderData.nombre}` : `[FWD] Nueva compra - ${orderData.nombre}`,
          html: `<div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:12px;overflow:hidden;"><div style="background:#6B21A8;padding:20px;"><h2 style="color:#f8fafc;margin:0;">${isEnglish ? 'New Purchase' : 'Nueva compra'}</h2></div><div style="padding:20px;"><p><strong>${isEnglish ? 'Customer:' : 'Cliente:'}</strong> ${orderData.nombre}</p><p><strong>Total:</strong> <span style="color:#6B21A8;">$${orderData.total.toFixed(2)} MXN</span></p></div>${emailHTML}</div>`,
        });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}