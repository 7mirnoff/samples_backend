import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Server, Socket } from 'socket.io'
import { IUser, User } from './user'

@WebSocketGateway({
  path: '/cubes-room',
  cors: {
    origin: 'http://localhost:5173',
  },
})
export class CubesRoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private readonly logger: Logger = new Logger('RoomGateway')

  private readonly users = new Map<string, IUser>()

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.logger.log(`msgToServer: ${payload}`)
    this.server.emit('msgToClient', payload)
  }

  @SubscribeMessage('positionToServer')
  handlePosition(client: Socket, payload: [number, number, number]): void {
    const user = this.users.get(client.id)
    if (user) {
      user.setPosition(payload)
      this.server.emit('positionToClient', { clientId: client.id, position: user.getPosition() })
    }
  }

  @SubscribeMessage('nameToServer')
  handleName(client: Socket, payload: string): void {
    const user = this.users.get(client.id)
    if (user) {
      user.setName(payload)
    }
  }

  afterInit(server: Server) {
    this.logger.log('Init')
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
    this.users.delete(client.id)
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`)
    this.users.set(client.id, new User(client.id, client.id, [0, 0, 0]))

    for (const user of this.users) {
      this.server.emit('positionToClient', { clientId: user[1].getId(), position: user[1].getPosition() })
    }
  }
}
