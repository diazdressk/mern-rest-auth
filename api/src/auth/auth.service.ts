/* создал командой nest g s auth --no-spec.чтобы автоматически импортировались, собрались в module */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService /* для отправки токена */,
  ) { }

  async hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12 /* 12 раз хэширую */);
  }

  async register(
    user: Readonly<NewUserDTO>,
  ): Promise<
    UserDetails | any
  > /* уже с измененнём,хэшированным пароль, либо any(я буду стриг отправлять), если не получилось зарегистрироват */ {
    const { name, email, password } = user;
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser)
      throw new HttpException(
        'An account with that email already exists!',
        HttpStatus.CONFLICT,
      );

    const hashedPassword = await this.hashedPassword(password);

    const newUser = await this.userService.create(name, email, hashedPassword);
    return this.userService._getUserDetails(newUser);
  }

  /* сравнение паролей при логининге */
  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;
    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password /* в юзере в бд хэшированный пароль,использую его */,
    );

    if (!doesPasswordMatch) return null;

    return this.userService._getUserDetails(user);
  }

  async login(
    existingUser: ExistingUserDTO,
  ): Promise<{ token: string } | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user)
      throw new HttpException('Credentials invalid', HttpStatus.UNAUTHORIZED);

    /* если юзер есть, создаю токен и отправляю в ответ */
    const jwt = await this.jwtService.signAsync({ user }); /* создаю токен */

    return { token: jwt };
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}
