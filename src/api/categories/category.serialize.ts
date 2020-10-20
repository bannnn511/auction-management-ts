import _ from 'lodash';

export function serializeCategory(category: any) {
  if (category) {
    const data = {
      id: _.get(category, 'id', ''),
      categoryName: _.get(category, 'categoryName', ''),
      createdBy: _.get(category, 'createdBy', ''),
      updatedBy: _.get(category, 'updatedBy', ''),
    };
    return data;
  }
  return null;
}

export function serializeAllCategories(categories: any) {
  if (categories) {
    const data: any = [];
    categories.forEach((category: any) => {
      data.push(serializeCategory(category));
    });
    return data;
  }
  return null;
}
