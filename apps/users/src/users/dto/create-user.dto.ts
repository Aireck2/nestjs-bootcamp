import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  name: string;

  @IsEmail()
  @MaxLength(30)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @IsString()
  @MaxLength(15)
  role: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
