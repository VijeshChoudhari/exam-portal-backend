
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./entities/user.entities";


export class UserService {
    constructor(@InjectModel(User.name) private User: Model<UserDocument>){}

    // create user service

    create(body:any){
        return this.User.create(body)
    }

    // find user by id service

    findById(id:Types.ObjectId){
        return this.User.findById(id)
    }

    // findBy {filter}

    find(search:string,skip:number,limit:number){
        return this.User.aggregate([
           {
            $facet:{
                user: [
                    {
                        $match: {
                            $or : [
                                {
                                    name : {
                                        $regex : new RegExp(search,'i')
                                    }
                                },
                                {
                                    email : {
                                        $regex : new RegExp(search,'i')
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $sort : { updatedAt : -1}
                    },
                    {
                        $skip : skip
                    },
                    {
                        $limit : limit
                    }
                ],
                count : [
                    {
                        $match: {
                            $or : [
                                {
                                    name : {
                                        $regex : new RegExp(search,'i')
                                    }
                                },
                                {
                                    email : {
                                        $regex : new RegExp(search,'i')
                                    }
                                }
                            ]
                        } 
                    },
                    {$count : 'totalCount'}
                ]
            }
           }
        ])
    }
}