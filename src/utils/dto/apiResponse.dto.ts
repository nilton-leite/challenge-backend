import { HttpStatus } from '@nestjs/common';

export class ApiResponseDto<T = any> {
   constructor(public readonly statusCode: HttpStatus, public readonly message: string, public readonly data?: T) {}
}
