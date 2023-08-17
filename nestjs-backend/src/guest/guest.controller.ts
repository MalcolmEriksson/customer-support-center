import { Body, Controller, Headers, HttpException, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { GuestService } from './guest.service';
import { ReturnRequest } from './dtos/return-request.dto';
import { Case } from '@app/case-db';
import * as jwt from 'jsonwebtoken';

@Controller('guest')
export class GuestController {
    constructor(private readonly guestService: GuestService) {}

    @Post(['/return'])
    @UsePipes(new ValidationPipe({ transform: true }))
    async returnItem(
        @Body() returnRequest: ReturnRequest,
        @Headers('Authorization') authHeader?: string,
    ): Promise<Case> {
        if (!authHeader?.startsWith('Bearer ')) {
            throw new HttpException('No bearer token provided', 401);
        }
        const decodedJwt = jwt.decode(authHeader.slice('Bearer '.length)); // Ofc jwt.authorize(...) in real scenario
        if (!decodedJwt.partyUid) {
            throw new HttpException('Invalid auhtorization token', 401);
        }
        return await this.guestService.createCase(returnRequest, decodedJwt.partyUid);
    }
}
