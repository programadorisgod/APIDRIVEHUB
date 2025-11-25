/**
 * @swagger
 * /api/users/{username}/directories/{directory}/folder/{folder}/files:
 *   post:
 *     tags:
 *       - Files
 *     summary: Upload file to directory
 *     description: Adds a file to a specific folder inside a user's directory.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username.
 *       - in: path
 *         name: directory
 *         required: true
 *         schema:
 *           type: string
 *         description: Directory name.
 *       - in: path
 *         name: folder
 *         required: true
 *         schema:
 *           type: string
 *         description: Folder name.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload.
 *     responses:
 *       200:
 *         description: File uploaded.
 *       203:
 *         description: Unauthorized access.
 *       404:
 *         description: Directory or user not found.
 *       500:
 *         description: Internal Server Error.
 */
