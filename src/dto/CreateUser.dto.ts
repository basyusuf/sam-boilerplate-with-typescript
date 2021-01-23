import { IsString, IsNotEmpty, IsDefined, ValidateNested, IsObject, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';
//ValidateNested ve Type ile belirttiğimiz her yerde reflect-metadata import edilmelidir.
import 'reflect-metadata';

class BasicUserInfo {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    surname: string;

    @IsNumberString()
    @IsNotEmpty()
    age: number;
}
export class CreateUserDTO {
    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => BasicUserInfo)
    information: BasicUserInfo;

    @IsString()
    @IsDefined()
    value:string;
}
