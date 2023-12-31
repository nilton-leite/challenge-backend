import { Test } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order, Status } from '@prisma/client';

const newOrder:Order = {
    id: 1,
    client_name: "Order",
    city: "City",
    neighborhood: "Neighborhood",
    number: "Number",
    state: "State",
    status: "PENDING",
    street: "Street",
    zipCode: "zipCode"
}

const updateStatusInProgress: { status: Status } = {
    status: "IN_PROGRESS",
}

const expectedUnauthorized = {
    "message": "Unauthorized",
    "statusCode": 401
  }

const expectedCorrect = {
  "statusCode": 200,
  "message": "Order created successfully",
  "response": {
    "id": 1,
    "client_name": "Order",
    "street": "Street",
    "zipCode": "zipCode",
    "number": "Number",
    "state": "State",
    "city": "City",
    "neighborhood": "Neighborhood",
    "status": "PENDING"
  }
}

const expectedCorrectUpdated = {
  "statusCode": 200,
  "message": "Order updated successfully",
  "response": {
    "id": 1,
    "client_name": "Order",
    "street": "Street",
    "zipCode": "zipCode",
    "number": "Number",
    "state": "State",
    "city": "City",
    "neighborhood": "Neighborhood",
    "status": "IN_PROGRESS"
  }
}

const expectedReturn = {
    "statusCode": 200,
    "message": "Orders successfully redeemed",
    "response": [
      {
        "id": 1,
        "client_name": "Order",
        "street": "Street",
        "zipCode": "zipCode",
        "number": "Number",
        "state": "State",
        "city": "City",
        "neighborhood": "Neighborhood",
        "status": "IN_PROGRESS"
      },
      {
        "id": 2,
        "client_name": "Order",
        "street": "Street",
        "zipCode": "zipCode",
        "number": "Number",
        "state": "State",
        "city": "City",
        "neighborhood": "Neighborhood",
        "status": "PENDING"
      },
      
    ]
  }

describe('OrdersController', () => {
   let ordersController: OrdersController;
   let ordersService: OrdersService;

   beforeEach(async () => {
      const module = await Test.createTestingModule({
         controllers: [OrdersController],
         providers: [
            {
               provide: OrdersService,
               useValue: {
                  create:jest.fn().mockResolvedValue(expectedCorrect),
                  findMany:jest.fn().mockResolvedValue(expectedReturn),
                  update:jest.fn().mockResolvedValue(expectedCorrectUpdated)
               },
            },
         ],
      }).compile();
      ordersController = module.get<OrdersController>(OrdersController);
      ordersService = module.get<OrdersService>(OrdersService);
   });

   it('should be defined', () => {
      expect(OrdersController).toBeDefined();
      expect(OrdersService).toBeDefined();
   });

   describe('orders', () => {
      it('should return unauthorized', async () => {
         //Arrange
         jest.spyOn(ordersService, 'create').mockResolvedValueOnce(expectedUnauthorized);

         //Act
         const result = await ordersController.create(newOrder);
         
         // Assert
         expect(typeof result).toEqual('object');
         expect(result).toEqual(expectedUnauthorized);
      });

      it('should return successfully created', async () => {
         //Act
         const result = await ordersController.create(newOrder);
         
         // Assert
         expect(typeof result).toEqual('object');
         expect(result).toEqual(expectedCorrect);
      });

      it('should return successfully updated', async () => {
        //Act
        const result = await ordersController.update('1',updateStatusInProgress);
        
        // Assert
        expect(typeof result).toEqual('object');
        expect(result).toEqual(expectedCorrectUpdated);
     });

      it('should return list orders', async () => {
        //Arrange
        jest.spyOn(ordersService, 'findMany').mockResolvedValueOnce(expectedReturn);

        //Act
        const result = await ordersController.findMany();
        
        // Assert
        expect(typeof result).toEqual('object');
        expect(result).toEqual(expectedReturn);
     });
   });
});