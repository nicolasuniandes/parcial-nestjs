import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { BibliotecaEntity } from './biblioteca.entity/biblioteca.entity';
import { BibliotecaService } from './biblioteca.service';
import { faker } from '@faker-js/faker';

describe('BibliotecaService', () => {
  let service: BibliotecaService;
  let repository: Repository<BibliotecaEntity>;
  let bibliotecasList: BibliotecaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [BibliotecaService],
    }).compile();

    service = module.get<BibliotecaService>(BibliotecaService);
    repository = module.get<Repository<BibliotecaEntity>>(getRepositoryToken(BibliotecaEntity));

    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    repository.clear();
    bibliotecasList = [];
    for (let i = 0; i < 5; i++) {
      const biblioteca: BibliotecaEntity = await repository.save({
        nombre: faker.company.name(),
        direccion: faker.location.streetAddress(),
        ciudad: faker.location.city(),
        horario_apertura: '08:00:00',
        horario_cierre: '18:00:00'
      });
      bibliotecasList.push(biblioteca);
    }
  }

  it('findAll should return all libraries', async () => {
    const biblioteca: BibliotecaEntity[] = await service.findAll();
    expect(biblioteca).not.toBeNull();
    expect(biblioteca).toHaveLength(bibliotecasList.length);
  });

  it('findOne should return a library by id', async () => {
    const storedBiblioteca: BibliotecaEntity = bibliotecasList[0];
    const biblioteca: BibliotecaEntity = await service.findOne(storedBiblioteca.id);
    expect(biblioteca).not.toBeNull();
    expect(biblioteca.nombre).toEqual(storedBiblioteca.nombre);
    expect(biblioteca.direccion).toEqual(storedBiblioteca.direccion);
    expect(biblioteca.ciudad).toEqual(storedBiblioteca.ciudad);
    expect(biblioteca.horario_apertura).toEqual(storedBiblioteca.horario_apertura);
    expect(biblioteca.horario_cierre).toEqual(storedBiblioteca.horario_cierre);
  });

  it('findOne should throw an exception for an invalid library', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The library with the given id was not found")
  });

  it('create should return a new library', async () => {
    const biblioteca: BibliotecaEntity = {
      id: "",
      nombre: faker.company.name(),
      direccion: faker.location.streetAddress(),
      ciudad: faker.location.city(),
      horario_apertura: '09:00:00',
      horario_cierre: '17:00:00',
      libros: []
    }

    const newBiblioteca: BibliotecaEntity = await service.create(biblioteca);
    expect(newBiblioteca).not.toBeNull();

    const storedBiblioteca: BibliotecaEntity = await repository.findOne({ where: { id: newBiblioteca.id } });
    expect(storedBiblioteca).not.toBeNull();
    expect(storedBiblioteca.nombre).toEqual(newBiblioteca.nombre);
    expect(storedBiblioteca.direccion).toEqual(newBiblioteca.direccion);
    expect(storedBiblioteca.ciudad).toEqual(newBiblioteca.ciudad);
    expect(storedBiblioteca.horario_apertura).toEqual(newBiblioteca.horario_apertura);
    expect(storedBiblioteca.horario_cierre).toEqual(newBiblioteca.horario_cierre);
  });

  it('update should modify a library', async () => {
    const biblioteca: BibliotecaEntity = bibliotecasList[0];
    biblioteca.nombre = "New name";
    biblioteca.direccion = "New address";
    biblioteca.horario_apertura = '10:00:00';
    biblioteca.horario_cierre = '16:00:00';

    const updatedBiblioteca: BibliotecaEntity = await service.update(biblioteca.id, biblioteca);
    expect(updatedBiblioteca).not.toBeNull();

    const storedBiblioteca: BibliotecaEntity = await repository.findOne({ where: { id: biblioteca.id } });
    expect(storedBiblioteca).not.toBeNull();
    expect(storedBiblioteca.nombre).toEqual(biblioteca.nombre);
    expect(storedBiblioteca.direccion).toEqual(biblioteca.direccion);
    expect(storedBiblioteca.horario_apertura).toEqual(biblioteca.horario_apertura);
    expect(storedBiblioteca.horario_cierre).toEqual(biblioteca.horario_cierre);
  });

  it('update should throw an exception for an invalid library', async () => {
    let biblioteca: BibliotecaEntity = bibliotecasList[0];
    biblioteca = {
      ...biblioteca,
      nombre: "New name",
      direccion: "New address",
      horario_apertura: '10:00:00',
      horario_cierre: '16:00:00'
    };
    await expect(() => service.update("0", biblioteca)).rejects.toHaveProperty("message", "The library with the given id was not found")
  });

  it('delete should remove a library', async () => {
    const biblioteca: BibliotecaEntity = bibliotecasList[0];
    await service.delete(biblioteca.id);
    const deletedBiblioteca: BibliotecaEntity = await repository.findOne({ where: { id: biblioteca.id } });
    expect(deletedBiblioteca).toBeNull();
  });

  it('delete should throw an exception for an invalid library', async () => {
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The library with the given id was not found")
  });

});
