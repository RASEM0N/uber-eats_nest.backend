import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    // https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(3000)
}

bootstrap().catch((e) => console.error(e))
