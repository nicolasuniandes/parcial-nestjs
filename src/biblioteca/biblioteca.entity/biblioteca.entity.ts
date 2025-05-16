import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BibliotecaEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column()
    ciudad: string;

    @Column()
    horario: string;
}
