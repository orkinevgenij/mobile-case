'use server';
import { prisma } from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { RegisterSchema, RegisterSchemaType } from './../schemas/RegisterSchema';
export const register = async (data: RegisterSchemaType) => {
  try {
    const validatedData = RegisterSchema.parse(data);

    if (!validatedData) {
      return {
        error: 'Invalid input data',
      };
    }
    const { email, name, password, passwordConfirmation } = validatedData;
    if (password !== passwordConfirmation) {
      return {
        error: 'Passwords do not match!',
      };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (userExists) {
      return {
        error: 'User already exists',
      };
    }
    const lowerCaseEmail = email.toLowerCase();

    await prisma.user.create({
      data: {
        email: lowerCaseEmail,
        password: hashedPassword,
        name,
      },
    });
    return {
      success: 'User created successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'An error occurred',
    };
  }
};
