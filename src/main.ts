import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    exposedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, X-Total-Count, Access-Control-Expose-Headers',
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, X-Total-Count, Access-Control-Expose-Headers, Authorization',
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
});
  await app.listen(4001);
}
bootstrap();
