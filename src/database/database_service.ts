import {MongoClient} from 'mongodb';
import {Friend, IDatabaseFriend} from '../friend';

export class DatabaseService {
  constructor(private client: MongoClient) {}

  /**
   * @returns an array of Friends if there are any in the db
   */
  async getFriends(): Promise<Friend[] | null> {
    const collection = this.client.db('birthdays').collection('friends');

    const rawFriends = await collection.find<IDatabaseFriend>({}).toArray();

    return rawFriends.map(rawFriend =>
      Friend.createFromDatabaseValues(rawFriend)
    );
  }
}
