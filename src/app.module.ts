import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { SessionsModule } from './api/sessions/sessions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './db/orm.config';
import { ConfigModule } from '@nestjs/config';
import appConfiguration from './app.configuration';

@Module({
  imports: [
    AuthModule, 
    UserModule, 
    SessionsModule,
    TypeOrmModule.forRoot(ormconfig),
    // TypeOrmModule.forRoot({
    //   type: (appConfiguration().APP.DB.TYPE as any),
    //   host: appConfiguration().APP.DB.HOST,
    //   database: appConfiguration().APP.DB.DATABASE,
    //   port: parseInt(appConfiguration().APP.DB.PORT as any),
    //   username: appConfiguration().APP.DB.USERNAME,
    //   password: appConfiguration().APP.DB.PASSWORD,
    //   logging: false,
    //   autoLoadEntities: true,
    //   synchronize: false,
    // }),
    ConfigModule.forRoot({ load: [appConfiguration] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
