import { Transform } from 'class-transformer';
import { IsEmpty, IsNumber, IsOptional } from 'class-validator';

export abstract class Base {
   @Transform((v) => {
      return parseInt(v.obj.createdBy);
   })
   @IsNumber()
   @IsOptional()
   createdBy?: number;

   @Transform((v) => {
      return parseInt(v.obj.lastChangedBy);
   })
   @IsNumber()
   @IsOptional()
   lastChangedBy?: number;
}
