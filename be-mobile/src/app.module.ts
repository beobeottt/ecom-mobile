import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';   
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { BillController } from './bill/bill.controller';
import { BillModule } from './bill/bill.module';
import { StaffModule } from './staff/staff.module';
@Module({
imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),

        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),

    UsersModule, ProductModule, BillModule, StaffModule
  ],
  controllers: [AppController, BillController],
  providers: [AppService],
})
export class AppModule {}
