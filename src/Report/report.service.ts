import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Report, ReportDocument } from './entities/report.entities';
import { Subject, SubjectDocument } from 'src/subjects/entites/subject.entites';
import { User, UserDocument } from 'src/user/entities/user.entities';

// import {sign} from "jsonwebtoken"
// import constants from "src/constant";

// here user authentication is required for checking out the scores

export class ReportService {
  constructor(
    @InjectModel(Report.name) private Report: Model<ReportDocument>,
    @InjectModel(Subject.name) private Subject: Model<SubjectDocument>,
    @InjectModel(User.name) private User: Model<UserDocument>,
  ) {}

  async create(body: any) {
    // expected body fields:

    // {
    //     "testId" : "6574b420c6cae033e0176eb1",
    //     "userId" : "657477e8408de61e8b719e6b"
    //     "subjectId" : "65744df83bd2f549e90daee4",
    //     "userResponse"= [{questionNo:2,answer:"Use of pointers"}]

    // }

    const testId = body.testId;
    const userId = body.userId;
    const subjectId = body.subjectId;
    const testRequestId = body.testRequestId;
    const userResponse = body.userResponse; // user response array
    const userResponseCount = userResponse.length;

    const subjectData = await this.Subject.findOne({
      _id: new Types.ObjectId(subjectId),
    });

    const userData = await this.User.findOne({
      _id: new Types.ObjectId(userId),
    });

    const userFirstName = userData.firstName;
    const userLastName = userData.lastName;

    const subjectName = subjectData.name;
    const questionBank = subjectData.questions;
    const totalQuestionsCount = userResponse.length;

    let correctAnsCount = 0,
      wrongAnsCount = 0;

    for (let i = 0; i < userResponseCount; i++) {
      console.log('q', questionBank[userResponse[i].questionNo - 1].answer);
      console.log('a', userResponse[i].responseAns);
      if (
        questionBank[userResponse[i].questionNo - 1].answer ===
        userResponse[i].responseAns
      ) {
        correctAnsCount++;
      }
    }

    wrongAnsCount = totalQuestionsCount - correctAnsCount;

    const percentage = (correctAnsCount / totalQuestionsCount) * 100;
    const status = percentage > 70.0 ? 'passed' : 'failed';

    const reportData = {
      userId: userId,
      userName: userFirstName + ' ' + userLastName,
      subjectId: subjectId,
      subjectName: subjectName,
      testRequestId: testRequestId,
      correctAnsCount: correctAnsCount,
      wrongAnsCount: wrongAnsCount,
      percentage:
        ((correctAnsCount / totalQuestionsCount) * 100).toFixed(0).toString() +
        '%',

      resultStatus: status,
    };

    return this.Report.create(reportData);
  }
}
