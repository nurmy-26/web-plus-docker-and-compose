import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable() // чтоб работал как сервис внутри TypeORM
export class DatabaseConfigFactory implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {} // инжектим ConfigService, чтоб был доступен в this
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('db.host'),
      port: this.configService.get<number>('db.port'),
      username: this.configService.get<string>('db.user'),
      password: this.configService.get<string>('db.pass'),
      database: this.configService.get<string>('db.name'),
      autoLoadEntities: this.configService.get<boolean>('app.autoLoadEntities'),
      synchronize: this.configService.get<boolean>('app.synchronize'),
    };
  }
}
