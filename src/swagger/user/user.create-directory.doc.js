/**
 * @swagger
 * /api/users/{username}/directories/{baseDir}:
 *   post:
 *     tags:
 *       - Directories
 *     summary: Create directory
 *     description: Creates a directory for a user.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username.
 *       - in: path
 *         name: baseDir
 *         required: true
 *         schema:
 *           type: string
 *         description: Base directory name.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameDirectory: { type: string }
 *     responses:
 *       200:
 *         description: Directory created.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal Server Error.
 */
