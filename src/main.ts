import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.enableCors()

  const config = new DocumentBuilder()

    .setTitle('Keyboard builder')
    .setDescription('Documentation api')
    .setVersion('0.0.1')

    .addTag('Keyboard')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  if (!PORT) return

  await app.listen(PORT, () => {
    console.log(`Server started on PORT = ${PORT}`)
  })
}

void bootstrap()
