import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { LibroModule } from './libro/libro.module';
import { BibliotecaEntity } from './biblioteca/biblioteca.entity/biblioteca.entity';
import { LibroEntity } from './libro/libro.entity/libro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliotecaLibroModule } from './biblioteca-libro/biblioteca-libro.module';

@Module({
  imports: [BibliotecaModule, LibroModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'biblioteca',
      entities: [BibliotecaEntity, LibroEntity],
      dropSchema: true,
      synchronize: true,
    }),
    BibliotecaLibroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
