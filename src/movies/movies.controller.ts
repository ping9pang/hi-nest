import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, Res } from '@nestjs/common';
import { uptime } from 'process';
import { MoviesService } from './movies.service';
import { Movie } from './entities/moive.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {

    constructor(readonly moviesService: MoviesService){}  //movieService라는 property를 만들고 타입을 지정해줘서 작동한다.  moviecontroller가 서비스를 필요로 한다

    @Get()
    // getAll(@Req() req, @Res() res): Movie[]{
    //     res.json() //익스프레스 형식
    getAll(): Movie[]{ 
        return this.moviesService.getAll();
    }
 
    // @Get("/search")  //search 부분이 id보다 아래있으면 nestjs는 search를 id로 판단한다.
    // search(@Query("year") searchingYear: string){
    //     return `we are searching for the moive with a title ${searchingYear}`
    // }

    @Get('/:id')
    getOne(@Param('id') movieId : number):Movie{        //movieId : string를 쓰면 service쪽에서 +string(함수이름) 을 추가해서 number형식으로 변경가능
        return this.moviesService.getOne(movieId);
        //return `This will return one moives with the id ${movieId}`
    }

    @Post()
    create(@Body() movieData: CreateMovieDto){   //누군가 movie를 만들고 싶으면  moviedata의 타입은 createMovieDto가 될것이다. 
        return this.moviesService.create(movieData);
        //return movieData;
        //console.log(movieData);
        //return 'This will create a movie';
    }

    @Delete("/:id")
    remove(@Param('id') movieId: number){
        return this.moviesService.deleteOne(movieId);
        //return `This will delete a movie with the id${movieId}`
    }

    @Patch('/:id')  //여기는 내가 직접 요청하지 않으면, 아무것도 제공이 되지 않는다.      인솜니아에서 http://localhost:3000/movies를 patch로 실행시키면 댐
    path(@Param('id') movieId: number, @Body() updateData:UpdateMovieDto){
        return this.moviesService.update(movieId,updateData); 
        // return{
        //     updateData: movieId,
        //     ...updateData,
        // };
        //return `This will patch a movie with the id${movieId}`
    }


}
