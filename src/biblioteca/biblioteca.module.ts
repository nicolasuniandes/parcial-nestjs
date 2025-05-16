import { Module } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { BibliotecaEntity } from './biblioteca.entity/biblioteca.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliotecaController } from './biblioteca.controller';

@Module({
  providers: [BibliotecaService],
  imports: [TypeOrmModule.forFeature([BibliotecaEntity])],
  controllers: [BibliotecaController],
})
export class BibliotecaModule {}
