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
 * /api/files/open-file:
 *   get:
 *     tags:
 *       - Files
 *     summary: Access file via secure link
 *     description: Retrieves a file using a secure access link.
 *     parameters:
 *       - in: query
 *         name: file
 *         required: true
 *         schema:
 *           type: string
 *         description: Encrypted file identifier.
 *       - in: query
 *         name: dir
 *         required: true
 *         schema:
 *           type: string
 *         description: Directory where the file is located.
 *     responses:
 *       200:
 *         description: File served successfully.
 *         content:
 *           application/octet-stream: {}
 *       404:
 *         description: File not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/files/getlink:
 *   get:
 *     tags:
 *       - Files
 *     summary: Generate secure file access link
 *     description: Generates a temporary secure link and QR code to access a file.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fileIdentifier
 *         required: true
 *         schema:
 *           type: string
 *         description: Encrypted or plain file identifier.
 *       - in: query
 *         name: directory
 *         required: true
 *         schema:
 *           type: string
 *         description: Directory where the file is located.
 *     responses:
 *       200:
 *         description: Secure access link generated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 link:
 *                   type: string
 *                   example: "http://localhost:4000/api/files/open-file?file=..."
 *                 QR:
 *                   type: string
 *                   description: Base64 encoded QR image.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
