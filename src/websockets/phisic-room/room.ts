import { generateId } from '../../utils/ganarate-id'

interface IRoom {
  getPlayers: () => any[]
  getObjects: () => any[]
  getRoomId: () => string
}

export class Room implements IRoom {
  private readonly objects: any[] = []
  private readonly players: any[] = []
  private readonly id = generateId()

  getObjects(): any[] {
    return []
  }

  getPlayers(): any[] {
    return []
  }

  getRoomId(): string {
    return this.id
  }
}
