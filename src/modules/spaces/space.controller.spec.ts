import { Test, TestingModule } from '@nestjs/testing';
import { SpaceController } from './space.controller';

describe('Space Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [SpaceController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: SpaceController = module.get<SpaceController>(SpaceController);
    expect(controller).toBeDefined();
  });
});
