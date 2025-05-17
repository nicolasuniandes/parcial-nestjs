import { IsNotEmpty, IsString } from 'class-validator';

export class LibroDto {
    @IsString()
    @IsNotEmpty()
    readonly titulo: string;

    @IsString()
    @IsNotEmpty()
    readonly autor: string;

    @IsString()
    @IsNotEmpty()
    readonly fecha: string;

    @IsString()
    @IsNotEmpty()
    readonly isbn: string;

}