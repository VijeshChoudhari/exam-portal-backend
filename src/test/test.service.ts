import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Test, TestDocument } from './entities/test.entites';
import { verify } from 'jsonwebtoken';
import constants from 'src/constant';

export class TestService {
  constructor(@InjectModel(Test.name) private Test: Model<TestDocument>) {}

  createTest(data: any) {
    return this.Test.create(data);
  }
  getTestsOfSubject(subjectId: Types.ObjectId) {
    return this.Test.find({ subjectId: subjectId });
  }

  getTestDetailByTestId(testId: Types.ObjectId) {
    return this.Test.aggregate([
      {
        $match: {
          _id: testId,
        },
      },
      {
        $lookup: {
          from: 'subjects',
          localField: 'subjectId',
          foreignField: '_id',
          as: 'subject',
        },
      },
      {
        $unwind: '$subject',
      },
    ]);
  }
}
