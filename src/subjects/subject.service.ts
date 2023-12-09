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
                      $regex: new RegExp(search, 'i'),
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
    return this.Subject.findByIdAndUpdate(
      subjectId,
      { $push: { questions: data } },
      { new: true },
    );
  }
}
