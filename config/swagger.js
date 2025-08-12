import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { PORT } from './env.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Subscription Tracker API',
      version: '1.0.0',
      description: 'Shaxsiy obunalarni boshqarish uchun Node.js/Express backend API. JWT autentifikatsiya, MongoDB, obuna kuzatuvi, avtomatik eslatmalar va workflow boshqaruvi bilan.',
      contact: {
        name: 'Umarkhon Khodjaev',
        email: 'js.with.umar@gmail.com',
        url: 'https://github.com/omarkhodjaev'
      },
      license: {
        name: 'Private',
        url: 'https://github.com/Omarkhodjaev/subscription-tracker'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT || 5500}`,
        description: 'Development server'
      },
      {
        url: 'https://api.subscription-tracker.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token olish uchun /api/v1/auth/sign-in endpoint dan foydalaning'
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
          description: 'JWT token cookie orqali'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'Foydalanuvchi ID si',
              example: '64a7b8c9d1e2f3a4b5c6d7e8'
            },
            name: {
              type: 'string',
              description: 'Foydalanuvchi ismi',
              example: 'Umarkhon Khodjaev'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email manzili',
              example: 'user@example.com'
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Parol (kamida 6 ta belgi)',
              example: 'password123'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Yaratilgan sana'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Yangilangan sana'
            }
          }
        },
        Subscription: {
          type: 'object',
          required: ['name', 'price', 'currency', 'frequency', 'category', 'paymentMethod', 'startDate'],
          properties: {
            _id: {
              type: 'string',
              description: 'Obuna ID si',
              example: '64a7b8c9d1e2f3a4b5c6d7e8'
            },
            name: {
              type: 'string',
              minLength: 3,
              maxLength: 100,
              description: 'Obuna nomi',
              example: 'Netflix Premium'
            },
            price: {
              type: 'number',
              minimum: 0,
              description: 'Obuna narxi',
              example: 15.99
            },
            currency: {
              type: 'string',
              enum: ['USD', 'EUR', 'GBP'],
              description: 'Valyuta turi',
              example: 'USD'
            },
            frequency: {
              type: 'string',
              enum: ['daily', 'weekly', 'monthly', 'yearly'],
              description: 'To\'lov davriyligi',
              example: 'monthly'
            },
            category: {
              type: 'string',
              enum: ['sports', 'entertainment', 'education', 'health', 'other'],
              description: 'Obuna kategoriyasi',
              example: 'entertainment'
            },
            paymentMethod: {
              type: 'string',
              description: 'To\'lov usuli',
              example: 'Credit Card **** 1234'
            },
            status: {
              type: 'string',
              enum: ['active', 'expired', 'cancelled'],
              description: 'Obuna holati',
              example: 'active'
            },
            startDate: {
              type: 'string',
              format: 'date',
              description: 'Boshlash sanasi',
              example: '2024-01-01'
            },
            endDate: {
              type: 'string',
              format: 'date',
              description: 'Tugash sanasi',
              example: '2024-12-31'
            },
            nextPaymentDate: {
              type: 'string',
              format: 'date',
              description: 'Keyingi to\'lov sanasi',
              example: '2024-02-01'
            },
            userId: {
              type: 'string',
              description: 'Foydalanuvchi ID si',
              example: '64a7b8c9d1e2f3a4b5c6d7e8'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Yaratilgan sana'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Yangilangan sana'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Muvaffaqiyatli tizimga kirildi'
            },
            user: {
              $ref: '#/components/schemas/User'
            },
            token: {
              type: 'string',
              description: 'JWT token',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Xatolik yuz berdi'
            },
            error: {
              type: 'string',
              example: 'Batafsil xatolik ma\'lumoti'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      },
      {
        cookieAuth: []
      }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Swagger annotations uchun fayllar
};

const specs = swaggerJSDoc(options);

export { swaggerUi, specs };
