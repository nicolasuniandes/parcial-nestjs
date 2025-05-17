import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Body,
    UseInterceptors,
    HttpCode
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BibliotecaLibroService } from './biblioteca-libro.service';
import { LibroDto } from '../libro/libro.dto/libro.dto';
import { LibroEntity } from '../libro/libro.entity/libro.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

@Controller('libraries')
@UseInterceptors(BusinessErrorsInterceptor)
export class BibliotecaLibroController {
    constructor(private readonly bibliotecaLibroService: BibliotecaLibroService) { }

    @Post(':bibliotecaId/books/:libroId')
    async addBookToLibrary(
        @Param('bibliotecaId') bibliotecaId: string,
        @Param('libroId') libroId: string
    ) {
        return await this.bibliotecaLibroService.addBookToLibrary(bibliotecaId, libroId);
    }

    @Get(':bibliotecaId/books')
    async findBooksFromLibrary(@Param('bibliotecaId') bibliotecaId: string) {
        return await this.bibliotecaLibroService.findBooksFromLibrary(bibliotecaId);
    }

    @Get(':bibliotecaId/books/:libroId')
    async findBookFromLibrary(
        @Param('bibliotecaId') bibliotecaId: string,
        @Param('libroId') libroId: string
    ) {
        return await this.bibliotecaLibroService.findBookFromLibrary(bibliotecaId, libroId);
    }

    @Put(':bibliotecaId/books')
    async updateBooksFromLibrary(
        @Param('bibliotecaId') bibliotecaId: string,
        @Body() librosDto: LibroDto[]
    ) {
        const libros: LibroEntity[] = plainToInstance(LibroEntity, librosDto);
        return await this.bibliotecaLibroService.updateBooksFromLibrary(bibliotecaId, libros);
    }

    @Delete(':bibliotecaId/books/:libroId')
    @HttpCode(204)
    async deleteBookFromLibrary(
        @Param('bibliotecaId') bibliotecaId: string,
        @Param('libroId') libroId: string
    ) {
        return await this.bibliotecaLibroService.deleteBookFromLibrary(bibliotecaId, libroId);
    }
}
