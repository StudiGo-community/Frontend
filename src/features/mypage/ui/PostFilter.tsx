import React from 'react'

export default function PostFilter() {
  return (
    <div className="mb-4 flex flex-col border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex gap-8 text-[15px] font-bold text-gray-400">
          <button className="border-b-2 border-black pb-4 font-extrabold text-black">
            내 게시글
          </button>
          <button className="pb-4">내 댓글</button>
          <button className="pb-4">좋아요</button>
        </div>
        <div className="flex items-center gap-3 pb-4">
          <select className="bg-transparent text-xs text-gray-500 outline-none">
            <option>게시글을 선택해 주세요.</option>
          </select>
          <div className="relative">
            <input
              type="text"
              placeholder="검색어 입력"
              className="w-40 rounded-md border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
