import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { BibliotecaEntity } from './biblioteca.entity/biblioteca.entity';
import { BibliotecaService } from './biblioteca.service';

describe('BibliotecaService', () => {
  let service: BibliotecaService;
  let repository: Repository<BibliotecaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [BibliotecaService],
    }).compile();

    service = module.get<BibliotecaService>(BibliotecaService);
    repository = module.get<Repository<BibliotecaEntity>>(getRepositoryToken(BibliotecaEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});