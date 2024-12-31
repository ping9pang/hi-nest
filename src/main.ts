import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true, //사용하면 외부에서 방해 하는것이 validator까지 도달하지 못하게한다.
      forbidNonWhitelisted: true, //누군가 "hacked":"hack"을 보내면 존재하면 안되는 요소라고 뜨게한다.
      transform : true   //유저들이 보낸 것을 우리가 원하는 실제 타입으로 변환해줌 /true로 해놨기 때문에 리퀘스트 할때마다 실제타입으로 변환된다./  안쓰면 디폴트 값이 나온다.
    }));  //유효성 검사용 파이프 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
