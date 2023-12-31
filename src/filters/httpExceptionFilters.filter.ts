import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponseDto } from 'src/utils/dto/apiResponse.dto';

/**
 * Trata todos os exceptions do sistema
 * importante para alterar o status code e colocar
 * tratamentos de acordo com as necessidades do módulo
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
   private readonly logger = new Logger('GlobalException');

   public catch(exception: HttpException | Error, host: ArgumentsHost) {
      let retorno: ApiResponseDto;
      if (exception instanceof HttpException) {
         const httpException = exception as HttpException;

         if (httpException.getResponse()) {
            retorno = httpException.getResponse() as ApiResponseDto; // Exceção pela aplicação
         } else {
            retorno = new ApiResponseDto(httpException.getStatus(), httpException.message); // Exceção pelo Nest
         }
      } else {
         const error = exception as Error;
         console.log(error.message);
         console.log(error.stack);
         retorno = new ApiResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, error.message); // Exceção pelo Node

         this.logger.error(error.message, error.stack);
      }

      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      response.status(retorno.statusCode).json(retorno);
   }
}
