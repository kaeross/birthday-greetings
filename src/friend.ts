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
    const currentDate = moment();

    const birthdayMonth = parsedBirthday.month();

    // If the month is february, greet on the 28th.
    if (birthdayMonth === 2) {
      return parsedBirthday.date() === 28;
    }

    return currentDate.dayOfYear() === parsedBirthday.dayOfYear();
  }
}
