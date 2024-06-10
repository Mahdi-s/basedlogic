'use server';
import PocketBase from 'pocketbase';

console.log("URL === ",process.env.POCKETBASE_URL);
const pb = new PocketBase(process.env.POCKETBASE_URL);

export  async function getSentences({session}) {
  try {
    let sentences;
    let totalItems;
    let totalPages = 1;
    const perPage = 30; 
    console.log("session", session);

    if (session) {
      console.log(" if session", session);
      const userId = session.user.id;

      // Fetch user inputs to get the list of sentence IDs the user has already interacted with
      const userInputs = await pb.collection('user_inputs').getFullList({
        filter: `user_id = "${userId}"`,
      });

      const answeredSentenceIds = userInputs.map(input => input.sentence_id);

      // Fetch sentences excluding those already answered by the user
      const result = await pb.collection('sentences').getList(1, perPage, {
        filter: `id NOT IN (${answeredSentenceIds.map(id => `"${id}"`).join(', ')})`,
      });

      sentences = result.items;
      totalItems = result.totalItems;
      totalPages = result.totalPages;
    } else {
      console.log("else session", session);

      // Fetch all sentences
      const allSentences = await pb.collection('sentences').getFullList();

      // console.log("allSentences", allSentences);

      // Group sentences by topic
      const sentencesByCategory = allSentences.reduce((acc, sentence) => {
        if (!acc[sentence.topic]) {
          acc[sentence.topic] = [];
        }
        acc[sentence.topic].push(sentence);
        return acc;
      }, {});

      // Pick one random sentence from each topic
      sentences = Object.values(sentencesByCategory).map((categorySentences: any[]) => {
        const randomIndex = Math.floor(Math.random() * categorySentences.length);
        return categorySentences[randomIndex];
      });

      totalItems = sentences.length;
    }

    // Map the sentences to the desired format
    const formattedSentences = sentences.map(sentence => ({
      id: sentence.id,
      collectionId: sentence.collectionId,
      sentence: sentence.sentence,
      topic: sentence.topic,
      tag: sentence.political_affiliation,
    }));


    
    return JSON.stringify(formattedSentences);
  } catch (error) {
    // Handle errors that might occur during database operations
    console.error('Database error:', error);
    console.log("------------------------");
    throw new Error('Failed to load sentences from the database');
  }
}
