import { Controller, Get, Post, Put, Body, Param, UseInterceptors, Delete, HttpCode } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BibliotecaService } from './biblioteca.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { BibliotecaDto } from './biblioteca.dto/biblioteca.dto';
import { BibliotecaEntity } from './biblioteca.entity/biblioteca.entity';

@Controller('bibliotecas')
@UseInterceptors(BusinessErrorsInterceptor)
export class BibliotecaController {
    constructor(private readonly bibliotecaService: BibliotecaService){}

    @Get()
    async findAll() {
        return await this.bibliotecaService.findAll();
    }

    @Get(':bibliotecaId')
    async findOne(@Param('bibliotecaId') bibliotecaId: string) {
        return await this.bibliotecaService.findOne(bibliotecaId)
    }

    @Post()
    async create(@Body() bibliotecaDto: BibliotecaDto){
        const biblioteca: BibliotecaEntity = plainToInstance(BibliotecaEntity, bibliotecaDto);
        return await this.bibliotecaService.create(biblioteca);
    }

    @Put(':bibliotecaId')
    async update(@Param('bibliotecaId') bibliotecaId: string, @Body() BibliotecaDto: BibliotecaDto) {
        const biblioteca: BibliotecaEntity = plainToInstance(BibliotecaEntity, BibliotecaDto)
        return await this.bibliotecaService.update(bibliotecaId, biblioteca)
    }

    @Delete(':bibliotecaId')
    @HttpCode(204)
    async delete(@Param('bibliotecaId') bibliotecaId: string) {
        return await this.bibliotecaService.delete(bibliotecaId)
    }
}
