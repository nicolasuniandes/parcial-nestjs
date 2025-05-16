import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LibroEntity } from './libro.entity/libro.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class LibroService {

    constructor(
        @InjectRepository(LibroEntity)
        private readonly libroRepository: Repository<LibroEntity>
    ){}

    async findAll(): Promise<LibroEntity[]> {
        return await this.libroRepository.find({ relations: ["bibliotecas"] });
    }

    async findOne(id: string): Promise<LibroEntity> {
        const libro: LibroEntity = await this.libroRepository.findOne({ where: { id }, relations: ["bibliotecas"]});
        if (!libro)
            throw new BusinessLogicException("The book with the given id was not found", BusinessError.NOT_FOUND);

        return libro;
    }

    async create(libro: LibroEntity): Promise<LibroEntity> {
        return await this.libroRepository.save(libro);
    }

    async update(id: string, libro: LibroEntity): Promise<LibroEntity> {
        const persistedLibro: LibroEntity = await this.libroRepository.findOne({ where: { id } });
        if (!persistedLibro)
            throw new BusinessLogicException("The book with the given id was not found", BusinessError.NOT_FOUND);

        return await this.libroRepository.save({ ...persistedLibro, ...libro });
    }

    async delete(id: string) {
        const libro: LibroEntity = await this.libroRepository.findOne({ where: { id } });
        if (!libro)
            throw new BusinessLogicException("The book with the given id was not found", BusinessError.NOT_FOUND);

        await this.libroRepository.remove(libro);
    }
}
