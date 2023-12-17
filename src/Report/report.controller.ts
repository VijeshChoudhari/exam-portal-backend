import { Body, Controller, Post } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger/dist';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/report.dto';

@ApiTags('report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('create')
  async signup(@Body() body: CreateReportDto) {
    try {
      console.log('body is this ', body);
      const resp = await this.reportService.create(body);
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
}
