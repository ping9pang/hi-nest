//DTO (Data Transfer Object)  데이터 전송 객체

import { IsNumber, IsString, isString } from 'class-validator';
import { PartialType} from "@nestjs/mapped-types";
import { fromEventPattern } from 'rxjs';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto){
}  




// export class UpdateMovieDto{
//     @IsString()
//     readonly title?: string;    //?를 붙이면 필수사항이 아니라는거다 

//     @IsNumber()
//     readonly year?: number;

//     @IsString({each : true})
//     readonly genres?: string[];
// }  