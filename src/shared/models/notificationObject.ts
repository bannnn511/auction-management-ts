import { Notifications } from '../../database/models/notifications';

export class NotificationObject extends Notifications {
  constructor(userId: string, createdAt: string, description: string) {
    super();
    this.userId = userId;
    this.createdAt = createdAt;
    this.description = description;
  }
}
