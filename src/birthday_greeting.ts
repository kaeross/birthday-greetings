import {DatabaseService} from './database/database_service';
import {AbstractGreeter} from './greetings/abstract_greeter';
import {EmailGreeter} from './greetings/email_greeter';
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
        this.greetFriendWith(friend, new EmailGreeter());
      }
    }
  }

  /**
   * Greets a friend using the specified greeter
   *
   * @param friend the friend to greet
   * @param greeting the greeting
   */
  private greetFriendWith(friend: Friend, greeting: AbstractGreeter) {
    greeting.generate(friend);
    greeting.greet();
  }
}
