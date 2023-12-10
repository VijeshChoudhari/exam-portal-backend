import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { verify } from 'jsonwebtoken';
import { Types } from 'mongoose';
import constants from 'src/constant';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { authorization }: any = request.headers;

    if (!authorization) {
      throw new UnauthorizedException('Please provide token');
    }

    const token = authorization.replace(/bearer/gim, '').trim();
    const decodedToken: any = this.validateToken(token);
    if (decodedToken?.payload?.id) {
      request.payload = {
        _id: new Types.ObjectId(decodedToken.payload.id),
      };
    }
    return true;
  }

  validateToken(token: string) {
    try {
      return verify(token, constants.SECRET_KEY, { complete: true });
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
