import { InjectModel } from '@nestjs/mongoose';
import {
  TestRequest,
  TestRequestDocument,
} from './entities/testRequest.entites';
import { Model, Types } from 'mongoose';

export class TestRequestService {
  constructor(
    @InjectModel(TestRequest.name)
    private TestRequest: Model<TestRequestDocument>,
  ) {}

  createNewRequest(subjectId: Types.ObjectId, userId: Types.ObjectId) {
    return this.TestRequest.create({
      subjectId,
      userId,
      approvalPending: true,
      approvalStatus: false,
    });
  }

  updateRequest(testRequestId: Types.ObjectId, data: any) {
    return this.TestRequest.findByIdAndUpdate(testRequestId, data, {
      new: true,
    });
  }
}
