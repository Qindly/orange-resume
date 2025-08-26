import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Save, Eye, Edit, FileText } from 'lucide-react';
import './MarkdownEditor.css';

const MarkdownEditor = ({ content, onContentChange, onSave }) => {
  const [markdownContent, setMarkdownContent] = useState(content || '');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    setMarkdownContent(content || '');
  }, [content]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setMarkdownContent(newContent);
    onContentChange?.(newContent);
  };

  const handleSave = () => {
    onSave?.(markdownContent);
  };

  const defaultMarkdown = `# 欢迎使用 Markdown 编辑器

在左侧编辑区域输入 Markdown 内容，右侧将实时显示预览效果。

## 支持的语法

- **粗体文本**
- *斜体文本*
- \`行内代码\`
- [链接](https://example.com)
- 列表项

\`\`\`javascript
// 代码块
function hello() {
  console.log('Hello World!');
}
\`\`\`

| 表格 | 示例 |
|------|------|
| 单元格1 | 单元格2 |

> 引用文本示例

## 更多内容示例

### 列表展示
1. 有序列表项1
2. 有序列表项2
3. 有序列表项3

### 无序列表
- 项目1
- 项目2
- 项目3

### 代码示例
\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`

### 表格示例
| 功能 | 状态 | 说明 |
|------|------|------|
| 编辑 | ✅ | 支持实时编辑 |
| 预览 | ✅ | 实时预览效果 |
| 导出 | ✅ | 支持PDF导出 |

### 引用文本
> 这是一个引用文本的示例，可以用来突出显示重要的信息。

