/**
 * @swagger
 * /api/files/unidad/{username}/{dir}/{filename}:
 *   get:
 *     tags:
 *       - Files
 *     summary: Get user file
 *     description: Retrieves a file belonging to a specific user and directory.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: dir
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File returned successfully.
 *         content:
 *           application/octet-stream: {}
 *       404:
 *         description: File not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/files/unidad/{dir}/{filename}:
 *   get:
 *     tags:
 *       - Files
 *     summary: Get file miniature
 *     description: Retrieves a miniature or preview version of a file.
 *     parameters:
 *       - in: path
 *         name: dir
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Miniature retrieved successfully.
 *         content:
 *           image/png: {}
 *       404:
 *         description: File not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/files/avatars/{filename}:
 *   get:
 *     tags:
 *       - Files
 *     summary: Get user avatar
 *     description: Returns a stored user avatar by filename.
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Avatar retrieved.
 *         content:
 *           image/png: {}
 *       404:
 *         description: Avatar not found.
 *       500:
 *         description: Internal server error.
 */
