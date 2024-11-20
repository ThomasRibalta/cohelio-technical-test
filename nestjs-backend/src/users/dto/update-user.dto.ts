import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  IsIn,
  MaxLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['admin', 'user'])
  role: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  updatePassword: boolean;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
