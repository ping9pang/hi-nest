//DTO (Data Transfer Object)  데이터 전송 객체

import { IsNumber, IsOptional, IsString, isString } from 'class-validator';

//DTO사용 이유?? 프로그래머로서 코드를 좀더 간결하게 만들수 있게 해줌
export class CreateMovieDto{
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly year: number;

    @IsOptional()
    @IsString({each : true})
    readonly genres: string[];
}