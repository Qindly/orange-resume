import React from 'react';

const ScrollTest = () => {
  return (
    <div className="flex h-screen">
      {/* 左侧编辑区域 */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">编辑区域</h2>
        </div>
        <div className="flex-1 overflow-y-auto bg-blue-50">
          <div className="p-4">
            <textarea
              className="w-full h-[2000px] p-4 border border-gray-300 rounded"
              placeholder="这是一个很长的textarea来测试滚动..."
            />
          </div>
        </div>
      </div>

      {/* 右侧预览区域 */}
      <div className="flex-1 flex flex-col border-l border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">预览区域</h2>
        </div>
        <div className="flex-1 overflow-y-auto bg-green-50">
          <div className="p-4">
            <div className="bg-white p-4 rounded border border-gray-300" style={{ minHeight: '2000px' }}>
              <h1>预览内容</h1>
              <p>这是第一段内容...</p>
              <p>这是第二段内容...</p>
              <p>这是第三段内容...</p>
              {/* 重复内容来测试滚动 */}
              {Array.from({ length: 50 }, (_, i) => (
                <div key={i} className="mb-4 p-2 bg-gray-100 rounded">
                  <h3>第 {i + 1} 个段落</h3>
                  <p>这是第 {i + 1} 个段落的内容，用来测试滚动功能是否正常工作。</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollTest;
