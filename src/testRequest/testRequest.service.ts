import { InjectModel } from '@nestjs/mongoose';
import {
  TestRequest,
  TestRequestDocument,
} from './entities/testRequest.entites';
import { Model, Types } from 'mongoose';
import constants from 'src/constant';
import * as nodemailer from 'nodemailer';
import { sign } from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail', 'hotmail', etc.
  auth: {
    user: constants.TRANSPORTER_EMAIL,
    pass: constants.TRANSPORTER_PASSWORD,
  },
});
export class TestRequestService {
  constructor(
    @InjectModel(TestRequest.name)
    private TestRequest: Model<TestRequestDocument>,
  ) {}

  createNewRequest(userId: Types.ObjectId, subjectId: Types.ObjectId) {
    return this.TestRequest.create({
      subjectId,
      userId,
      approvalPending: true,
      approvalStatus: false,
      testNumber: 0,
    });
  }

  async isValidForTest(userId: Types.ObjectId, subjectId: Types.ObjectId) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    // const oneDay = await this.TestRequest.findOne({})
    const resp = await this.TestRequest.find({
      subjectId: { $eq: subjectId },
      userId: { $eq: userId },
      createdAt: { $gt: new Date(oneMonthAgo.toString()) },
    });
    if (resp.length > 2) {
      return false;
    } else {
      return true;
    }
  }

  updateRequest(testRequestId: Types.ObjectId, data: any) {
    return this.TestRequest.findByIdAndUpdate(testRequestId, data, {
      new: true,
    });
  }

  getTestByTestRequestId(testRequestId: Types.ObjectId) {
    return this.TestRequest.aggregate([
      {
        $match: {
          _id: testRequestId,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $lookup: {
          from: 'tests',
          localField: 'subjectId',
          foreignField: 'subjectId',
          as: 'tests',
        },
      },
    ]);
  }

  sendApprovedTestLink(body: any, testRequestId: string, subjectName: string) {
    const mailOptions = {
      from: constants.TRANSPORTER_EMAIL,
      to: body.email,
      subject: 'Test Link',
      text: `Click this link to view Test: http://localhost:3000/exam/${subjectName}/${testRequestId}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        throw new Error('Error sending email');
      }
    });
  }

  sendRejectedTestMail(body: any) {
    const mailOptions = {
      from: constants.TRANSPORTER_EMAIL,
      to: body.email,
      subject: 'Test Link',
      text: `Your test approval has been rejected`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        throw new Error('Error sending email');
      }
    });
  }

  async findOne(testRequestId: Types.ObjectId) {
    return await this.TestRequest.findOne({ _id: testRequestId }).lean();
  }

  async checkLinkValidation(testRequestId: Types.ObjectId) {
    const resp: any = await this.TestRequest.findOne({
      _id: testRequestId,
    }).lean();
    const durartion = 1800;
    const currentTime = new Date().getTime() / 1000;
    const remainingTime =
      new Date(resp.updatedAt).getTime() / 1000 - currentTime;
    if (remainingTime >= durartion) {
      return false;
    } else {
      return true;
    }
  }

  async startTest(testRequestId: Types.ObjectId) {
    const resp = await this.TestRequest.aggregate([
      {
        $match: {
          _id: testRequestId,
        },
      },
      {
        $lookup: {
          from: 'tests',
          let: { subjectId: '$subjectId', testNumber: '$testNumber' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$subjectId', '$$subjectId'] },
                    { $eq: ['$number', '$$testNumber'] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 1,
              },
            },
          ],
          as: 'test',
        },
      },
      {
        $unwind: '$test',
      },
    ]);
    const token = sign(
      { testRequestId: resp[0]._id, testId: resp[0].test._id },
      constants.SECRET_KEY,
      { expiresIn: '1hr' },
    );
    return token;
  }
}
