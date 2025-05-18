import { Test, TestingModule } from '@nestjs/testing';
import { BibliotecaLibroService } from './biblioteca-libro.service';
import { LibroEntity } from '../libro/libro.entity/libro.entity';
import { BibliotecaEntity } from '../biblioteca/biblioteca.entity/biblioteca.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';


describe('BibliotecaLibroService', () => {
  let service: BibliotecaLibroService;
  let bibliotecaRepository: Repository<BibliotecaEntity>;
  let libroRepository: Repository<LibroEntity>;
  let biblioteca: BibliotecaEntity;
  let librosList: LibroEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [BibliotecaLibroService],
    }).compile();

    service = module.get<BibliotecaLibroService>(BibliotecaLibroService);
    bibliotecaRepository = module.get<Repository<BibliotecaEntity>>(getRepositoryToken(BibliotecaEntity));
    libroRepository = module.get<Repository<LibroEntity>>(getRepositoryToken(LibroEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    libroRepository.clear();
    bibliotecaRepository.clear();

    librosList = [];
    for (let i = 0; i < 5; i++) {
      const libro: LibroEntity = await libroRepository.save({
        titulo: faker.lorem.words(),
        autor: faker.person.fullName(),
        fecha: faker.date.past(),
        isbn: faker.string.alphanumeric(13),
      });
      librosList.push(libro);
    }

    biblioteca = await bibliotecaRepository.save({
      nombre: faker.company.name(),
      ciudad: faker.location.city(),
      direccion: faker.location.streetAddress(),
      horario_apertura: '08:00',
      horario_cierre: '18:00',
      libros: librosList,
    });
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addBookToLibrary should add a book to a library', async () => {
    const newLibro = await libroRepository.save({
      titulo: faker.lorem.words(),
      autor: faker.person.fullName(),
      fecha: faker.date.past(),
      isbn: faker.string.alphanumeric(13),
    });

    const newBiblioteca = await bibliotecaRepository.save({
      nombre: faker.company.name(),
      ciudad: faker.location.city(),
      direccion: faker.location.streetAddress(),
      horario_apertura: '08:00',
      horario_cierre: '18:00',
    });

    const result = await service.addBookToLibrary(newBiblioteca.id, newLibro.id);

    expect(result.libros.length).toBe(1);
    expect(result.libros[0].titulo).toBe(newLibro.titulo);
  });

  it('addBookToLibrary should throw exception for invalid book', async () => {
    await expect(service.addBookToLibrary(biblioteca.id, '0')).rejects.toHaveProperty('message', 'The book with the given id was not found');
  });

  it('addBookToLibrary should throw exception for invalid library', async () => {
    const libro = librosList[0];
    await expect(service.addBookToLibrary('0', libro.id)).rejects.toHaveProperty('message', 'The library with the given id was not found');
  });

  it('findBooksFromLibrary should return all books for a library', async () => {
    const libros = await service.findBooksFromLibrary(biblioteca.id);
    expect(libros.length).toBe(5);
  });

  it('findBooksFromLibrary should throw exception for invalid library', async () => {
    await expect(service.findBooksFromLibrary('0')).rejects.toHaveProperty('message', 'The library with the given id was not found');
  });

  it('findBookFromLibrary should return a book from a library', async () => {
    const libro = librosList[0];
    const result = await service.findBookFromLibrary(biblioteca.id, libro.id);
    expect(result).not.toBeNull();
    expect(result.titulo).toBe(libro.titulo);
  });

  it('findBookFromLibrary should throw exception for invalid library', async () => {
    const libro = librosList[0];
    await expect(service.findBookFromLibrary('0', libro.id)).rejects.toHaveProperty('message', 'The library with the given id was not found');
  });

  it('findBookFromLibrary should throw exception for book not associated', async () => {
    const newLibro = await libroRepository.save({
      titulo: faker.lorem.words(),
      autor: faker.person.fullName(),
      fecha: faker.date.past(),
      isbn: faker.string.alphanumeric(13),
    });
    await expect(service.findBookFromLibrary(biblioteca.id, newLibro.id)).rejects.toHaveProperty('message', 'The book is not associated to the given library');
  });

  it('updateBooksFromLibrary should update books in a library', async () => {
    const newLibro = await libroRepository.save({
      titulo: faker.lorem.words(),
      autor: faker.person.fullName(),
      fecha: faker.date.past(),
      isbn: faker.string.alphanumeric(13),
    });

    const updated = await service.updateBooksFromLibrary(biblioteca.id, [newLibro]);
    expect(updated.libros.length).toBe(1);
    expect(updated.libros[0].titulo).toBe(newLibro.titulo);
  });

  it('updateBooksFromLibrary should throw exception for invalid book', async () => {
    const libro = librosList[0];
    libro.id = '0';
    await expect(service.updateBooksFromLibrary(biblioteca.id, [libro])).rejects.toHaveProperty('message', 'The book with the given id was not found');
  });

  it('updateBooksFromLibrary should throw exception for invalid library', async () => {
    const libro = librosList[0];
    await expect(service.updateBooksFromLibrary('0', [libro])).rejects.toHaveProperty('message', 'The library with the given id was not found');
  });

  it('deleteBookFromLibrary should remove book from library', async () => {
    const libro = librosList[0];
    await service.deleteBookFromLibrary(biblioteca.id, libro.id);
    const result = await bibliotecaRepository.findOne({ where: { id: biblioteca.id }, relations: ['libros'] });
    expect(result.libros.find(l => l.id === libro.id)).toBeUndefined();
  });

  it('deleteBookFromLibrary should throw exception for invalid book', async () => {
    await expect(service.deleteBookFromLibrary(biblioteca.id, '0')).rejects.toHaveProperty('message', 'The book is not associated to the given library');
  });

  it('deleteBookFromLibrary should throw exception for invalid library', async () => {
    const libro = librosList[0];
    await expect(service.deleteBookFromLibrary('0', libro.id)).rejects.toHaveProperty('message', 'The library with the given id was not found');
  });
});