import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const loginCorrect:{ username: string; password: string } = {
    username: "nilton.a.junior@hotmail.com",
    password: "12345"
}

const loginIncorrect:{ username: string; password: string } = {
    username: "admin@admin.com.br",
    password: "123456"
}

const expectedCorrect = {
    "access_token": "",
    "user": {
      "id": 1,
      "email": "admin@admin.com",
      "name": "Admin",
      "password": ""
    }
  }

describe('AuthController', () => {
   let authController: AuthController;
   let authService: AuthService;

   beforeEach(async () => {
      const module = await Test.createTestingModule({
         controllers: [AuthController],
         providers: [
            {
               provide: AuthService,
               useValue: {
                  validateUser:jest.fn().mockResolvedValue(expectedCorrect)
               },
            },
         ],
      }).compile();
      authController = module.get<AuthController>(AuthController);
      authService = module.get<AuthService>(AuthService);
   });

   it('should be defined', () => {
      expect(authController).toBeDefined();
      expect(authService).toBeDefined();
   });

   describe('login', () => {
      it('should return a user logged', async () => {
         //Act
         const result = await authController.login(loginCorrect);
         
         // Assert
         expect(typeof result).toEqual('object');
      });

      it('should return username or password invalid', async () => {
         //Arrange
         jest.spyOn(authService, 'validateUser').mockResolvedValueOnce({
            "message": "Usuário ou senha inválidos",
            "error": "Unauthorized",
            "statusCode": 401
          });

         //Assert
         expect(await authController.login(loginIncorrect)).toEqual({
            "message": "Usuário ou senha inválidos",
            "error": "Unauthorized",
            "statusCode": 401
          });
      });
   });
});