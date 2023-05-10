import { Body, Box, Sphere, Vec3, World } from 'cannon-es'
import { generateId } from '../../utils/ganarate-id'

interface IRoomState {
  players: any[]
  objects: any[]
}

interface IRoom {
  getState: () => IRoomState
  updateWorld: () => void
}

export class Room implements IRoom {
  private readonly objects: any[] = []
  private readonly players: any[] = []
  private readonly id = generateId()
  private readonly world = new World()

  constructor() {
    this.world.gravity.set(0, -9.82, 0) // устанавливаем гравитацию в радианах

    const groundShape = new Box(new Vec3(20, 0.001, 20))
    const groundBody = new Body({ mass: 0, shape: groundShape }) // mass = 0, поскольку это неподвижный объект
    this.world.addBody(groundBody)

    setInterval(() => {
      // Добавляем объекты
      const sphere = new Sphere(1)
      const body = new Body({
        mass: 100,
        position: new Vec3(getRandomInt(1), 10, getRandomInt(1)),
        shape: sphere,
      })

      this.world.addBody(body)
      this.objects.push(body)
    }, 1000)
  }

  updateWorld(): void {
    for (const obj of this.objects) {
      if (obj.position.y <= -2) {
        this.world.removeBody(obj)
        const index = this.objects.indexOf(obj)
        this.objects.splice(index, 1)
      }
    }
    this.world.step(1 / 50)
  }

  getState(): IRoomState {
    const objects = this.objects.map((object) => ({
      id: object.id,
      position: object.position,
      quaternion: object.quaternion,
    }))

    return { objects, players: [] }
  }
}

function getRandomInt(max) {
  return Math.round(Math.random() * max)
}
