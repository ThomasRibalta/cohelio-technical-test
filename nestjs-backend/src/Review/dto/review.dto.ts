import {
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsIn,
  Min,
  Max,
} from 'class-validator';

export class ReviewDto {
  @IsIn(['Technical Support', 'Billing and Payments', 'Product Inquiries'])
  type: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(500)
  content: string;

  @IsNotEmpty()
  @Min(0)
  @Max(5)
  rate: number;
}
