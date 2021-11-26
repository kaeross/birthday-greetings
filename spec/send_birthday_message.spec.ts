import {Friend} from '../src/friend';
import {DatabaseService} from '../src/database/database_service';
import {BirthdayGreeting} from '../src/birthday_greeting';
import {MongoClient} from 'mongodb';

describe('sendBirthdayMessage', () => {
  let birthdayGreeting: BirthdayGreeting;

  beforeEach(() => {
    const dbFriends = [
      {
        first_name: 'John',
        last_name: 'Doe',
        date_of_birth: '1982/10/08',
        email: 'john.doe@foobar.com',
      },
      {
        first_name: 'Mary',
        last_name: 'Ann',
        date_of_birth: '1975/09/11',
        email: 'mary.ann@foobar.com',
      },
    ];

    const friends = dbFriends.map(dbFriend =>
      Friend.createFromDatabaseValues(dbFriend)
    );

    const databaseService = new DatabaseService({} as unknown as MongoClient);

    spyOn(databaseService, 'getFriends').and.resolveTo(friends);

    birthdayGreeting = new BirthdayGreeting(databaseService);
  });

  it('should send an email to John on the 8th October 2021', () => {
    spyOn(console, 'log');

    birthdayGreeting.sendGreeting();

    expect(console.log).toHaveBeenCalledWith(
      'Subject: Happy birthday!\nHappy birthday, dear John!'
    );
  });

  it('should send an email to John on the 8th October 2022', () => {
    spyOn(console, 'log');

    birthdayGreeting.sendGreeting();

    expect(console.log).not.toHaveBeenCalled();
  });

  it('should not send an email to John on a date other than the 8th October', () => {});

  it('should send an email to Many on the 9th November 2021', () => {});

  it('should send an email to Many on the 9th November 2022', () => {});

  it('should not send an email to Many on a date other than the 9th November', () => {});
});
