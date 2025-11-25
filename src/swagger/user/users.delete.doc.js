/**
 * @swagger
 * /api/users/delete/{userName}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user
 *     description: Endpoint to delete a user
 *     parameters:
 *       - in: path
 *         name: userName
 *         required: true
 *         schema:
 *           type: string
 *           example: 'userName'
 *         description: User name
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ok. User deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'User deleted correctly'
 *       203:
 *         description: Unauthorized. You do not have authorization to access this resource
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Unauthorized. You do not have authorization to access this resource'
 *       404:
 *         description: Not Found. User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Not Found. User not found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
