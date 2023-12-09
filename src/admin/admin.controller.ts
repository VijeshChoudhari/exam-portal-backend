import { AdminService } from './admin.service';
import { Body, Controller, Post } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger/dist';
import { LoginAdminDto, SignupAdminDto } from './dto/admin.dto';
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  async signup(@Body() body: SignupAdminDto) {
    try {
      const resp = await this.adminService.create(body);
      return {
        data: resp,
        code: 201,
        error: null,
        message: 'success',
      };
    } catch (error) {
      console.log(error.message);
      return {
        data: null,
        code: 400,
        error: error,
        message: error.message || 'something went wrong',
      };
    }
  }

  @Post('login')
  async login(@Body() body: LoginAdminDto) {
    try {
      const resp = await this.adminService.login(body);
      return {
        data: resp,
        code: 200,
        error: null,
        message: 'success',
      };
    } catch (error) {
      return {
        data: null,
        code: 400,
        error: error,
        message: error.message || 'something went wrong',
      };
    }
  }
}
