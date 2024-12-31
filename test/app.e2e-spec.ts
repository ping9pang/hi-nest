//e2e는 movie와 관련된 애플리케이샨의 모든 부분을 테스트 할때 본다.

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes( //어플리케이션에선 아래 함수들이 실행되지만 테스팅 단계에서는 실행이 안되기 때문에 이것을 넣어줘야 한다.
      new ValidationPipe({
        whitelist: true, //사용하면 외부에서 방해 하는것이 validator까지 도달하지 못하게한다.
        forbidNonWhitelisted: true, //누군가 "hacked":"hack"을 보내면 존재하면 안되는 요소라고 뜨게한다.
        transform: true   //유저들이 보낸 것을 우리가 원하는 실제 타입으로 변환해줌 /true로 해놨기 때문에 리퀘스트 할때마다 실제타입으로 변환된다./  안쓰면 디폴트 값이 나온다.
      }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())     //API request를 보내는 부분, GET으로
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe("/movies", () => {
    it("GET", () => {
      return request(app.getHttpServer())
        .get("/movies")
        .expect(200)
        .expect([]);
    });
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201)
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
          other: "thing"
        })
        .expect(400)
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404)
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200);
    });

    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/999')
        .expect(404);
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: "updated Test" })
        .expect(200);
    })

    it('DELETE 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200);
    })

  })


  // it("/movies (GET)", () => { //moviecontroller에 있는 getAll()테스트
  //   return request(app.getHttpServer())
  //   .get("movies")
  //   .expect(200)
  //   .expect([]);
  // })
});
