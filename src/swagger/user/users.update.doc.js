/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user
 *     description: Updates a user's data and avatar.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userName: { type: string }
 *               password: { type: string }
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Avatar image file.
 *     responses:
 *       200:
 *         description: User updated.
 *       203:
 *         description: Unauthorized access.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */
