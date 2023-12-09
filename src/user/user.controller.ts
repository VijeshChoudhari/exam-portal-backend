
import { Body, Controller, Get, Param, Post } from "@nestjs/common/decorators";
import { ApiTags } from "@nestjs/swagger/dist";
import { Types } from "mongoose";
import { UserService } from "src/user/user.service";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService : UserService,
    ){}

    // create user controller 

    @Post('create')
    async signup(@Body() body : any){
        try {
            const resp = await this.userService.create(body);
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

    @Get(':id')
    async getUserById(@Param("id") id : string){
        try {
            const resp = await this.userService.findById(new Types.ObjectId(id));
            return {
                data : resp,
                code : 200,
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

    @Post("search")
    async getUser(@Body() body: any){
        try {
            const skip = (body.currentPage - 1) * body.limit;
            const resp = await this.userService.find(body.search,skip,body.limit)
            return {
                data : resp,
                code : 200,
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