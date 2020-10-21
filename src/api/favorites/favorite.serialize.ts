import _ from 'lodash';

export function serializeFavorite(product: any) {
  if (product) {
    return {
      userId: _.get(product, 'userId', ''),
      productId: _.get(product, 'productId', ''),
      categoryId: _.get(product, 'categoryId', ''),
      productName: _.get(product, 'product.productName', ''),
      categoryName: _.get(product, 'category.categoryName', ''),
    };
  }
  return null;
}

export function serializeAllFavorite(products: any) {
  if (products) {
    const data: any = [];
    products.forEach((product: any) => {
      data.push(serializeFavorite(product));
    });
    return data;
  }
  return null;
}
