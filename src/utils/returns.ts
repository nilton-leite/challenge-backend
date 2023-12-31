import { User } from "@prisma/client";

export interface Return {
   statusCode: number;
   message: string;
   error: string;
}

export interface ReturnSuccess {
   statusCode: number;
   message: string;
   response?: unknown;
}

export interface ReturnToken {
   access_token: string;
   user: User;
}
