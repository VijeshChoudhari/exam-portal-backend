import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import constants from './constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle('exam-portal')
  .setDescription('exam-portal API description')
  .setVersion('1.0')
  .addTag('')
  .addBearerAuth({
    type:'http',scheme : 'bearer', bearerFormat: 'JWT'
  },
  'JWT')
  .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(5000,()=>{
    console.log('server is running on PORT ', constants.PORT)
  });
}
bootstrap();
