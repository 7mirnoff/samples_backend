export interface IUser {
  setName: (name: string) => boolean
  getName: () => string
  getPosition: () => [number, number, number]
  setPosition: (position: [number, number, number]) => boolean
  getId: () => string
}

export class User implements IUser {
  constructor(private readonly id: string, private name: string, private position: [number, number, number]) {
    this.id = id
    this.name = id
    this.position = position
  }

  getPosition(): [number, number, number] {
    return this.position
  }

  setName(name: string): boolean {
    this.name = name
    return true
  }

  getName(): string {
    return this.name
  }

  getId(): string {
    return this.id
  }

  setPosition(position: [number, number, number]): boolean {
    this.position = position
    return true
  }
}
