import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BibliotecaEntity } from './biblioteca.entity/biblioteca.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class BibliotecaService {

    constructor(
        @InjectRepository(BibliotecaEntity)
        private readonly bibliotecaRepository: Repository<BibliotecaEntity>
    ){}

    async findAll(): Promise<BibliotecaEntity[]> {
        return await this.bibliotecaRepository.find({ relations: ["libros"] });
    }

    async findOne(id: string): Promise<BibliotecaEntity> {
        const biblioteca: BibliotecaEntity = await this.bibliotecaRepository.findOne({where: {id}, relations: ["libros"] } );
        if (!biblioteca)
          throw new BusinessLogicException("The library with the given id was not found", BusinessError.NOT_FOUND);
   
        return biblioteca;
    }

    async create(biblioteca: BibliotecaEntity): Promise<BibliotecaEntity> {
        return await this.bibliotecaRepository.save(biblioteca);
    }

    async update(id: string, biblioteca: BibliotecaEntity): Promise<BibliotecaEntity> {
        const persistedBiblioteca: BibliotecaEntity = await this.bibliotecaRepository.findOne({where:{id}});
        if (!persistedBiblioteca)
          throw new BusinessLogicException("The library with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.bibliotecaRepository.save({...persistedBiblioteca, ...biblioteca});
    }

    async delete(id: string) {
        const biblioteca: BibliotecaEntity = await this.bibliotecaRepository.findOne({where:{id}});
        if (!biblioteca)
          throw new BusinessLogicException("The library with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.bibliotecaRepository.remove(biblioteca);
    }
}
