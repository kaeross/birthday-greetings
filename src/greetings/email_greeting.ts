import {Friend} from '../friend';
import {AbstractGreeting} from './abstract_greeting';

export class EmailGreeting extends AbstractGreeting {
  greeting?: string;

  generate(friend: Friend): void {
    this.greeting = `Subject: Happy birthday!\nHappy birthday, dear ${friend.firstName}!`;
  }

  greet(): void {
    if (!this.greeting) {
      const errorMsg = 'Please generate a greeting';
      console.error('Please generate a greeting');
      throw new Error(errorMsg);
    }

    console.log(this.greeting);
  }
}
