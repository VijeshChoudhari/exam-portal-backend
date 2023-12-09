import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './entities/admin.entites';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
imports:[
    MongooseModule.forFeature([
        {name : Admin.name,schema : AdminSchema}
    ])
],
controllers : [AdminController],
providers: [AdminService]
})
export class AdminModule {}