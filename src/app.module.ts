import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './configs/typeorm.config';
import { TodoModule } from './modules/Todo/todo.module';
import { UserModule } from './modules/User/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `${process.cwd()}/${process.env.NODE_ENV}.env`,
        `${process.cwd()}/.env`,
      ],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    TodoModule,
  ],
})
export default class AppModule {}
