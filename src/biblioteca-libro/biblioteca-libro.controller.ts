import { Controller } from '@nestjs/common';
import { BibliotecaLibroService } from './biblioteca-libro.service';

@Controller('biblioteca-libro')
export class BibliotecaLibroController {
    constructor(private readonly bibliotecaLibroService: BibliotecaLibroService){}
}
