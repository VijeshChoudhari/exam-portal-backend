
import { Admin, AdminDocument } from "./entities/admin.entites";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt'
import {sign} from "jsonwebtoken"
import constants from "src/constant";
export class AdminService {
    constructor(@InjectModel(Admin.name) private Admin: Model<AdminDocument>){}

    create(body:any){
        body.password = bcrypt.hash(body.password,10);
        return this.Admin.create(body)
    }

    findOne(filter:any){
        return this.Admin.findOne(filter);
    }

    async login(body: any){
        const {email,password} = body;
        const resp = await this.Admin.findOne({email}).lean();
        
        if(resp){
            const isMatch = await bcrypt.compare(password,resp.password)
            delete resp.password;

            if(isMatch){
                const token = sign({
                    id : resp._id
                },constants.SECRET_KEY,{expiresIn:'1d'});
                return {
                    user:resp,
                    token : token,
                }
            }
            else {
                throw new Error("Incorrect username or password")
            }
        }else {
            throw new Error("Incorrect username or password")
        }
    }
}