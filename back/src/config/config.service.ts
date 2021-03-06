import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cost } from '../entities/cost.entity';
import { Menu } from '../entities/menu.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/orderItem.entity';
import { Product } from '../entities/product.entity';
import { Stock } from '../entities/stock.entity';
import { User } from '../entities/user.entity';

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: [Product, Cost, Menu, Stock, Order, OrderItem, User],
      ssl: { rejectUnauthorized: false },
      autoLoadEntities: true,
      //synchronize: Boolean(this.getValue('IS_DEV')),
      //dropSchema: Boolean(this.getValue('IS_DEV')),
      logging: true
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
