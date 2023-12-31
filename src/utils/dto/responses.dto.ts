import { ReturnSuccess } from '../../utils/returns';
export class SuccessTokenResponse {
  
   access_token: string;
}
export class UnauthorizedResponse {
  
   statusCode: number;

   
   message: string;

  
   error: string;
}

export class SuccessResponseCreated {
  
   status: string;

   
   message: string;

  
   response: ReturnSuccess;
}

export class SuccessResponseGetAll {
   
   statusCode: number;

  
   message: string;

  
   response: ReturnSuccess[];
}

export class SuccessResponseGetOne {
  
   statusCode: number;

  
   message: string;

  
   response: ReturnSuccess;
}

export class ErrorResponseFields {
  
   statusCode: number;

  
   message: string;

   
   error: string;
}

export class ErrorResponse {
  
   statusCode: number;

   
   message: string;

   
   error: string;
}
