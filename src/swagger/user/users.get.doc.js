/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by ID
 *     description: Retrieves a user by their ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID.
 *     responses:
 *       200:
 *         description: User found.
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
 *       401:
 *         description: Missing or invalid token.
 *       403:
 *         description: Token expired or unauthorized access.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */
