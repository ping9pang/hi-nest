import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { after } from 'node:test';
import { title } from 'process';

describe('MoviesService', () => {    //테스트를 묘사한다
  let service: MoviesService;

  beforeEach(async () => {     //테스트를 하기 전에 실행
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {    //이부분도 테스트 하는 부분이다.
    expect(service).toBeDefined();
  });

  describe("getAll()", () => {   //배열을 리턴하는지 테스트하는 부분이다.
    it("should return an array", () => {
      const result = service.getAll();       //getAll을 호출하고, 배열을 리턴 하는지 안하는지 테스트.
      expect(result).toBeInstanceOf(Array)
    });
  });

  describe("getOne", () => {
    it("should return a movie ", () => {
      service.create({
        title: "Test Moive",
        genres: ["test"],
        year: 2000,
      });
      const moive = service.getOne(1);
      expect(moive).toBeDefined();
      expect(moive.id).toEqual(1);
    });
    it("should throw 404 error", () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with Id: 999 not found')
      }
    })
  });

  describe("deleteOne", () => {     //두가지 옵션이 있는데  제대로 작동해서 movie하나를 지우는 것이고 , 하나는 movie하나를 지우려는데 지우는 movie를 못찾는거다.
    it("deletes a movie", () => {      //movie를 생성하고
      service.create({
        title: "Test Moive",
        genres: ["test"],
        year: 2000,
      });
      const beforeDelete = service.getAll().length; //allmovies에 getall().length의 값을 저장
      service.deleteOne(1);  //1개를 지우고나서
      const afterDelete = service.getAll().length; //몇개의 movie가 남았는지세는것
      expect(afterDelete).toBeLessThan(beforeDelete); //afterdeleted의 갯수가 beforeDelete보다 적을것이라고 예상
    });
    it("should return a 404", () => {
      try {
        service.deleteOne(999);     //id로 deleteOne을 사용할수 있고, 이상한 id로 deleteOne을 하면 404를 리턴한다.
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it("should create a movie", () => {   //movie의 갯수가 몇개나 늘었는가 테스트
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Moive',
        genres: ['test'],
        year: 2000
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", () => {
    it("should update a movie", () =>{
      service.create({
        title: 'Test Moive',
        genres: ['test'],
        year: 2000
      });

      service.update(1,{title: 'update Test'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('update Test');
    });
      it("should throw  a NotFoundException", () => {
        try {
          service.update(999,{});
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
        }
      });
    });


  // it("should be 4", () =>{
  //   expect(2+2).toEqual(4);   //2+2가  4와 같기(equal)를 기대(expect)한다.  틀리면 sudo npm rum test:watch을 했을 때 오류가 뜬다
  // })  //?
})

