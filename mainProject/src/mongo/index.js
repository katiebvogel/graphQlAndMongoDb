
import { MongoClient, ServerApiVersion } from 'mongodb';
import {configObj} from '../../config.js';
const uri = configObj.configUriString;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function setupDatabase() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db('sample_mflix');
    // Send a ping to confirm a successful connection
    // const movies = await client.db("sample_mflix").collection('movies').find().toArray();
    // console.log('movies', movies);

    return {
        client,
        db: db,
        
        users: db.collection('users'),
        movies: db.collection('movies')
        
    }
  } catch(e) {
    console.log('error at connection to db', e);
  }
}
