/**
 * @swagger
 * /api/users/deleteFiles/{userName}/{nameDirectory}:
 *   delete:
 *     tags:
 *       - Files
 *     summary: Delete files
 *     description: Endpoint to delete files
 *     parameters:
 *       - in: path
 *         name: userName
 *         required: true
 *         schema:
 *           type: string
 *           example: 'userName'
 *         description: User name
 *       - in: path
 *         name: nameDirectory
 *         required: true
 *         schema:
 *           type: string
 *           example: 'Prueba'
 *         description: Directory name
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ok. Files deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Files deleted correctly'
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
 *         description: Not Found. User not found or Directory not found, id is malformed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Not Found. User not found or Directory not found, id is malformed
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
