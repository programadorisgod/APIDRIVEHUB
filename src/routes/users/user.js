import { Router } from 'express'
import { UpdateUser, createDirectorie, createUser, deleteDirectory, deleteFileUser, deleteUser, getUser, updateDirectories } from '../../controllers/users.js/user.js'
import { ValidateData } from '../../validators/validatorUser.js'
import { checkAuth } from '../../middleware/auth/auth.js'
import { uploadFile } from '../../middleware/multer/upload.js'
import { createFile } from '../../middleware/directories/CreateDirectories.js'
import { uploadAvatar } from '../../middleware/multer/uploadAvatar.js'

const routerUser = Router()

const path = '/api/users'

/**
 * @swagger
 * /api/users/{userName}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user
 *     description: Endpoint to get a user by userName
 *     parameters:
 *       - in: path
 *         name: userName
 *         required: true
 *         schema:
 *           type: string
 *           example: 'usernew'
 *           description: User name
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ok. User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User id
 *                 userName:
 *                   type: string
 *                   description: User name
 *                 email:
 *                   type: string
 *                   description: User email
 *                 password:
 *                   type: string
 *                   description: User password
 *                 directories:
 *                   type: array
 *                   description: User directories
 *                   items:
 *                     type: object
 *                     properties:
 *                       nameDirectory:
 *                         type: string
 *                         description: Directory name
 *                       files:
 *                         type: array
 *                         description: Directory files
 *       203:
 *         description: Unauthorized. You do not have authorization to access this resource
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: Unauthorized. You do not have authorization to access this resource
 *       404:
 *         description: Not Found. User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: Not Found. User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: Internal Server Error
 */
routerUser.get(`${path}/:userName`, checkAuth, getUser)
/**
 * @swagger
 * /api/users/create:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create user
 *     description: Endpoint to create a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: User name
 *               email:
 *                 type: string
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *     responses:
 *       201:
 *         description: Created. User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User id
 *                 userName:
 *                   type: string
 *                   description: User name
 *                 email:
 *                   type: string
 *                   description: User email
 *                 password:
 *                   type: string
 *                   description: User password
 *                 directories:
 *                   type: array
 *                   description: User directories
 *                   items:
 *                     type: object
 *                     properties:
 *                       nameDirectory:
 *                         type: string
 *                         description: Directory name
 *                       files:
 *                         type: array
 *                         description: Directory files
 *       400:
 *         description: Bad Request. Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: Bad Request. Invalid data
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: Internal Server Error
 */
routerUser.post(`${path}/create`, ValidateData, createUser)
/**
 * @swagger
 * /api/users/update/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user
 *     description: Endpoint to update a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: '60f0b0b3b3b3b3b3b3b3b3b3'
 *         description: User id
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: User name
 *               password:
 *                 type: string
 *                 description: User password
 *               avatar:
 *                 type: file
 *                 description: User avatar
 *     responses:
 *       200:
 *         description: Ok. User updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User id
 *                 userName:
 *                   type: string
 *                   description: User name
 *                 email:
 *                   type: string
 *                   description: User email
 *                 password:
 *                   type: string
 *                   description: User password
 *                 directories:
 *                   type: array
 *                   description: User directories
 *       203:
 *         description: Unauthorized. You do not have authorization to access this resource
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized. You do not have authorization to access this resource
 *       404:
 *         description: Not Found. User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Not Found. User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
routerUser.put(`${path}/update/:id`, checkAuth, ValidateData, uploadAvatar, UpdateUser)
/**
 * @swagger
 * /api/users/createDirectory/{userName}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Create directory
 *     description: Endpoint to create a directory
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameDirectory:
 *                 type: string
 *                 description: Directory name
 *                 example: 'Prueba'
 *     responses:
 *       200:
 *         description: Ok. Directory created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User id
 *                 userName:
 *                   type: string
 *                   description: User name
 *                 email:
 *                   type: string
 *                   description: User email
 *                 password:
 *                   type: string
 *                   description: User password
 *                 directories:
 *                   type: array
 *                   description: User directories
 *                   items:
 *                     type: object
 *                     properties:
 *                       nameDirectory:
 *                         type: string
 *                         description: Directory name
 *                         example: 'Prueba'
 *                       files:
 *                         type: arrays
 *                         description: Directory files
*       203:
 *         description: Unauthorized. You do not have authorization to access this resource
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized. You do not have authorization to access this resource
 *       404:
 *         description: Not Found. User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Not Found. User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
routerUser.put(`${path}/createDirectory/:userName`, checkAuth, createDirectorie, createFile)
/**
 * @swagger
 * /api/users/addFields/{userName}/{nameDirectory}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Add fields
 *     description: Endpoint to add fields
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Files:
 *                 type: string
 *                 description: File name
 *                 example: 'Aqui puedes cargar tus archivos de todo tipo de formato no es el nombre como tal sino seleccionar los archivos que deseas cargar'
 *     responses:
 *       200:
 *         description: Ok. Fields added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User id
 *                 userName:
 *                   type: string
 *                   description: User name
 *                 email:
 *                   type: string
 *                   description: User email
 *                 password:
 *                   type: string
 *                   description: User password
 *                 directories:
 *                   type: array
 *                   description: User directories
 *                   items:
 *                     type: object
 *                     properties:
 *                       nameDirectory:
 *                         type: string
 *                         description: Directory name
 *                         example: 'Prueba'
 *                       files:
 *                         type: array
 *                         description: Directory files
 *                         example: ['foto.jpg']
 *       203:
 *         description: Unauthorized. You do not have authorization to access this resource
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized. You do not have authorization to access this resource
 *       404:
 *         description: Not Found. User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Not Found. User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
routerUser.put(`${path}/addFields/:userName/:nameDirectory`, checkAuth, uploadFile, updateDirectories)
/**
 * @swagger
 * /api/users/deleteDirectory/{userName}/{nameDirectory}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete directory
 *     description: Endpoint to delete a directory
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
 *         description: Ok. Directory deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Directory deleted correctly'
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
routerUser.delete(`${path}/deleteDirectory/:userName/:nameDirectory`, checkAuth, deleteDirectory)
/**
 * @swagger
 * /api/users/deleteFiles/{userName}/{nameDirectory}:
 *   delete:
 *     tags:
 *       - Users
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
routerUser.delete(`${path}/deleteFiles/:userName/:nameDirectory`, checkAuth, deleteFileUser)
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
routerUser.delete(`${path}/delete/:userName`, checkAuth, deleteUser)

export default routerUser
