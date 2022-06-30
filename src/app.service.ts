import { Injectable } from '@nestjs/common';

const baseAPI = 'http://localhost:3150/api';
@Injectable()
export class AppService {
  getAppStatus(): string {
    return `Server is running! 🚀 \n Please check:  ${baseAPI} for Swagger docs...`;
  }
}
