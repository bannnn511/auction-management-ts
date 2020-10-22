import _ from 'lodash';

export function serializeNotification(notification: any) {
  if (notification) {
    return {
      userId: _.get(notification, 'userId', ''),
      description: _.get(notification, 'description', ''),
    };
  }
  return null;
}

export function serializeAllNotifications(notifications: any) {
  if (notifications) {
    const data = [];
    notifications.forEach((notification: any) => {
      data.push(serializeNotification(notification));
    });
    return notifications;
  }
  return null;
}
