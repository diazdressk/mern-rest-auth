import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller'; /* создал командой "nest g co auth --no-spec",чтобы автоматически ипортировались и тд */
import { AuthService } from './auth.service'; /* nest g s auth --no-spec */
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [UserModule/* забираю всякое из UserModule */, JwtModule.registerAsync({ useFactory: () => ({ secret: "secret", signOptions: { expiresIn: '3600s'/* будет работать час */ } }) })/* буду отправлять токен во фронт после регистрации/логина */],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy]
})
export class AuthModule { }
