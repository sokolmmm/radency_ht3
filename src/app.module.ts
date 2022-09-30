import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5000,
      username: 'postgres',
      password: 'postgres',
      database: 'example',
      models: [],
      autoLoadModels: true,
    }),
    NotesModule,
  ],
})
export class AppModule {}
