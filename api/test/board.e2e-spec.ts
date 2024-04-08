import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Board } from '../src/board/entities/board.entity';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { boardStub } from './stubs/Board.stub';

describe('BoardController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Board>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    repository = moduleFixture.get<Repository<Board>>('BoardRepository');
  });

  afterAll(() => app.close());

  beforeEach(async () => repository.delete({}));

  describe('/boards (GET)', () => {
    it('should return array of boards', async () => {
      await repository.save(boardStub());
      const response = await request(app.getHttpServer()).get('/boards/');

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject([boardStub()]);
    });
  });

  describe('/boards (POST)', () => {
    it('should return created board', async () => {
      const response = await request(app.getHttpServer())
        .post('/boards/')
        .send(boardStub());

      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(boardStub());
    });
    it('should return Bad Request error with message that name is not unique', async () => {
      await repository.save(boardStub());
      const response = await request(app.getHttpServer())
        .post('/boards/')
        .send(boardStub());

      expect(response.status).toEqual(400);
      expect(response.body).toMatchObject({
        message: `Board with name ${boardStub().name} already exists`,
      });
    });
  });

  describe('/boards/:id (GET)', () => {
    it('should return board by id', async () => {
      const id = (await repository.save(boardStub())).id;
      const response = await request(app.getHttpServer()).get(`/boards/${id}`);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(boardStub());
    });
  });

  describe('/boards/:id (PATCH)', () => {
    it('should return updated board', async () => {
      const id = (await repository.save(boardStub())).id;

      const delta = { name: 'new name' };
      const response = await request(app.getHttpServer())
        .patch(`/boards/${id}`)
        .send(delta);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(delta);
    });
  });

  describe('/boards/:id (DELETE)', () => {
    it('should delete board', async () => {
      const id = (await repository.save(boardStub())).id;
      const response = await request(app.getHttpServer()).delete(
        `/boards/${id}`,
      );

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({
        message: `Board with id ${id} was deleted successfully`,
      });

      const check = await request(app.getHttpServer()).get(`/boards/${id}`);

      expect(check.status).toEqual(404);
    });
  });
});
