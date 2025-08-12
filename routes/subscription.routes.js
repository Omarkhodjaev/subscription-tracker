import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  cancelUserSubscription,
  createSubscription,
  deleteSubscription,
  getSubscription,
  getSubscriptions,
  getUpcomingRenewals,
  getUserSubscriptions,
  updateSubscription,
} from "../controllers/subscription.controller.js";
import {
  createSubscriptionValidation,
  updateSubscriptionValidation,
} from "../validations/subscription.validation.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";

const subscriptionRouter = Router();

/**
 * @swagger
 * /api/v1/subscriptions:
 *   get:
 *     summary: Barcha obunalarni ko'rish
 *     description: Tizimda mavjud barcha obunalar ro'yxatini olish
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: Obunalar ro'yxati muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 subscriptions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subscription'
 */
subscriptionRouter.get("/", getSubscriptions);

/**
 * @swagger
 * /api/v1/subscriptions/upcoming-renewals:
 *   get:
 *     summary: Kelgusi to'lovlar ro'yxati
 *     description: Yaqin kunlarda to'lovi kerak bo'lgan obunalar ro'yxatini olish
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Kelgusi to'lovlar ro'yxati muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 upcomingRenewals:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: Avtorizatsiya talab qilinadi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
subscriptionRouter.get("/upcoming-renewals", authorize, getUpcomingRenewals);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   get:
 *     summary: Bitta obuna ma'lumotlarini ko'rish
 *     description: ID bo'yicha obuna ma'lumotlarini olish
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Obuna ID si
 *         schema:
 *           type: string
 *           example: "64a7b8c9d1e2f3a4b5c6d7e8"
 *     responses:
 *       200:
 *         description: Obuna ma'lumotlari muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 subscription:
 *                   $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Obuna topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
subscriptionRouter.get("/:id", getSubscription);

/**
 * @swagger
 * /api/v1/subscriptions:
 *   post:
 *     summary: Yangi obuna qo'shish
 *     description: Yangi obuna yaratish
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - currency
 *               - frequency
 *               - category
 *               - paymentMethod
 *               - startDate
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 description: Obuna nomi
 *                 example: "Netflix Premium"
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 description: Obuna narxi
 *                 example: 15.99
 *               currency:
 *                 type: string
 *                 enum: ["USD", "EUR", "GBP"]
 *                 description: Valyuta turi
 *                 example: "USD"
 *               frequency:
 *                 type: string
 *                 enum: ["daily", "weekly", "monthly", "yearly"]
 *                 description: To'lov davriyligi
 *                 example: "monthly"
 *               category:
 *                 type: string
 *                 enum: ["sports", "entertainment", "education", "health", "other"]
 *                 description: Obuna kategoriyasi
 *                 example: "entertainment"
 *               paymentMethod:
 *                 type: string
 *                 description: To'lov usuli
 *                 example: "Credit Card **** 1234"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Boshlash sanasi
 *                 example: "2024-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Tugash sanasi (ixtiyoriy)
 *                 example: "2024-12-31"
 *     responses:
 *       201:
 *         description: Obuna muvaffaqiyatli yaratildi
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
 *                   example: "Obuna muvaffaqiyatli yaratildi"
 *                 subscription:
 *                   $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Noto'g'ri ma'lumotlar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Avtorizatsiya talab qilinadi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
subscriptionRouter.post(
  "/",
  authorize,
  validateMiddleware(createSubscriptionValidation),
  createSubscription
);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   put:
 *     summary: Obuna ma'lumotlarini yangilash
 *     description: ID bo'yicha obuna ma'lumotlarini yangilash
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Obuna ID si
 *         schema:
 *           type: string
 *           example: "64a7b8c9d1e2f3a4b5c6d7e8"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Yangi obuna nomi
 *                 example: "Netflix Standard"
 *               price:
 *                 type: number
 *                 description: Yangi narx
 *                 example: 12.99
 *               currency:
 *                 type: string
 *                 enum: ["USD", "EUR", "GBP"]
 *                 description: Yangi valyuta
 *                 example: "USD"
 *               frequency:
 *                 type: string
 *                 enum: ["daily", "weekly", "monthly", "yearly"]
 *                 description: Yangi to'lov davriyligi
 *                 example: "monthly"
 *               category:
 *                 type: string
 *                 enum: ["sports", "entertainment", "education", "health", "other"]
 *                 description: Yangi kategoriya
 *                 example: "entertainment"
 *               paymentMethod:
 *                 type: string
 *                 description: Yangi to'lov usuli
 *                 example: "Debit Card **** 5678"
 *               status:
 *                 type: string
 *                 enum: ["active", "expired", "cancelled"]
 *                 description: Yangi holat
 *                 example: "active"
 *     responses:
 *       200:
 *         description: Obuna muvaffaqiyatli yangilandi
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
 *                   example: "Obuna muvaffaqiyatli yangilandi"
 *                 subscription:
 *                   $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Noto'g'ri ma'lumotlar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Avtorizatsiya talab qilinadi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Obuna topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
subscriptionRouter.put(
  "/:id",
  authorize,
  validateMiddleware(updateSubscriptionValidation),
  updateSubscription
);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   delete:
 *     summary: Obunani o'chirish
 *     description: ID bo'yicha obunani tizimdan o'chirish
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Obuna ID si
 *         schema:
 *           type: string
 *           example: "64a7b8c9d1e2f3a4b5c6d7e8"
 *     responses:
 *       200:
 *         description: Obuna muvaffaqiyatli o'chirildi
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
 *                   example: "Obuna muvaffaqiyatli o'chirildi"
 *       401:
 *         description: Avtorizatsiya talab qilinadi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Obuna topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
subscriptionRouter.delete("/:id", authorize, deleteSubscription);

/**
 * @swagger
 * /api/v1/subscriptions/user/{id}:
 *   get:
 *     summary: Foydalanuvchining barcha obunalari
 *     description: Muayyan foydalanuvchining barcha obunalarini olish
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Foydalanuvchi ID si
 *         schema:
 *           type: string
 *           example: "64a7b8c9d1e2f3a4b5c6d7e8"
 *     responses:
 *       200:
 *         description: Foydalanuvchi obunalari muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 subscriptions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: Avtorizatsiya talab qilinadi
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
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

/**
 * @swagger
 * /api/v1/subscriptions/{id}/cancel:
 *   put:
 *     summary: Obunani bekor qilish
 *     description: Obuna holatini "cancelled" ga o'zgartirish
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Obuna ID si
 *         schema:
 *           type: string
 *           example: "64a7b8c9d1e2f3a4b5c6d7e8"
 *     responses:
 *       200:
 *         description: Obuna muvaffaqiyatli bekor qilindi
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
 *                   example: "Obuna muvaffaqiyatli bekor qilindi"
 *                 subscription:
 *                   $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: Avtorizatsiya talab qilinadi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Obuna topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
subscriptionRouter.put("/:id/cancel", authorize, cancelUserSubscription);

export default subscriptionRouter;
