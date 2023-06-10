import { config } from 'dotenv';
config();

const API_VISION_keyFilename = process.env.API_VISION_keyFilename;

// Import the Google Cloud client library
import { ImageAnnotatorClient } from '@google-cloud/vision';

// Create a client and provide the path to your service account key file
const client = new ImageAnnotatorClient({
  keyFilename: API_VISION_keyFilename,
});

const detectText = async (jpg) => {
  // The name of the image file to annotate
  let fileName = jpg;

  // Perform text detection
  let [result] = await client.textDetection(fileName);
  let detectedItems = result.textAnnotations[0].description.split('+');
  // console.log(detectedItems);
  return detectedItems;
};

export default detectText;
