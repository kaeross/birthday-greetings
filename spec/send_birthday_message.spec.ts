import {Friend} from '../src/friend';
import {DatabaseService} from '../src/database/database_service';
import {BirthdayGreeting} from '../src/birthday_greeting';
import {MongoClient} from 'mongodb';

describe('sendBirthdayMessage', () => {
  let birthdayGreeting: BirthdayGreeting;

  beforeEach(() => {
    jasmine.clock().install();

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
      {
        first_name: 'Jenna',
        last_name: 'Marbles',
        date_of_birth: '1999/02/29',
        email: 'jenna.marbles@foobar.com',
      },
    ];

    const friends = dbFriends.map(dbFriend =>
      Friend.createFromDatabaseValues(dbFriend)
    );

    const databaseService = new DatabaseService({} as unknown as MongoClient);

    spyOn(databaseService, 'getFriends').and.resolveTo(friends);

    birthdayGreeting = new BirthdayGreeting(databaseService);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should send an email to John on the 8th October 2021', () => {
    jasmine.clock().mockDate(new Date('2021-10-08'));

    spyOn(console, 'log');

    birthdayGreeting.sendGreeting();

    expect(console.log).toHaveBeenCalledWith(
      'Subject: Happy birthday!\nHappy birthday, dear John!'
    );
  });

  it('should not send an email to John on a date other than the 8th October', () => {
    jasmine.clock().mockDate(new Date('2021-09-08'));

    spyOn(console, 'log');

    birthdayGreeting.sendGreeting();

    expect(console.log).not.toHaveBeenCalled();
  });

  it('should send an email to Mary on the 9th November 2022', () => {
    jasmine.clock().mockDate(new Date('2022-11-09'));

    spyOn(console, 'log');

    birthdayGreeting.sendGreeting();

    expect(console.log).toHaveBeenCalledWith(
      'Subject: Happy birthday!\nHappy birthday, dear Mary!'
    );
  });

  it('should not send an email to Mary on a date other than the 9th November', () => {
    jasmine.clock().mockDate(new Date('2022-11-10'));

    spyOn(console, 'log');

    birthdayGreeting.sendGreeting();

    expect(console.log).not.toHaveBeenCalled();
  });

  it('should send an email to Jenna on the 29th February 2020 which is a leap year', () => {
    jasmine.clock().mockDate(new Date('2020-02-29'));

    spyOn(console, 'log');

    birthdayGreeting.sendGreeting();

    expect(console.log).toHaveBeenCalledWith(
      'Subject: Happy birthday!\nHappy birthday, dear Jenna!'
    );
  });

  it('should send an email to Jenna on the 28th February 2019 which is not a leap year', () => {
    jasmine.clock().mockDate(new Date('2019-02-28'));

    spyOn(console, 'log');

    birthdayGreeting.sendGreeting();

    expect(console.log).toHaveBeenCalledWith(
      'Subject: Happy birthday!\nHappy birthday, dear Jenna!'
    );
  });

  it('should not send an email to Jenna on a date that is not the 28th or 29th of february', () => {
    jasmine.clock().mockDate(new Date('2021-11-10'));

    spyOn(console, 'log');

    birthdayGreeting.sendGreeting();

    expect(console.log).not.toHaveBeenCalled();
  });
});
