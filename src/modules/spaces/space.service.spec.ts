import { Test, TestingModule } from '@nestjs/testing';
import { SpaceService } from './space.service';

describe('SpaceService', () => {
  let service: SpaceService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceService],
    }).compile();
    service = module.get<SpaceService>(SpaceService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
