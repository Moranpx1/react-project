import { loginRegisterRequest } from "../../domain/models";
import { db } from "../commands/db";

export const getUser = async (user: loginRegisterRequest) => {
    return await db('users').where(user).select();
}

export const addUser = async (user: loginRegisterRequest) => {
    return await db('users').insert(user);
}