interface IRoom {
  id: string
  players: any[]
  objects: any[]
}

export class Room implements IRoom {
  objects: any[] = []
  players: any[] = []

  constructor(private readonly id: string) {
    this.id = '42' // TODO: добавить генерацию
  }
}
