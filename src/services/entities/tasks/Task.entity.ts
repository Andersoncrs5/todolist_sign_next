import User from "../user/User.entity";

export default interface TaskEntity {
    id: number
    title: string
    description: string
    done: boolean
    user?: User;
    version: number;
    createdAt: Date    
    updatedAt: Date
}