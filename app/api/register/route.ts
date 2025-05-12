import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import QRCode from "qrcode";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const qrCodeData = await QRCode.toDataURL(email);

    let aiMessage = "";
    try {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
      });

      const prompt = `Generate a friendly, personalized welcome message for a user with email: ${email}. 
                     The message should be brief and creative, mentioning something interesting about their email 
                     or the current date. Keep it under 100 characters.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      aiMessage = response.text();
    } catch (error) {
      console.error("Error generating AI message:", error);
      aiMessage = `Welcome ${email}! We're glad to have you here.`;
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        qrCode: qrCodeData,
        aiGeneratedMessage: aiMessage,
      },
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during registration" },
      { status: 500 }
    );
  }
}
