import express from 'express';
import multer from 'multer';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import cors from 'cors';
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

const app = express();
const port = 3020;

// CORS middleware
app.use(cors());
// Parse JSON bodies
app.use(express.json());

// Set up Multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Initialize the ChatGoogleGenerativeAI model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  apiKey: "AIzaSyD66npWWEDp8zXmnI2X9FMPQwDQs6A4NIs",
  maxOutputTokens: 2048,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ],
});

// Define the prompt template
const prompt = ChatPromptTemplate.fromTemplate(
  `Answer user questions in a human like way rephare it correctly 
  Context: {context}
  Question: {input}`
);

// Create an endpoint to handle incoming requests with PDF uploads
app.post('/api/process-input', upload.single('file'), async (req, res) => {
  try {
    // Load documents from the uploaded PDF
    const filePath = req.file.path;
    const loader = new PDFLoader(filePath); // Replace PDFDocumentLoader with appropriate class for PDF loading
    const docs = await loader.load();
 
    // Create a chain with the loaded documents
    const chain = await createStuffDocumentsChain({ llm: model, prompt });

    // Split the documents
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    const splitDocs = await splitter.splitDocuments(docs);

    // Process input
    const input = req.body.input; // Assuming the input is sent in the request body
    const result = await chain.invoke({ input, context: splitDocs });

    res.json(result);
  } catch (error) {
    console.error('Error processing input:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
