import { AuctionManagements } from '../../database/models/auctionManagements';

export class AuctionManagementsObject extends AuctionManagements {
  constructor(
    sellerId: string,
    productId: string,
    description: string,
    createdBy: string,
    updatedBy: string,
    endAt: Date,
  ) {
    super();
    this.sellerId = sellerId;
    this.productId = productId;
    this.description = description;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.endAt = endAt;
  }
}
