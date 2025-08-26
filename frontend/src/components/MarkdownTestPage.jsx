import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import MarkdownEditor from './MarkdownEditor';
import toast from 'react-hot-toast';

const MarkdownTestPage = () => {
  const navigate = useNavigate();
  const [markdownContent, setMarkdownContent] = useState('');

  const handleContentChange = (content) => {
    setMarkdownContent(content);
  };

  const handleSave = (content) => {
    console.log('保存内容:', content);
    toast.success('内容已保存！');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部导航 */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft size={20} className="mr-2" />
                返回仪表板
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Markdown编辑器测试</h1>
            </div>
            <div className="text-sm text-gray-500">
              测试独立滚动和下载功能
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">功能说明</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-3">编辑功能</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>左侧编辑区域独立滚动</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>实时Markdown语法支持</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>代码高亮和表格渲染</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-3">预览功能</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>右侧预览区域独立滚动</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>实时预览渲染效果</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>支持长文档滚动查看</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 功能测试说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
            <AlertCircle size={16} className="mr-2" />
            测试步骤：
          </h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>点击"加载示例内容"按钮加载长文档</li>
            <li>分别滚动左侧编辑区域和右侧预览区域，验证独立滚动</li>
            <li>点击右上角"预览"按钮打开预览弹窗</li>
            <li>在预览弹窗中测试PDF和图片下载功能</li>
            <li>验证预览弹窗中的内容可以滚动查看</li>
          </ol>
        </div>

        {/* Markdown编辑器 */}
        <div className="h-[calc(100vh-300px)]">
          <MarkdownEditor
            content={markdownContent}
            onContentChange={handleContentChange}
            onSave={handleSave}
          />
        </div>

        {/* 功能验证清单 */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-green-900 mb-2">功能验证清单：</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
            <div>
              <div className="flex items-center mb-1">
                <CheckCircle size={14} className="mr-2" />
                <span>左右区域独立滚动</span>
              </div>
              <div className="flex items-center mb-1">
                <CheckCircle size={14} className="mr-2" />
                <span>预览弹窗正常显示</span>
              </div>
              <div className="flex items-center mb-1">
                <CheckCircle size={14} className="mr-2" />
                <span>PDF下载功能</span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <CheckCircle size={14} className="mr-2" />
                <span>图片下载功能</span>
              </div>
              <div className="flex items-center mb-1">
                <CheckCircle size={14} className="mr-2" />
                <span>预览弹窗滚动</span>
              </div>
              <div className="flex items-center mb-1">
                <CheckCircle size={14} className="mr-2" />
                <span>实时内容同步</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownTestPage;
