import { Controller, Get, Post, Put, Body, Param, UseInterceptors, Delete, HttpCode } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { LibroService } from './libro.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { LibroDto } from './libro.dto/libro.dto';
import { LibroEntity } from './libro.entity/libro.entity';

@Controller('books')
@UseInterceptors(BusinessErrorsInterceptor)
export class LibroController {
    constructor(private readonly libroService: LibroService) { }

    @Get()
    async findAll() {
        return await this.libroService.findAll();
    }

    @Get(':libroId')
    async findOne(@Param('libroId') libroId: string) {
        return await this.libroService.findOne(libroId);
    }

    @Post()
    async create(@Body() libroDto: LibroDto) {
        const libro: LibroEntity = plainToInstance(LibroEntity, libroDto);
        return await this.libroService.create(libro);
    }

    @Put(':libroId')
    async update(@Param('libroId') libroId: string, @Body() libroDto: LibroDto) {
        const libro: LibroEntity = plainToInstance(LibroEntity, libroDto);
        return await this.libroService.update(libroId, libro);
    }

    @Delete(':libroId')
    @HttpCode(204)
    async delete(@Param('libroId') libroId: string) {
        return await this.libroService.delete(libroId);
    }
}
