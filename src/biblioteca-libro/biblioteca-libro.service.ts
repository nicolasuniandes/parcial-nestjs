import { Injectable } from '@nestjs/common';
import { BibliotecaEntity } from 'src/biblioteca/biblioteca.entity/biblioteca.entity';
import { LibroEntity } from 'src/libro/libro.entity/libro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class BibliotecaLibroService {
    constructor(
        @InjectRepository(BibliotecaEntity)
        private readonly bibliotecaRepository: Repository<BibliotecaEntity>,

        @InjectRepository(LibroEntity)
        private readonly libroRepository: Repository<LibroEntity>
    ) { }

    async addBookToLibrary(bibliotecaId: string, libroId: string): Promise<BibliotecaEntity> {
        const libro = await this.libroRepository.findOne({ where: { id: libroId } });
        if (!libro)
            throw new BusinessLogicException('The book with the given id was not found', BusinessError.NOT_FOUND);

        const biblioteca = await this.bibliotecaRepository.findOne({
            where: { id: bibliotecaId },
            relations: ['libros'],
        });
        if (!biblioteca)
            throw new BusinessLogicException('The library with the given id was not found', BusinessError.NOT_FOUND);

        biblioteca.libros = [...biblioteca.libros, libro];
        return await this.bibliotecaRepository.save(biblioteca);
    }

    async findBooksFromLibrary(bibliotecaId: string): Promise<LibroEntity[]> {
        const biblioteca = await this.bibliotecaRepository.findOne({
            where: { id: bibliotecaId },
            relations: ['libros'],
        });

        if (!biblioteca)
            throw new BusinessLogicException('The library with the given id was not found', BusinessError.NOT_FOUND);

        return biblioteca.libros;
    }

    async findBookFromLibrary(bibliotecaId: string, libroId: string): Promise<LibroEntity> {
        const biblioteca = await this.bibliotecaRepository.findOne({
            where: { id: bibliotecaId },
            relations: ['libros'],
        });
        if (!biblioteca)
            throw new BusinessLogicException('The library with the given id was not found', BusinessError.NOT_FOUND);

        const libro = biblioteca.libros.find((libro) => libro.id === libroId);
        if (!libro)
            throw new BusinessLogicException('The book is not associated to the given library', BusinessError.PRECONDITION_FAILED);

        return libro;
    }

    async updateBooksFromLibrary(bibliotecaId: string, libros: LibroEntity[]): Promise<BibliotecaEntity> {
        const biblioteca = await this.bibliotecaRepository.findOne({
            where: { id: bibliotecaId },
            relations: ['libros'],
        });

        if (!biblioteca)
            throw new BusinessLogicException('The library with the given id was not found', BusinessError.NOT_FOUND);

        for (const libro of libros) {
            const libroExistente = await this.libroRepository.findOne({ where: { id: libro.id } });
            if (!libroExistente)
                throw new BusinessLogicException('The book with the given id was not found', BusinessError.NOT_FOUND);
        }

        biblioteca.libros = libros;
        return await this.bibliotecaRepository.save(biblioteca);
    }

    async deleteBookFromLibrary(bibliotecaId: string, libroId: string): Promise<void> {
        const biblioteca = await this.bibliotecaRepository.findOne({
            where: { id: bibliotecaId },
            relations: ['libros'],
        });

        if (!biblioteca)
            throw new BusinessLogicException('The library with the given id was not found', BusinessError.NOT_FOUND);

        const libro = biblioteca.libros.find((l) => l.id === libroId);
        if (!libro)
            throw new BusinessLogicException('The book is not associated to the given library', BusinessError.PRECONDITION_FAILED);

        biblioteca.libros = biblioteca.libros.filter((l) => l.id !== libroId);
        await this.bibliotecaRepository.save(biblioteca);
    }
}
