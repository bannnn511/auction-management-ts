import _ from 'lodash';
import { AuctionManagements } from '../../database/models/auctionManagements';
import { Products } from '../../database/models';
import { toDateString, safeParseFloat } from '../../shared/helpers';

// TODO: REFRACTOR ALL
export function serializeAuctionAndProduct(
  product: Products,
  auction: AuctionManagements,
) {
  if (product && auction) {
    const fullAuctionDetail = {
      auctionId: _.get(auction, 'id', ''),
      sellerId: _.get(auction, 'sellerId', ''),
      productId: _.get(auction, 'productId', ''),
      productName: _.get(product, 'productName', ''),
      imgURL: _.get(product, 'imgURL', ''),
      description: _.get(auction, 'description', ''),
      currentPrice: _.get(product, 'currentPrice', 0),
      buyNowPrice: _.get(product, 'buyNowPrice', 1),
      endAt: _.get(auction, 'endAt', _.now()),
    };
    return fullAuctionDetail;
  }
  return null;
}

export function serializeFullAuctionJoinProduct(data: any) {
  if (data) {
    const fullAuctionDetail = {
      id: _.get(data, 'id', ''),
      buyerId: _.get(data, 'buyerId', ''),
      sellerId: _.get(data, 'sellerId', ''),
      productId: _.get(data, 'productId', ''),
      productName: _.get(data, 'products.productName', ''),
      imgURL: _.get(data, 'products.imgURL', ''),
      description: _.get(data, 'description', ''),
      currentPrice: safeParseFloat(_.get(data, 'products.currentPrice', 0), 0),
      buyNowPrice: safeParseFloat(_.get(data, 'products.buyNowPrice', 1), 0),
      endAt: toDateString(_.get(data, 'endAt', _.now())),
    };
    return fullAuctionDetail;
  }
  return null;
}

export function serializeAnAuction(auction: AuctionManagements) {
  if (auction) {
    const newAuction = {
      id: _.get(auction, 'id', ''),
      buyerId: _.get(auction, 'buyerId', ''),
      sellerId: _.get(auction, 'sellerId', ''),
      productId: _.get(auction, 'productId', ''),
      endAt: _.get(auction, 'endAt', _.now()),
    };
    return newAuction;
  }
  return null;
}

export function serializeAllAuctions(auctions: AuctionManagements[]) {
  if (auctions) {
    const newAuctions: any = [];
    auctions.forEach((auction: any) => {
      newAuctions.push(serializeFullAuctionJoinProduct(auction));
    });
    return newAuctions;
  }
  return null;
}

export function serializeAuction(
  auction: AuctionManagements | AuctionManagements[],
) {
  if (_.isArray(auction)) {
    return serializeAllAuctions(auction);
  }
  return serializeAnAuction(auction);
}

export function serializeBuyerInAuction(auction: AuctionManagements) {
  if (auction) {
    return {
      userId: _.get(auction, 'user_id', ''),
      email: _.get(auction, 'email', ''),
      fullname: _.get(auction, 'fullname', ''),
      price: _.get(auction, 'price', ''),
      auctionId: _.get(auction, 'auction_id', ''),
    };
  }
  return null;
}

export function serializeAllBuyerInAuction(auctions: any) {
  if (auctions) {
    const buyers: any = [];
    auctions.forEach((auction: any) => {
      buyers.push(serializeBuyerInAuction(auction));
    });
    return buyers;
  }
  return null;
}

export function serializeAuctionFromRawQuery(auctions: any) {
  if (auctions) {
    const data: any = [];
    auctions.forEach((auction: any) => {
      data.push({
        productId: _.get(auction, 'product_id', ''),
        count: _.get(auction, 'count', 0),
        productName: _.get(auction, 'product_name', ''),
        imgUrl: _.get(auction, 'img_url', ''),
        currentPrice: _.get(auction, 'current_price', 0),
        buyNowPrice: _.get(auction, 'buy_now_price', 0),
        endAt: _.get(auction, 'end_at', ''),
      });
    });
    return data;
  }
  return null;
}