### 链接示例
访问 [GitHub](https://github.com) 查看更多项目。

### 强调文本
**这是粗体文本**，*这是斜体文本*，\`这是行内代码\`。

---

*感谢使用我们的Markdown编辑器！*`;

  const resumeTemplate = `# 我的简历

## 个人信息
- **姓名**: 张三
- **职位**: 全栈开发工程师
- **邮箱**: zhangsan@example.com
- **电话**: 138-0000-0000

## 工作经历

### 高级前端开发工程师 - ABC科技有限公司
**2022年1月 - 至今**
- 负责公司核心产品的前端架构设计和开发
- 使用React、TypeScript等技术栈
- 带领5人团队完成多个重要项目
- 优化网站性能，提升用户体验
- 参与技术选型和架构设计

### 前端开发工程师 - XYZ互联网公司
**2020年3月 - 2021年12月**
- 参与电商平台的开发和维护
- 优化网站性能，提升用户体验
- 负责移动端适配和响应式设计
- 与后端团队协作完成API对接

### 初级开发工程师 - 创业公司
**2019年6月 - 2020年2月**
- 参与多个小型项目的开发
- 学习前端技术栈
- 协助团队完成日常开发任务

## 教育背景

### 计算机科学与技术 - 某某大学
**2016年9月 - 2020年6月**
- 本科学位
- 主修课程：数据结构、算法、数据库、网络编程
- 获得优秀毕业生称号
- 参与多个学术项目

### 在线课程认证
- Coursera: 机器学习专项课程
- Udemy: React完整开发课程
- 慕课网: Node.js后端开发

## 技能专长

### 编程语言
- JavaScript/TypeScript ⭐⭐⭐⭐⭐
- Python ⭐⭐⭐⭐
- Java ⭐⭐⭐
- Go ⭐⭐
- Rust ⭐

### 前端技术
- React ⭐⭐⭐⭐⭐
- Vue.js ⭐⭐⭐⭐
- HTML/CSS ⭐⭐⭐⭐⭐
- Next.js ⭐⭐⭐⭐
- Tailwind CSS ⭐⭐⭐⭐⭐

### 后端技术
- Node.js ⭐⭐⭐⭐
- Express ⭐⭐⭐⭐
- MongoDB ⭐⭐⭐
- MySQL ⭐⭐⭐
- Redis ⭐⭐⭐

### 开发工具
- Git ⭐⭐⭐⭐⭐
- Docker ⭐⭐⭐⭐
- Webpack ⭐⭐⭐
- Vite ⭐⭐⭐⭐
- VS Code ⭐⭐⭐⭐⭐

## 项目经验

### 电商管理系统
- **技术栈**: React + Node.js + MongoDB
- **描述**: 一个完整的电商后台管理系统
- **链接**: [GitHub](https://github.com/example/project)
- **功能**: 商品管理、订单处理、用户管理、数据分析
- **成果**: 提升运营效率30%，减少人工错误50%

### 在线学习平台
- **技术栈**: Vue.js + Python + MySQL
- **描述**: 支持在线课程学习和考试的平台
- **功能**: 课程管理、视频播放、在线考试、学习进度跟踪
- **用户**: 服务超过10万名学生

### 企业管理系统
- **技术栈**: React + TypeScript + Node.js
- **描述**: 企业内部管理系统
- **功能**: 员工管理、项目管理、财务管理、报表生成
- **成果**: 提高工作效率40%

### 移动端应用
- **技术栈**: React Native + Firebase
- **描述**: 跨平台移动应用
- **功能**: 实时通讯、文件分享、任务管理
- **下载量**: 超过5万次

## 证书认证
- AWS认证解决方案架构师
- Google Cloud认证开发者
- 微软认证Azure管理员
- 阿里云认证开发者
- 腾讯云认证工程师

## 语言能力
- 中文（母语）
- 英语（流利）
- 日语（基础）

## 兴趣爱好
- 开源项目贡献
- 技术博客写作
- 健身运动
- 摄影
- 旅行

## 技术博客
- 个人博客: [https://zhangsan.dev](https://zhangsan.dev)
- 技术分享: [https://medium.com/@zhangsan](https://medium.com/@zhangsan)
- 开源贡献: [https://github.com/zhangsan](https://github.com/zhangsan)

## 获奖经历
- 2023年 最佳员工奖
- 2022年 技术创新奖
- 2021年 优秀新人奖
- 2020年 学术优秀奖

## 社区贡献
- 开源项目维护者
- 技术会议演讲者
- 编程马拉松参与者
- 技术社区活跃成员

## 未来规划
- 深入学习云原生技术
- 探索AI和机器学习应用
- 建立个人技术品牌
- 参与更多开源项目

## 联系方式
- **邮箱**: zhangsan@example.com
- **电话**: 138-0000-0000
- **微信**: zhangsan_dev
- **LinkedIn**: [linkedin.com/in/zhangsan](https://linkedin.com/in/zhangsan)
- **GitHub**: [github.com/zhangsan](https://github.com/zhangsan)

---

*感谢您花时间阅读我的简历，期待与您的合作！*`;

  // 初始化时如果没有内容，使用默认内容
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized && !markdownContent) {
      setMarkdownContent(defaultMarkdown);
      setIsInitialized(true);
    }
  }, [isInitialized, markdownContent, defaultMarkdown]);

  const loadResumeTemplate = () => {
    setMarkdownContent(resumeTemplate);
  };

  return (
    <div className="flex h-full bg-gray-50 rounded-xl shadow-xl overflow-hidden border border-gray-200">
      {/* 左侧编辑区域 */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">编辑文档</h3>
              <p className="text-sm text-gray-500">在左侧编写，右侧实时预览</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              {isPreviewMode ? <Edit size={16} className="mr-2" /> : <Eye size={16} className="mr-2" />}
              {isPreviewMode ? '编辑模式' : '预览模式'}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
            >
              <Save size={16} className="mr-2" />
              保存文档
            </button>
          </div>
        </div>

        {/* 编辑区域 - 独立滚动 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto">
            <textarea
              value={markdownContent}
              onChange={handleContentChange}
              placeholder="在这里输入Markdown内容...
              
# 标题示例
## 二级标题

- 列表项1
- 列表项2

**粗体文本** 和 *斜体文本*

[链接文本](https://example.com)

```javascript
// 代码块示例
function hello() {
  console.log('Hello World!');
}
```"
              className="w-full min-h-[800px] p-6 text-sm font-mono text-gray-800 bg-white border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
              style={{ height: 'auto', minHeight: '800px' }}
            />
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <button
                onClick={loadResumeTemplate}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
              >
                <FileText size={16} className="mr-2" />
                加载简历模板
              </button>
              <div className="text-xs text-gray-500">
                支持 Markdown 语法
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧预览区域 - 只在非预览模式下显示，独立滚动 */}
      {!isPreviewMode && (
        <div className="flex-1 flex flex-col border-l border-gray-200 bg-white">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">实时预览</h3>
                <p className="text-sm text-gray-500">文档渲染效果</p>
              </div>
            </div>
          </div>

          {/* 预览区域 - 独立滚动 */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="p-6">
              <div className="prose prose-sm max-w-none">
                <div className="markdown-content bg-white p-6 rounded-lg border border-gray-100 shadow-sm" style={{ minHeight: '1200px' }}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
