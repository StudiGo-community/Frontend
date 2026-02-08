'use client'

import PostFilter from '@/features/mypage/ui/PostFilter'
import MyPost from '@/features/mypage/ui/MyPost'
import MyComment from '@/features/mypage/ui/MyComment'
import MyLike from '@/features/mypage/ui/MyLike'
import MyPageActionMenu from '@/features/mypage/ui/MyPageActionMenu'
import { Pagination } from '@/shared/ui/pagination-je'
import Profile from '@/features/mypage/ui/Profile'
import TimeLine from '@/features/mypage/ui/TimeLine'

import { useMyPageController } from '@/features/mypage/hook/useMyPageController'

const MyPage = () => {
  const {
    tab,
    page,
    selectedBoard,
    search,
    sortBy,
    checkedMap,

    user,
    profile,
    timeline,

    filteredPosts,
    filteredComments,
    filteredLikes,

    totalPages,
    actionLabel,
    isCurrentTabLoading,

    setPage,
    handleChangeTab,
    handleChangeBoard,
    handleChangeSearch,
    handleChangeSortBy,
    handleToggleOne,
    handleClickAction,
  } = useMyPageController()

  return (
    <div className="bg-brand-white min-h-screen">
      <section className="pt-10">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5">
          <div className="flex w-full flex-col items-center">
            <Profile profile={profile} />

            <div className="border-brand-gray-200 w-full pb-10">
              <div className="mx-auto max-w-6xl px-5">
                <TimeLine items={timeline} goHref="/community" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-brand-black text-2xl font-black">마이페이지</h1>
          <MyPageActionMenu
            label={actionLabel}
            onClickAction={handleClickAction}
          />
        </div>

        <div className="border-brand-gray-200 relative mt-6 border-b">
          <div className="flex items-end justify-between">
            <PostFilter
              tab={tab}
              onChangeTab={handleChangeTab}
              selectedBoard={selectedBoard}
              onChangeBoard={handleChangeBoard}
              search={search}
              onChangeSearch={handleChangeSearch}
              sortBy={sortBy}
              onChangeSortBy={handleChangeSortBy}
            />
          </div>
        </div>

        <div className="mt-2">
          {tab === 'post' &&
            (isCurrentTabLoading ? (
              <div className="py-14 text-center">
                <p className="text-brand-gray-500 text-sm">Loading...</p>
              </div>
            ) : (
              <MyPost
                items={filteredPosts}
                sortBy={sortBy}
                checkedMap={checkedMap}
                onToggleOne={handleToggleOne}
              />
            ))}

          {tab === 'comment' &&
            (isCurrentTabLoading ? (
              <div className="py-14 text-center">
                <p className="text-brand-gray-500 text-sm">Loading...</p>
              </div>
            ) : (
              <MyComment
                items={filteredComments}
                sortBy={sortBy}
                checkedMap={checkedMap}
                onToggleOne={handleToggleOne}
                profileImageSrc={user?.profileImageUrl ?? null}
              />
            ))}

          {tab === 'like' &&
            (isCurrentTabLoading ? (
              <div className="py-14 text-center">
                <p className="text-brand-gray-500 text-sm">Loading...</p>
              </div>
            ) : (
              <MyLike
                items={filteredLikes}
                sortBy={sortBy}
                checkedMap={checkedMap}
                onToggleOne={handleToggleOne}
              />
            ))}
        </div>

        <div className="border-brand-gray-200 border-b" />
        <div className="my-14 flex justify-center">
          <Pagination
            page={page}
            totalPages={totalPages}
            onChangePage={setPage}
          />
        </div>
      </section>
    </div>
  )
}

export default MyPage
