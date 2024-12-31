import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app/app.controller';

@Module({ //데코레이터
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
