import React from 'react'
import Image from 'next/image'

export default function MyPost() {
  return (
    <div className="flex items-center justify-between border-b border-gray-50 py-6">
      <div className="flex gap-4">
        <input type="checkbox" className="mt-1 h-4 w-4 rounded accent-black" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs font-bold">
            <div className="relative h-6 w-6 overflow-hidden rounded-full bg-gray-200">
              <Image src="/default-1.webp" alt="user" fill />
            </div>
            <span>국제요리사2</span>
            <span className="text-[10px] font-normal text-gray-300">
              2026.01.08 02:35
            </span>
          </div>
          <h3 className="text-[15px] font-bold text-gray-800">
            초티는 보이는게 다네님다... 어제 우승을 물들인..!
          </h3>
          <div className="flex gap-3 text-[11px] text-gray-400">
            <span>조회수 1024</span>
            <span>❤️ 337</span>
            <span>💬 84</span>
          </div>
        </div>
      </div>
      <div className="relative h-16 w-16 overflow-hidden rounded-lg">
        <Image
          src="/image_552d3c.jpg"
          alt="post"
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}
