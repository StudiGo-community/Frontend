'use client'

import React, { useState, useMemo } from 'react'
import {
  CommunityBanner,
  CommunityFilters,
  PostCard,
} from '@/features/community/ui'
import { MOCK_POSTS, Post } from '@/features/mockData'
import { PaginationBar } from '@/shared/ui/index'

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('전체')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [sortBy, setSortBy] = useState<'popular' | 'latest'>('latest')

  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  const filteredAndSortedPosts = useMemo(() => {
    let filtered: Post[] = [...MOCK_POSTS]

    if (activeTab !== '전체') {
      filtered = filtered.filter((post) => post.category === activeTab)
    }

    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerQuery) ||
          post.author.nickname.toLowerCase().includes(lowerQuery)
      )
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'popular') {
        return sortOrder === 'desc' ? b.likes - a.likes : a.likes - b.likes
      }
      return sortOrder === 'desc' ? b.id - a.id : a.id - b.id
    })
  }, [activeTab, searchQuery, sortOrder, sortBy])

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    return filteredAndSortedPosts.slice(indexOfFirstPost, indexOfLastPost)
  }, [filteredAndSortedPosts, currentPage])

  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage)

  return (
    <main className="mx-auto max-w-300 space-y-6 px-4 py-10">
      <section id="community-banner" className="mb-16">
        <CommunityBanner />
      </section>

      <div className="space-y-6">
        <section>
          <h1 className="text-brand-black text-3xl font-black">게시판</h1>
        </section>

        <section id="community-navigation" className="mt-2">
          <CommunityFilters
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab)
              setCurrentPage(1)
            }}
            searchQuery={searchQuery}
            onSearchChange={(query) => {
              setSearchQuery(query)
              setCurrentPage(1)
            }}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            sortBy={sortBy}
            onSortByChange={setSortBy}
          />
        </section>

        <section id="community-post-list" className="-mt-5 flex flex-col">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-brand-gray-300 py-20 text-center">
              해당 카테고리에 게시글이 없습니다.
            </div>
          )}
        </section>
      </div>

      <section className="flex justify-center py-6">
        <PaginationBar
          page={currentPage}
          totalPages={totalPages > 0 ? totalPages : 1}
          onChangePage={setCurrentPage}
        />
      </section>

      <div className="fixed right-10 bottom-10">
        <button className="bg-brand-third hover:bg-opacity-90 rounded-full px-6 py-3 font-bold text-white shadow-lg transition-all">
          플로팅 버튼
        </button>
      </div>
    </main>
  )
}
