import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ProductDocument } from './product.schema';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) { }

  /* создание продукта */
  @Post()
  createPost(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description?: string /* описание сущности */,
  ): Promise<ProductDocument> /* это не обязательно писать,но лучше писать */ {
    return this.productService.create(name, price, description);
  }

  /* все продукты */
  @Get()
  findAllProducts(): Promise<
    ProductDocument[]
  > /* это не обязательно писать,но лучше писать */ {
    return this.productService.findAll();
  }

  /* один продукт */
  @UseGuards(JwtGuard)/* защита авторизацией, если не авторизован, не сможет получать товар  */
  @Get(':id') /* путь...product/id */ findProduct(
    @Param('id') id: string,
  ): Promise<ProductDocument> {
    return this.productService.find(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description?: string,
  ): Promise<ProductDocument> {
    return this.productService.update(id, name, price, description);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
