import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { SharedlistsModule } from './sharedlists/sharedlists.module';
import { Sharedlist } from './sharedlists/sharedlist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Sharedlist],
      migrations: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TerminusModule,
    UsersModule,
    SharedlistsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
