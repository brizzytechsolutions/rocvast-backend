import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/createProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async detail(@Param('id') id: number): Promise<Product> {
    return await this.productService.getProductById(id);
  }

  @Post()
  async add(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productService.addProduct(createProductDto);
  }
}
