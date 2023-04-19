import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RoomGateway } from './websockets/room/room.gateway'
import { ConfigModule } from '@nestjs/config'
import * as path from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
  imports: [
    ConfigModule.forRoot({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RoomGateway],
})
export class AppModule {}
