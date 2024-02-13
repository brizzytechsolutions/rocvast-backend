import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new HttpException(
        'Error fetching the products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      return await this.productRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Product with ${id} not found`);
    }
  }

  async addProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create product');
    }
  }
}
