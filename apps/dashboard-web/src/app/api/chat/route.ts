import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log(messages);

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: messages.at(-1).role,
        content: `Based on the keyword data analysis results below, please rate the keyword combination with one word from very good to very bad, and ask for detailed advice on content creation using the introduced related content and recommended content topics.
        The output format should be as follows, with no additional comments:
        ### Keyword evaluation(키워드 평가)
        ### Content topic recommendations(콘텐츠 주제 추천) (3)
        ### Detailed advice(상세 조언)
        The entire summary must be written in Korean (Republic of Korea).
        Content data analysis includes:${messages.at(-1).content}`,
      },
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
