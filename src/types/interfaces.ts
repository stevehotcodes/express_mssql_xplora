import { Request } from "express";

export interface IdecodedData{
    id: string;
    fullName: string;
    email: string;
    role: 'user' | 'admin'
}

export interface IExtendedUserRequest extends Request{
    info?:IdecodedData
}

