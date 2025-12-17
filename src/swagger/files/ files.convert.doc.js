/**
 * @swagger
 * /api/files/convert/{dir}/{folder}/{filename}/{ext}:
 *   get:
 *     tags:
 *       - Files
 *     summary: Convert file to another format
 *     description: Converts a file to a different format using LibreOffice.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dir
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: folder
 *         required: false
 *         schema:
 *           type: string
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: ext
 *         required: true
 *         schema:
 *           type: string
 *           example: pdf
 *     responses:
 *       200:
 *         description: File converted successfully.
 *         content:
 *           application/octet-stream: {}
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: File conversion failed.
 */
