import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliotecaEntity } from 'src/biblioteca/biblioteca.entity/biblioteca.entity';
import { LibroEntity } from 'src/libro/libro.entity/libro.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [BibliotecaEntity, LibroEntity],
   synchronize: true
 }),
 TypeOrmModule.forFeature([BibliotecaEntity, LibroEntity]),
];