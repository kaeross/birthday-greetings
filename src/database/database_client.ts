import {MongoClient} from 'mongodb';

export class DatabaseClient {
  /**
   * @returns a connected client
   */
  static async connect(): Promise<MongoClient> {
    try {
      return await new MongoClient('mongodb://localhost:27017').connect();
    } catch (e) {
      console.error('Could not connect to mongodb');
      throw e;
    }
  }
}
