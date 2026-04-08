import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { contactSchema } from "@/validation/contact";

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_LOGIN,
        pass: process.env.BREVO_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

function getOwnerEmailHTML(name, email, phone, message) {
    return `
<div style="
    font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    background-color: #1b1b1b;
    padding: 20px;
">
    <div style="
        max-width: 600px;
        margin: 0 auto;
        background-color: #222222;
        border-radius: 20px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        border-top: 6px solid #2181FF;
        overflow: hidden;
    ">
        <div style="background-color: #2181FF; color: #fff; padding: 20px 24px;">
            <h1 style="margin: 0; font-size: 22px; letter-spacing: 0.5px;">New Contact Form Submission</h1>
        </div>

        <div style="padding: 24px; color: #fff;">
            <p style="margin: 0 0 16px; font-size: 16px;">
                <strong style="color: #2181FF;">Name:</strong> ${name}
            </p>
            <p style="margin: 0 0 16px; font-size: 16px;">
                <strong style="color: #2181FF;">Email:</strong> ${email}
            </p>
            <p style="margin: 0 0 16px; font-size: 16px;">
                <strong style="color: #2181FF;">Phone:</strong> ${phone}
            </p>

            <hr style="border: none; border-top: 1px solid #2c2c2c; margin: 20px 0;">

            <p style="font-size: 16px; margin-bottom: 12px; color: #2181FF;">
                <strong>Message:</strong>
            </p>
            <p style="
                font-size: 15px;
                color: #fff;
                white-space: pre-wrap;
                line-height: 1.6;
                background-color: #2c2c2c;
                padding: 20px;
                border-left: 4px solid #2181FF;
                border-radius: 5px;
            ">
${message}
            </p>
        </div>

        <div style="
            background-color: #1b1b1b;
            color: #fff;
            text-align: center;
            font-size: 13px;
            padding: 16px;
        ">
            <p style="margin: 0;">This email was automatically sent from your website contact form.</p>
        </div>
    </div>
</div>
`;
}

function getUserEmailHTML(name) {
    return `
<div style="
    font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    background-color: #1b1b1b;
    padding: 20px;
">
    <div style="
        max-width: 600px;
        margin: 0 auto;
        background-color: #222222;
        border-radius: 20px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        border-top: 6px solid #2181FF;
        overflow: hidden;
    ">
        <div style="background-color: #2181FF; color: #fff; padding: 20px 24px;">
            <h1 style="margin: 0; font-size: 22px; letter-spacing: 0.5px;">Thank You for Contacting Us!</h1>
        </div>

        <div style="padding: 24px; color: #fff;">
            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6;">
                Hi <strong style="color: #2181FF;">${name}</strong>,
            </p>
            
            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6;">
                Thank you for reaching out to us! We have received your message and our team will get back to you as soon as possible.
            </p>

            <div style="
                background-color: #2c2c2c;
                padding: 20px;
                border-left: 4px solid #2181FF;
                border-radius: 5px;
                margin: 20px 0;
            ">
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #fff;">
                    We typically respond within <strong style="color: #2181FF;">24-48 hours</strong>. 
                    If your inquiry is urgent, please feel free to call us directly.
                </p>
            </div>

            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6;">
                We look forward to speaking with you!
            </p>

            <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #2181FF;">
                <strong>Best regards,<br>Our Team</strong>
            </p>
        </div>

        <div style="
            background-color: #1b1b1b;
            color: #fff;
            text-align: center;
            font-size: 13px;
            padding: 16px;
        ">
            <p style="margin: 0;">This is an automated confirmation email. Please do not reply to this email.</p>
        </div>
    </div>
</div>
`;
}

export async function POST(req) {
    try {
        let body;

        try {
            body = await req.json();
        } catch (error) {
            return NextResponse.json(
                { message: "Missing required fields." },
                { status: 400 }
            );
        }

        const result = contactSchema.safeParse(body);
        if (!result.success) {
            const message = result.error.issues
                .map((issue) => issue.message)
                .join(", ");

            return NextResponse.json({ message }, { status: 400 });
        }

        const { name, email, phone, message } = body;

        // Email to owner
        const ownerMailOptions = {
            from: `"Website Contact Form" <${process.env.TRANSACTIONAL_DOMAIN}>`,
            to: process.env.OWNER_EMAIL,
            replyTo: email,
            subject: `New Contact Request from ${name}`,
            html: getOwnerEmailHTML(name, email, phone, message),
        };

        // Email to user
        const userMailOptions = {
            from: `"Our Team" <${process.env.TRANSACTIONAL_DOMAIN}>`,
            to: email,
            subject: `Thank You for Contacting Us`,
            html: getUserEmailHTML(name),
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(ownerMailOptions),
            transporter.sendMail(userMailOptions),
        ]);

        return NextResponse.json(
            { message: "Contact message sent successfully!" },
            { status: 200 }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { message: "Failed to send contact email." },
            { status: 500 }
        );
    }
}
