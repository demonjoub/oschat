import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        role: 0,
        username: 'admin',
        password: '1234',
      },
      {
        userId: 2,
        role: 1,
        username: 'room1',
        password: '1234',
      },
      {
        userId: 3,
        role: 1,
        username: 'room2',
        password: '1234',
      },
      {
        userId: 4,
        role: 1,
        username: 'room3',
        password: '1234',
      },
      {
        userId: 5,
        role: 1,
        username: 'room4',
        password: '1234',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findAll(): Promise<User | undefined> {
    return this.users
  }

}
