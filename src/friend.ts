import * as moment from 'moment';

export interface IDatabaseFriend {
  last_name: string;
  first_name: string;
  date_of_birth: string;
  email: string;
}

export class Friend {
  private constructor(
    readonly lastName: string,
    readonly firstName: string,
    readonly dOb: string,
    readonly email: string
  ) {}

  static createFromDatabaseValues(databaseFriend: IDatabaseFriend): Friend {
    return new Friend(
      databaseFriend.last_name,
      databaseFriend.first_name,
      databaseFriend.date_of_birth,
      databaseFriend.email
    );
  }

  isBirthday(): Boolean {
    const parsedBirthday = moment(this.dOb, 'YYYY/MM/DD');

    if (!parsedBirthday.isValid()) {
      const errorMsg = `Invalid birthday ${this.dOb}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    const currentDate = moment();

    if (currentDate.dayOfYear() === parsedBirthday.dayOfYear()) {
      return true;
    }

    const birthdayMonth = parsedBirthday.format('MM');

    // If the month is february and the birthday is on the 29th, greet on the 28th.
    if (birthdayMonth === '02' && parsedBirthday.date() === 29) {
      return currentDate.date() === 28;
    }

    return false;
  }
}
