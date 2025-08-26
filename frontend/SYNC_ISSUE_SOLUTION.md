# 左右同步问题解决方案

## 问题描述

用户反馈左侧编辑区域和右侧预览区域没有同步，具体表现为：
- 左侧显示的是placeholder内容
- 右侧显示的是渲染后的Markdown内容
- 两者内容不一致，没有实时同步

## 问题分析

经过检查，发现问题的根本原因：

1. **初始状态问题**：
   - `markdownContent` 初始化为空字符串 `''`
   - 左侧textarea显示placeholder内容
   - 右侧ReactMarkdown显示默认示例内容

2. **内容不同步**：
   - 左侧：显示placeholder文本
   - 右侧：显示硬编码的示例内容
   - 两者没有关联

3. **初始化逻辑问题**：
   - 没有在组件初始化时设置默认内容
   - 导致左右两边显示不同的内容

## 解决方案

### 1. 修复初始状态

```jsx
const MarkdownEditor = ({ content, onContentChange, onSave }) => {
  const [markdownContent, setMarkdownContent] = useState(content || '');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // 初始化时如果没有内容，使用默认内容
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    if (!isInitialized && !markdownContent) {
      setMarkdownContent(defaultMarkdown);
      setIsInitialized(true);
    }
  }, [isInitialized, markdownContent, defaultMarkdown]);
```

### 2. 统一内容显示

```jsx
// 左侧编辑区域
<textarea
  value={markdownContent}  // 使用实际内容，不是placeholder
  onChange={handleContentChange}
  placeholder="在这里输入Markdown内容..."
  className="w-full min-h-[800px] p-6 text-sm font-mono text-gray-800 bg-white border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
  style={{ height: 'auto', minHeight: '800px' }}
/>

// 右侧预览区域
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeHighlight]}
>
  {markdownContent}  // 直接使用markdownContent，不添加默认内容
</ReactMarkdown>
```

### 3. 提供模板功能

```jsx
const resumeTemplate = `# 我的简历
## 个人信息
- **姓名**: 张三
- **职位**: 全栈开发工程师
// ... 完整的简历模板
`;

const loadResumeTemplate = () => {
  setMarkdownContent(resumeTemplate);
};

// 按钮功能
<button onClick={loadResumeTemplate}>
  <FileText size={16} className="mr-2" />
  加载简历模板
</button>
```

## 实现效果

### 修复前
- ❌ 左侧显示placeholder内容
- ❌ 右侧显示硬编码示例内容
- ❌ 两者内容不一致
- ❌ 没有实时同步

### 修复后
- ✅ 左侧显示实际的Markdown内容
- ✅ 右侧显示渲染后的内容
- ✅ 两者内容完全同步
- ✅ 实时编辑和预览

## 技术要点

### 1. 状态管理
- 使用单一状态 `markdownContent` 管理内容
- 确保左右两边使用相同的数据源

### 2. 初始化逻辑
- 在组件挂载时设置默认内容
- 避免空状态导致的内容不一致

### 3. 内容同步
- 左侧textarea的 `value` 属性绑定到 `markdownContent`
- 右侧ReactMarkdown直接使用 `markdownContent`
- 通过 `onChange` 事件实现实时同步

### 4. 模板功能
- 提供简历模板供用户选择
- 一键加载完整的示例内容

## 用户体验改进

### 1. 初始体验
- 打开编辑器时显示完整的示例内容
- 用户可以立即看到编辑和预览效果

### 2. 实时反馈
- 输入时立即在右侧看到渲染效果
- 提供即时的视觉反馈

### 3. 模板支持
- 提供简历模板快速开始
- 减少用户从零开始的困扰

## 测试验证

### 测试步骤
1. 打开Markdown编辑器
2. 检查左右两边是否显示相同内容
3. 在左侧输入内容，验证右侧是否实时更新
4. 点击"加载简历模板"按钮，验证模板功能

### 预期结果
- ✅ 初始状态左右内容一致
- ✅ 实时编辑和预览同步
- ✅ 模板加载功能正常
- ✅ 滚动功能正常工作

## 总结

通过以下步骤解决了左右同步问题：

1. **修复初始状态**：确保组件初始化时设置默认内容
2. **统一数据源**：左右两边使用相同的 `markdownContent` 状态
3. **实时同步**：通过 `onChange` 事件实现实时更新
4. **提供模板**：增加简历模板功能提升用户体验

现在的实现确保了：
- 左右两边内容完全同步
- 实时编辑和预览功能
- 良好的初始用户体验
- 完整的模板支持
