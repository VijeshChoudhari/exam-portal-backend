import { InjectModel } from '@nestjs/mongoose';
import { Subject, SubjectDocument } from './entites/subject.entites';
import { Model, Types } from 'mongoose';

export class SubjectService {
  constructor(
    @InjectModel(Subject.name) private Subject: Model<SubjectDocument>,
  ) {}

  create(name: string) {
    return this.Subject.create({ name, NoOfTest: 0, questions: [] });
  }

  getAllSubject(search: string, skip: number, limit: number) {
    return this.Subject.aggregate([
      {
        $facet: {
          subject: [
            {
              $match: {
                $or: [
                  {
                    name: {
                      $regex: new RegExp(search, 'i'),
                    },
                  },
                ],
              },
            },
            {
              $lookup: {
                from: 'tests',
                localField: '_id',
                foreignField: 'subjectId',
                as: 'result',
              },
            },
            {
              $addFields: {
                testCount: { $size: '$result' },
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
                testCount: 1,
              },
            },
            {
              $sort: { updatedAt: -1 },
            },
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ],
          count: [
            {
              $match: {
                $or: [
                  {
                    name: {
                      $regex: new RegExp('', 'i'),
                    },
                  },
                ],
              },
            },
            { $count: 'totalCount' },
          ],
        },
      },
    ]);
  }

  async addQuestion(subjectId: Types.ObjectId, data: any[]) {
    const resp = await this.Subject.findById(subjectId);
    const questions = [...resp?.questions, ...data];
    return this.Subject.findByIdAndUpdate(
      subjectId,
      { questions: questions },
      { new: true },
    );
  }
}
