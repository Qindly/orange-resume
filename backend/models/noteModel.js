import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: '默认分类',
        enum: ['默认分类', '技术笔记', '学习笔记', '工作笔记', '生活笔记']
    },
    tags: [{
        type: String,
        trim: true
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    metadata: {
        wordCount: {
            type: Number,
            default: 0
        },
        readingTime: {
            type: Number,
            default: 1
        }
    }
}, {
    timestamps: true
});

// 创建索引以提高查询性能
noteSchema.index({ userId: 1, updatedAt: -1 });
noteSchema.index({ userId: 1, category: 1 });
noteSchema.index({ userId: 1, tags: 1 });

const Note = mongoose.model('Note', noteSchema);

export default Note;
