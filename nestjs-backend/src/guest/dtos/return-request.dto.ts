import { Type } from 'class-transformer';
import { IsPositive, IsString, ValidateNested } from 'class-validator';

export class ReturnRequest {
    @IsString()
    productId: string;

    @IsPositive()
    quantity: number;

    @IsString()
    orderId: string;
}
