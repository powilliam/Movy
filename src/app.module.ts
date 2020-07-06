import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedlistsModule } from './sharedlists/sharedlists.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { MoviesModule } from './movies/movies.module';
import { UsersSharedlistsModule } from './users-sharedlists/users-sharedlists.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    SharedlistsModule,
    HealthModule,
    MoviesModule,
    UsersSharedlistsModule,
    AuthModule,
  ],
})
export class AppModule {}
