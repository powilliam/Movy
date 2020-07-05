import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedlistsModule } from './sharedlists/sharedlists.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [DatabaseModule, UsersModule, SharedlistsModule, HealthModule, MoviesModule],
})
export class AppModule {}
