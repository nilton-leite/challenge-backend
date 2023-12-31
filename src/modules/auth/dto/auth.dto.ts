import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';


export class AuthDto {
   // @Type(() => String)
   @IsString()
   @IsNotEmpty()
   username!: string;

   @IsNotEmpty()
   // @Type(() => String)
   password!: string;
}
