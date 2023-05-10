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
import { Room } from './room'

@WebSocketGateway({
  path: '/physic-room',
  cors: {
    origin: 'http://localhost:5173',
  },
})
export class PhysicRoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private readonly logger: Logger = new Logger('PhysicRoomGateway')

  private readonly room = new Room()

  // private readonly users = new Map<string, IUser>()

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.logger.log(`msgToServer: ${payload}`)
    this.server.emit('msgToClient', payload)
  }

  afterInit(server: Server) {
    this.logger.log('Init PhysicRoomGateway')

    setInterval(() => {
      this.room.updateWorld()
      const state = this.room.getState()
      this.server.emit('stateToClient', state)
    }, 1000 / 30) // частота обновления физики на сервере
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
    // this.users.delete(client.id)
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`)
    // this.users.set(client.id, new User(client.id, client.id, [0, 0, 0]))
    //
    // for (const user of this.users) {
    //   this.server.emit('positionToClient', { clientId: user[1].getId(), position: user[1].getPosition() })
    // }
  }
}
