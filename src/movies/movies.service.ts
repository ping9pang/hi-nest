import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/moive.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
    private movies: Movie[] = []

    getAll(): Movie[]{     //getAll()을 실행할때 마다 Movie의 배열을 리턴한다.
        return this.movies;
    }

    getOne(id:number):Movie{
         //const moive = this.movies.find(movie => movie.id === +id); //id가 스트링 형식이면 스트링으로 받아오고 그것을 number로 바꾼다.  +string(id)를 쓰면 number로 바꿔준다.
         const moive = this.movies.find(movie => movie.id === id);  //id가 number이면 +를 뺀다.
         if(!moive){
            throw new NotFoundException(`Movie with Id: ${id} not found`)     //nest가 제공하는 예외처리  
         }
         return moive; 
    }

    deleteOne(id:number){
        this.getOne(id)
        this.movies = this.movies.filter(movie =>movie.id !== id)
    }

    create(movieData: CreateMovieDto){
        this.movies.push({
            id: this.movies.length+ 1,
            ...movieData,
        })
    }

    update(id:number , updateData:UpdateMovieDto){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
    }
}
