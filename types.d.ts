enum NotificationType {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  PUSH = 'PUSH',
}

interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  phone?: string;
  location?: string;
  location_plan?: string;
  bio?: string;
  idCard_image_front?: string;
  idCard_image_back?: string;
  service_title?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
