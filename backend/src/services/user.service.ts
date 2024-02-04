import { RegisterInput, LoginInput } from "../models/auth.modal"
import bcrypt from 'bcrypt'
import { prisma } from "../../prisma/prismaClient"
import { User,  UserProfile } from "../models/user.modal"
import errorHandler from "../utils/errorHandler"

const createUser = async (register: RegisterInput): Promise<User | undefined> => {
  const password: string = register.password.trim()
  const username: string = register.username.trim()
  const role: string | undefined = register?.role

  if (!username) {
    throw ("username : can't be blank" );
  }

  if (!password) {
    throw ("password : can't be blank" );
  }
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        hashedPassword,
        role,
      }
    });
    return user
  }
  catch (e: any) {
    if (e.meta.target) {
      throw ({ name: 'ValidationError', message: `${e.meta.target} is not unique` });
    }

  }
}


const findUserByUsername = async (username: string): Promise<UserProfile> => {

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      id: true,
      role: true,
    },
  });

  if (!user) {
    throw ({ name: 'JsonWebTokenError' });
  }
  return user;
}


export default { createUser, findUserByUsername }
