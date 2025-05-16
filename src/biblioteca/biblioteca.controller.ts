import { Controller } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';

@Controller('biblioteca')
export class BibliotecaController {
    constructor(private readonly bibliotecaService: BibliotecaService){}
}
