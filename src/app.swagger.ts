import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import appConfiguration from './app.configuration';

export default class Swagger {

    private app: INestApplication;
 
    constructor(app: INestApplication) {
        this.app = app;
    }

    private get options() {
        return new DocumentBuilder()
            .setTitle(appConfiguration().APP.TITLE)
            .setDescription(appConfiguration().APP.DESCRIPTION)
            .setVersion(appConfiguration().APP.VERSION)
            .addBearerAuth({ in: 'header', type: 'http', name: 'Authorization' })
            .build(); 
    }

    public async init() {
        SwaggerModule.setup('/', this.app, SwaggerModule.createDocument(this.app, this.options));
    }
}
