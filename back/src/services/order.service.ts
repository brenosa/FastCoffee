import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrderRepository } from '../repositories/order.repository';

@Injectable()
export class OrderService {
    constructor(private readonly orderRepository: OrderRepository) { }

    getPendingOrders(): Promise<any[]> {
        return this.orderRepository.getPendingOrders();
    }

    createOrder(order: Order): Promise<number> {       
        return this.orderRepository.save(order);
    }

    updateOrder(order: Order): Promise<boolean> {
        return this.orderRepository.update(order);
    }
}
