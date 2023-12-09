import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test, TestDocument } from './entities/test.entites';

export class TestService {
  constructor(@InjectModel(Test.name) private Test: Model<TestDocument>) {}

  createTest(data: any) {
    return this.Test.create(data);
  }
}
