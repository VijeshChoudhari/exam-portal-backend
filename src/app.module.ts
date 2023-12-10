import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import constants from './constant';
import { SubjectModule } from './subjects/subject.module';
import { UserModule } from './user/user.module';
import { ReportModule } from './Report/report.module';

@Module({
  imports: [
    MongooseModule.forRoot(constants.MONGO_URI),
    AdminModule,
    UserModule,
    SubjectModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
