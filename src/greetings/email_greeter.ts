import {Friend} from '../friend';
import {AbstractGreeter} from './abstract_greeter';

export class EmailGreeter extends AbstractGreeter {
  greeting?: string;

  generate(friend: Friend): void {
    this.greeting = `Subject: Happy birthday!\nHappy birthday, dear ${friend.firstName}!`;
  }

  /**
   * This is where we could implement an email specific greeting method eg. using nodemailer
   */
  greet(): void {
    if (!this.greeting) {
      const errorMsg = 'Please generate a greeting';
      console.error('Please generate a greeting');
      throw new Error(errorMsg);
    }

    console.log(this.greeting);
  }
}
