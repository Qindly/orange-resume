import express from 'express';
import { protect as authMiddleware } from '../middleware/authMiddleware.js';
import { 
    createNote, 
    getAllNotes, 
    getNoteById, 
    updateNote, 
    deleteNote 
} from '../controllers/noteController.js';

const router = express.Router();

// 所有路由都需要认证
router.use(authMiddleware);

// Notes CRUD 操作
router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
