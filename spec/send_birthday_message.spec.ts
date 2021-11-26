import {MongoClient} from 'mongodb';
import * as moment from 'moment';
import {Friend} from '../src/friend';
import {DatabaseService} from '../src/database/database_service';
import {BirthdayGreeting} from '../src/birthday_greeting';

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
        date_of_birth: '1996/02/29',
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

  it('should send an email to John on the 8th October 2021', async () => {
    const fakeDate = moment('2021-10-08').toDate();
    jasmine.clock().mockDate(fakeDate);

    spyOn(console, 'log');

    await birthdayGreeting.sendGreeting();

    expect(console.log).toHaveBeenCalledWith(
      'Subject: Happy birthday!\nHappy birthday, dear John!'
    );
  });

  it('should not send an email to John on a date other than the 8th October', async () => {
    jasmine.clock().mockDate(moment('2021-09-08').toDate());

    spyOn(console, 'log');

    await birthdayGreeting.sendGreeting();

    expect(console.log).not.toHaveBeenCalled();
  });

  it('should send an email to Mary on the 11th September 2017', async () => {
    jasmine.clock().mockDate(moment('2017-09-11').toDate());

    spyOn(console, 'log');

    await birthdayGreeting.sendGreeting();

    expect(console.log).toHaveBeenCalledWith(
      'Subject: Happy birthday!\nHappy birthday, dear Mary!'
    );
  });

  it('should not send an email to Mary on a date other than the 9th November', async () => {
    jasmine.clock().mockDate(moment('2022-11-10').toDate());

    spyOn(console, 'log');

    await birthdayGreeting.sendGreeting();

    expect(console.log).not.toHaveBeenCalled();
  });

  it('should send an email to Jenna on the 29th February 2020 which is a leap year', async () => {
    jasmine.clock().mockDate(moment('2020-02-29').toDate());

    spyOn(console, 'log');

    await birthdayGreeting.sendGreeting();

    expect(console.log).toHaveBeenCalledWith(
      'Subject: Happy birthday!\nHappy birthday, dear Jenna!'
    );
  });

  it('should send an email to Jenna on the 28th February 2019 which is not a leap year', async () => {
    jasmine.clock().mockDate(moment('2019-02-28').toDate());

    spyOn(console, 'log');

    await birthdayGreeting.sendGreeting();

    expect(console.log).toHaveBeenCalledWith(
      'Subject: Happy birthday!\nHappy birthday, dear Jenna!'
    );
  });

  it('should not send an email to Jenna on a date that is not the 28th or 29th of february', async () => {
    jasmine.clock().mockDate(moment('2021-11-10').toDate());

    spyOn(console, 'log');

    await birthdayGreeting.sendGreeting();

    expect(console.log).not.toHaveBeenCalled();
  });
});
