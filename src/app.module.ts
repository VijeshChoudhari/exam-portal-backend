import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import constants from './constant';
import { SubjectModule } from './subjects/subject.module';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';
import { TestRequestModule } from './testRequest/testRequest.module';

@Module({
  imports: [
    MongooseModule.forRoot(constants.MONGO_URI),
    AdminModule,
    UserModule,
    SubjectModule,
    TestModule,
    TestRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
