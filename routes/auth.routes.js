import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import {
  signInUserValidation,
  signUpUserValidation,
} from "../validations/user.validation.js";
import authorize from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: Yangi foydalanuvchi ro'yxatdan o'tkazish
 *     description: Yangi foydalanuvchi hisobini yaratish uchun ishlatiladi
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Foydalanuvchi ismi
 *                 example: "Umarkhon Khodjaev"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email manzili
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Parol (kamida 6 ta belgi)
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Noto'g'ri ma'lumotlar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Foydalanuvchi allaqachon mavjud
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
authRouter.post("/sign-up", validateMiddleware(signUpUserValidation), signUp);

/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     summary: Tizimga kirish
 *     description: Mavjud foydalanuvchi hisobi bilan tizimga kirish
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email manzili
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: Parol
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli tizimga kirildi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *         headers:
 *           Set-Cookie:
 *             description: JWT token cookie sifatida o'rnatiladi
 *             schema:
 *               type: string
 *               example: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Path=/"
 *       400:
 *         description: Noto'g'ri email yoki parol
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Foydalanuvchi topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
authRouter.post("/sign-in", validateMiddleware(signInUserValidation), signIn);

/**
 * @swagger
 * /api/v1/auth/sign-out:
 *   post:
 *     summary: Tizimdan chiqish
 *     description: Foydalanuvchini tizimdan chiqarish va JWT tokenni bekor qilish
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli tizimdan chiqildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Muvaffaqiyatli tizimdan chiqildi"
 *         headers:
 *           Set-Cookie:
 *             description: Token cookie o'chiriladi
 *             schema:
 *               type: string
 *               example: "token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
 *       401:
 *         description: Avtorizatsiya talab qilinadi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
authRouter.post("/sign-out", authorize, signOut);

export default authRouter;
