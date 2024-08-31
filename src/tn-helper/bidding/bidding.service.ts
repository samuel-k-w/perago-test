import { Injectable } from '@nestjs/common';
import { CreateBiddingDto } from './dto/create-bidding.dto';
import { UpdateBiddingDto } from './dto/update-bidding.dto';

@Injectable()
export class BiddingService {
  create(createBiddingDto: CreateBiddingDto) {
    return 'This action adds a new bidding';
  }

  findAll() {
    return `This action returns all bidding`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bidding`;
  }

  update(id: number, updateBiddingDto: UpdateBiddingDto) {
    return `This action updates a #${id} bidding`;
  }

  remove(id: number) {
    return `This action removes a #${id} bidding`;
  }
}
