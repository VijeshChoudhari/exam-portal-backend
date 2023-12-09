
import { Admin, AdminDocument } from "./entities/admin.entites";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

export class AdminService {
    constructor(@InjectModel(Admin.name) private Admin: Model<AdminDocument>){}

    create(body:any){
        return this.Admin.create(body)
    }
}