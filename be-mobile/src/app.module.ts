import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';

@Module({
  imports: [UsersModule, ProductModule],
  controllers: [AppController, ProductController],
  providers: [AppService],
})
export class AppModule {}
