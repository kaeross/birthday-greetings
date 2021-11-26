import {IFriend} from '../src/models/friend';

describe('sendBirthdayMessage', () => {
  let friends: IFriend[];

  beforeEach(() => {
    friends = [
      {
        firstName: 'John',
        lastName: 'Doe',
        dOb: '1982/10/08',
        email: 'john.doe@foobar.com',
      },
      {
        firstName: 'Mary',
        lastName: 'Ann',
        dOb: '1975/09/11',
        email: 'mary.ann@foobar.com',
      },
    ];
  });

  it('should send an email to John on the 8th October 2021', () => {});

  it('should send an email to John on the 8th October 2022', () => {});

  it('should not send an email to John on a date other than the 8th October', () => {});

  it('should send an email to Many on the 9th November 2021', () => {});

  it('should send an email to Many on the 9th November 2022', () => {});

  it('should not send an email to Many on a date other than the 9th November', () => {});
});
