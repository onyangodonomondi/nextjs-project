import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Here you would typically send this data to your email service or database
    // For now, we'll just log it and return a success response
    console.log('Contact form submission:', { name, email, phone, service, message });

    // You can integrate with services like SendGrid, AWS SES, or your own SMTP server
    // Example:
    // await sendEmail({
    //   to: 'info@mockydigital.com',
    //   subject: `New Contact Form Submission from ${name}`,
    //   text: `
    //     Name: ${name}
    //     Email: ${email}
    //     Phone: ${phone}
    //     Service: ${service}
    //     Message: ${message}
    //   `
    // });

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
} 