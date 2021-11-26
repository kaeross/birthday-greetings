import {DatabaseClient} from './database/database_client';
import {DatabaseService} from './database/database_service';
import {AbstractGreeting} from './greetings/abstract_greeting';
import {EmailGreeting} from './greetings/email_greeting';
import {Friend} from './friend';

export class BirthdayGreeting {
  constructor(private databaseService: DatabaseService) {}

  async sendGreeting() {
    const friends = await this.databaseService.getFriends();

    if (!friends) {
      return;
    }

    for (const friend of friends) {
      if (friend.isBirthday()) {
        this.greetFriendWith(friend, new EmailGreeting());
      }
    }
  }

  private greetFriendWith(friend: Friend, greeting: AbstractGreeting) {
    greeting.generate(friend);
    greeting.greet();
  }
}
