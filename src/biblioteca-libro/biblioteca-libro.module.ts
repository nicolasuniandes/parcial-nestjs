import { Module } from '@nestjs/common';
import { BibliotecaLibroService } from './biblioteca-libro.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliotecaEntity } from 'src/biblioteca/biblioteca.entity/biblioteca.entity';
import { LibroEntity } from 'src/libro/libro.entity/libro.entity';
import { BibliotecaLibroController } from './biblioteca-libro.controller';

@Module({
  providers: [BibliotecaLibroService],
  imports: [TypeOrmModule.forFeature([BibliotecaEntity, LibroEntity])],
  controllers: [BibliotecaLibroController]
})
export class BibliotecaLibroModule {}