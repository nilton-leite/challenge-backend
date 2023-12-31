import { Status } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateOrdersDto {
    
    @IsString()
    @IsNotEmpty()
    @IsEnum(Status)
    status: Status;
 }