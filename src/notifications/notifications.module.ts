import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Notification } from "./models/notifications.model";

@Module({
    imports: [SequelizeModule.forFeature([Notification])],
    providers: [],
    exports: []
})

export class NotificationModule {}