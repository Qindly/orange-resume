import Note from '../models/noteModel.js';

// 创建新笔记
export const createNote = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        const userId = req.user.id;

        // 计算字数统计
        const wordCount = content ? content.length : 0;
        const readingTime = Math.ceil(wordCount / 500); // 假设每分钟阅读500字

        const note = new Note({
            title: title || 'Untitled',
            content: content || '',
            category: category || '默认分类',
            tags: tags || [],
            userId,
            metadata: {
                wordCount,
                readingTime
            }
        });

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: 'Failed to create note' });
    }
};

// 获取用户的所有笔记
export const getAllNotes = async (req, res) => {
    try {
        const userId = req.user.id;
        const notes = await Note.find({ userId }).sort({ updatedAt: -1 });
        res.json({ notes });
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Failed to fetch notes' });
    }
};

// 根据ID获取笔记
export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const note = await Note.findOne({ _id: id, userId });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(note);
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).json({ message: 'Failed to fetch note' });
    }
};

// 更新笔记
export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { title, content, category, tags } = req.body;

        // 计算字数统计
        const wordCount = content ? content.length : 0;
        const readingTime = Math.ceil(wordCount / 500);

        const note = await Note.findOne({ _id: id, userId });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        note.title = title || note.title;
        note.content = content || note.content;
        note.category = category || note.category;
        note.tags = tags || note.tags;
        note.metadata = {
            wordCount,
            readingTime
        };

        const updatedNote = await note.save();
        res.json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Failed to update note' });
    }
};

// 删除笔记
export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const note = await Note.findOne({ _id: id, userId });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        await Note.findByIdAndDelete(id);
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Failed to delete note' });
    }
};
