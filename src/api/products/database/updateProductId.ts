import _ from 'lodash';
import { AuctionManagements, Products } from '../../../database/models';

/**
 * Query for updating product details.
 *
 * @export
 * @param {*} body
 * @param {Products} defaultProduct
 * @param {AuctionManagements} defaultAuction
 * @return {Promise<Products>}
 */
export async function updateProductDetail(
  body: any,
  defaultProduct: Products,
  defaultAuction: AuctionManagements,
) {
  await Products.update(
    {
      productName: _.defaultTo(body.productName, defaultProduct.productName),
      endAt: _.defaultTo(body.endAt, defaultAuction.endAt),
      updatedBy: _.defaultTo(body.updatedBy, defaultProduct.updatedBy),
      imgURL: _.defaultTo(body.imgURL, defaultProduct.imgURL),
    },
    {
      where: {
        id: body.productId,
      },
    },
  );

  await AuctionManagements.update(
    {
      description: _.defaultTo(body.description, defaultAuction.description),
      endAt: _.defaultTo(body.endAt, defaultAuction.endAt),
    },
    {
      where: {
        productId: body.productId,
      },
    },
  );

  return Products.findOne({
    where: {
      id: body.productId,
    },
  });
}
