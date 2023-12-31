import { ReturnSuccess } from './returns';

export async function get(statusCode: number, message: string, response?: unknown): Promise<ReturnSuccess> {
   return {
      statusCode,
      message,
      response: response !== null ? response : [],
   };
}
