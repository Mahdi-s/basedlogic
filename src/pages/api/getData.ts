import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from "@vercel/postgres";

export default async function getData(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Execute SQL query
    const result = await sql`SELECT sentence FROM topics`;

    // Check if result.rows exists and is an array
    if (Array.isArray(result.rows)) {
      // Extract sentences into an array using map
      const sentences = result.rows.map(item => item.sentence);

      // Send the sentences array as a response
      res.status(200).json(sentences);
    } else {
      // If result.rows is not an array, send an error response
      throw new Error('Unexpected data structure from database query');
    }
  } catch (error) {
    // Handle errors that might occur during database operations
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to load sentences from the database' });
  }
}
