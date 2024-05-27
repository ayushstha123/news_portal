import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getApprovedposts, getposts, updateStatus, updatepost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getposts', getposts)
router.get('/getapprovedposts', getApprovedposts);
router.put('/update-status/:postId/:userId', verifyToken, updateStatus);
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
router.put('/updatepost/:postId/:userId', verifyToken, updatepost)


export default router;