import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PhysicRoomGateway } from './websockets/phisic-room/physic-room.gateway'
import { ConfigModule } from '@nestjs/config'
import * as path from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'
import { CubesRoomGateway } from './websockets/cubes-room/cubes-room.gateway'

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
  providers: [AppService, CubesRoomGateway, PhysicRoomGateway],
})
export class AppModule {}
