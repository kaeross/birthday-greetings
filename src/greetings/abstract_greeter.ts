import {Friend} from '../friend';

export abstract class AbstractGreeter {
  abstract greeting?: string;

  abstract generate(friend: Friend): void;

  abstract greet(): void;
}
