import fs from 'fs';
import path from 'path';
import PocketBase from 'pocketbase';

const pb = new PocketBase(env.POCKETBASE_URL);

async function readSentencesFromFile(filePath) {
  try {
    const absolutePath = path.resolve(filePath);
    // Read the contents of the specified file
    const sentencesData = fs.readFileSync(absolutePath, 'utf8');

    // Split the data into individual sentences
    const sentences = sentencesData.split('\n').filter(line => line.trim() !== '');

    // Iterate through the sentences
    for (const sentence of sentences) {
      // Split each sentence into its three components
      const [category, sentenceText, politicalAffiliation] = sentence.split(',').map(item => item.trim().replace(/['"]/g, '').replace(/\(|\)/g, ''));

      //console.log('Processing sentence:', category, sentenceText, politicalAffiliation);

      await pb.collection('sentences').create({
        topic: category,
        sentence: sentenceText,
        political_affiliation: politicalAffiliation
      });
    }

    console.log('Sentences have been successfully inserted into the PocketBase collection.');
  } catch (error) {
    console.error('Error reading or inserting sentences:', error);
  }
}

// Call the function with the path to your sentences file
readSentencesFromFile('sentences.txt');