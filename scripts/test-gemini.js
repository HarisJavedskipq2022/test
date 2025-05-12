const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGeminiAPI() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Say hello in a creative way";
    const result = await model.generateContent(prompt);
    const response = result.response;
    console.log("API Test Success:", response.text());
  } catch (error) {
    console.error("API Test Error:", error);
    console.error(
      "API Key used:",
      process.env.GOOGLE_GEMINI_API_KEY
        ? "API key is set"
        : "API key is missing"
    );
  }
}

testGeminiAPI();
