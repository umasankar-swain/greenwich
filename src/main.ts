import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { ExpressAdapter, NestExpressApplication, } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as useragent from 'express-useragent';
import rateLimit from 'express-rate-limit';
import appConfiguration from './app.configuration';
import Swagger from './app.swagger';;

async function bootstrap(): Promise<void> {

  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());

  const logger = new Logger(`${appConfiguration().APP.TITLE}`, { timestamp: true });

  logger.log(`Application instance bootstrap process initialized.`);

  // app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.use(useragent.express());
  app.use(morgan('combined'));
  app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalFilters(new ExceptionHandler());
  app.enableVersioning({ type: VersioningType.URI });
  // app.enableCors({ origin: true, credentials: true });
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      process.env.NEXT_APP_URL,
    ],
    credentials: true
  });
  app.setGlobalPrefix(appConfiguration().APP.API_GLOBAL_PREFIX);
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

  const swagger: Swagger = new Swagger(app);
  await Promise.all([
    swagger.init(),
  ]);

  await app.listen(appConfiguration().APP.PORT, '0.0.0.0', async () => {
    await Promise.all([
      await appConfiguration().instance(),
      await appConfiguration().config(app, appConfiguration().APP)
    ]);
  });
}
bootstrap();