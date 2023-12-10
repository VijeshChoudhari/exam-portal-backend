import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entities';
import * as nodemailer from 'nodemailer';

import * as bcrypt from 'bcrypt';
import { decode, sign, verify } from 'jsonwebtoken';
import constants from 'src/constant';
import { first } from 'rxjs';

console.log('nodemailer', nodemailer);

const saltOrRounds = 10;

const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail', 'hotmail', etc.
  auth: {
    user: constants.TRANSPORTER_EMAIL,
    pass: constants.TRANSPORTER_PASSWORD,
  },
});

export class UserService {
  constructor(@InjectModel(User.name) private User: Model<UserDocument>) {}

  // create user service

  async signup(body: any) {
    const password = body.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    body.password = hash;
    const resp = await this.User.create({
      ...body,
      emailIsAuthenticated: false,
    });

    if (resp) {
      this.authenticateEmail(resp);
    }
    return resp;
  }

  authenticateEmail(body: any) {
    const token = sign(
      {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
      },
      constants.SECRET_KEY,
      { expiresIn: '1d' },
    );

    const mailOptions = {
      from: constants.TRANSPORTER_EMAIL,
      to: body.email,
      subject: 'Email Verification',
      text: `Click this link to verify your email: http://localhost:3000/verifyEmail/${token}`,
    };

    console.log('mailOptions', mailOptions);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        throw new Error('Error sending verification email');
      } else {
        body.emailIsAuthenticated = true;
      }
    });
  }

  async verifyAndUpdateEmail(token: any) {
    try {
      const tokenData: any = verify(token, constants.SECRET_KEY);
      console.log('verified token is this ', tokenData);

      const user = await this.User.findOne({
        email: tokenData.email,
      });

      if (user) {
        user.emailIsAuthenticated = true;
        user.save();
      } else {
        console.log('user not found in service layer');
      }
      return user;
    } catch (err) {
      throw new Error('Invalid token');
    }
  }

  findById(id: Types.ObjectId) {
    return this.User.findById(id);
  }

  // findBy {filter}

  find(search: string, skip: number, limit: number) {
    return this.User.aggregate([
      {
        $facet: {
          user: [
            {
              $match: {
                $or: [
                  {
                    name: {
                      $regex: new RegExp(search, 'i'),
                    },
                  },
                  {
                    email: {
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
                  {
                    email: {
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

  async login(body: any) {
    const { email, password } = body;
    const resp = await this.User.findOne({ email }).lean();

    if (resp) {
      const isMatch = await bcrypt.compare(password, resp.password);
      delete resp.password;

      if (isMatch) {
        const token = sign(
          {
            id: resp._id,
          },
          constants.SECRET_KEY,
          { expiresIn: '1d' },
        );
        return {
          user: resp,
          token: token,
        };
      } else {
        throw new Error('Incorrect username or password');
      }
    } else {
      throw new Error('Incorrect username or password');
    }
  }
}
