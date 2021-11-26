import {Friend} from '../friend';

export abstract class AbstractGreeting {
  abstract greeting?: string;

  abstract generate(friend: Friend): void;

  abstract greet(): void;
}
