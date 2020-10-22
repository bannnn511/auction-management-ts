import _ from 'lodash';
import { AuctionHistories } from '../../database/models/auctionHistories';

export class HistoryObject extends AuctionHistories {
  constructor(
    id: string,
    userId: string,
    auctionId: string,
    price: number,
    createdBy: string,
    updatedBy: string,
    created_at: Date,
    updated_at: Date,
  ) {
    super();
    this.id = _.defaultTo(id, '');
    this.userId = _.defaultTo(userId, '');
    this.auctionId = _.defaultTo(auctionId, '');
    this.price = _.defaultTo(price, 0);
    this.createdBy = _.defaultTo(createdBy, '');
    this.updatedBy = _.defaultTo(updatedBy, '');
    this.created_at = _.defaultTo(created_at, new Date(_.now()));
    this.updated_at = _.defaultTo(updated_at, new Date(_.now()));
  }
}
