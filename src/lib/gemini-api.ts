
interface GeminiMessage {
  role: 'user' | 'model';
  parts: Array<{
    text: string;
  }>;
}

// Fixed API key - no longer requiring user input
const DEFAULT_API_KEY = "AIzaSyD5jMB6FmRXKmdk0nvSe7fxYqD1w-x3meo";

export const generateGeminiResponse = async (
  prompt: string,
  apiKey: string = DEFAULT_API_KEY 
): Promise<string> => {
  try {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Unexpected API response format:", data);
      throw new Error("Unexpected API response format");
    }
    
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
