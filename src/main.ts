import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    // https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe
    app.useGlobalPipes(new ValidationPipe())

    const PORT = process.env.PORT || 3000
    await app.listen(PORT)
}

function a(b: number) {}

bootstrap().catch((e) => console.error(e))
