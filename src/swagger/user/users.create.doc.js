/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create user
 *     description: Creates a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       201:
 *         description: User created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: string }
 *                 userName: { type: string }
 *                 email: { type: string }
 *                 password: { type: string }
 *                 directories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nameDirectory: { type: string }
 *                       files:
 *                         type: array
 *                         items: { type: string }
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal Server Error.
 */
