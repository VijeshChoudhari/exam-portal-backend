import { AdminService } from "./admin.service";
import { Body, Controller, Post } from "@nestjs/common/decorators";
import { ApiTags } from "@nestjs/swagger/dist";

@ApiTags('admin')
@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService : AdminService,
    ){}

    @Post('create')
    async signup(@Body() body : any){
        try {
            const resp = await this.adminService.create(body);
            return {
                data : resp,
                code : 201,
                error : null,
                message : "success"
            }
        } catch (error) {
            return {
                data : null,
                code : 400,
                error : error,
                message : error.message || "something went wrong"
            }
        }
    }
}