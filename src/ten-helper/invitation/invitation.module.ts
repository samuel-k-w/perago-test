import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [InvitationService],
  exports: [InvitationService],
})
export class InvitationModule {}
