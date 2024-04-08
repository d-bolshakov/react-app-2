import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Board } from '../src/board/entities/board.entity';
import { DataSource, Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { boardStub } from './stubs/Board.stub';
import { TaskList } from '../src/task-list/entities/task-list.entity';
import { taskListStub } from './stubs/task-list.stub';

describe('TaskListController (e2e)', () => {
  let app: INestApplication;
  let boardRepository: Repository<Board>;
  let taskListRepository: Repository<TaskList>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    boardRepository = moduleFixture.get<Repository<Board>>('BoardRepository');
    taskListRepository =
      moduleFixture.get<Repository<TaskList>>('TaskListRepository');
  });

  afterAll(() => app.close());

  beforeEach(async () => {
    await boardRepository.delete({});
    await taskListRepository.delete({});
  });

  describe('/task-lists (GET)', () => {
    it('should return array of task lists', async () => {
      const board = await boardRepository.save(boardStub());
      const testTaskList = { ...taskListStub(), board };
      await taskListRepository.save(testTaskList);

      const response = await request(app.getHttpServer()).get('/task-lists/');

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject([
        { ...taskListStub(), boardId: board.id },
      ]);
    });
  });

  describe('/task-lists (POST)', () => {
    it('should return created task list', async () => {
      const boardId = (await boardRepository.save(boardStub())).id;

      const testTaskList = { ...taskListStub(), boardId };
      const response = await request(app.getHttpServer())
        .post('/task-lists/')
        .send(testTaskList);

      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(testTaskList);
    });
    it('should return Not Found error with message that board with id from request body does not exist', async () => {
      const response = await request(app.getHttpServer())
        .post('/task-lists/')
        .send({ ...taskListStub, boardId: 1 });

      expect(response.status).toEqual(404);
      expect(response.body).toMatchObject({
        message: `Board with id 1 does not exist`,
      });
    });
  });

  describe('/task-lists/:id (GET)', () => {
    it('should return task list by id', async () => {
      const board = await boardRepository.save(taskListStub());
      const testTaskList = { ...taskListStub(), board };
      const id = (await taskListRepository.save(testTaskList)).id;

      const response = await request(app.getHttpServer()).get(
        `/task-lists/${id}`,
      );

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({
        ...taskListStub(),
        boardId: board.id,
      });
    });
  });

  describe('/task-lists/:id (PATCH)', () => {
    it('should return updated task list', async () => {
      const board = await boardRepository.save(taskListStub());
      const testTaskList = { ...taskListStub(), board };
      const id = (await taskListRepository.save(testTaskList)).id;

      const delta = { name: 'new name' };
      const response = await request(app.getHttpServer())
        .patch(`/task-lists/${id}`)
        .send(delta);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({ ...delta, boardId: board.id });
    });
  });

  describe('/task-lists/:id (DELETE)', () => {
    it('should delete task list', async () => {
      const board = await boardRepository.save(taskListStub());
      const testTaskList = { ...taskListStub(), board };
      const id = (await taskListRepository.save(testTaskList)).id;

      const response = await request(app.getHttpServer()).delete(
        `/task-lists/${id}`,
      );

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({
        message: `Task list with id ${id} was deleted successfully`,
      });

      const check = await request(app.getHttpServer()).get(`/task-lists/${id}`);

      expect(check.status).toEqual(404);
    });
  });
});
