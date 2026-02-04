import CommunityPost from '@/widgets/community-post/ui/CommunityPost'
import CommunityComments from '@/widgets/community-comments/ui/CommunityComments'
import { PostDetail } from '@/entities/post/model/post.schema'

const post: PostDetail = {
  id: 1,
  title: '테스트 제목',
  content:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum aperiam quibusdam rem sapiente recusandae rerum dolore itaque? Laborum tenetur rem ut debitis velit dicta vel sequi, fugit dolores accusamus quis! Assumenda, aperiam! Quod, facilis! Similique libero sequi ex nemo saepe ipsam voluptas, repudiandae asperiores excepturi reprehenderit quis. Reprehenderit eius exercitationem praesentium velit. Mollitia perspiciatis numquam enim cum obcaecati exercitationem tenetur! Similique aut iusto sit delectus cum, excepturi officia odit aspernatur ducimus illum pariatur tenetur consectetur distinctio quod in, animi eius asperiores et ea eaque. Tempora aperiam adipisci pariatur praesentium minus. Iure praesentium officiis vel laborum reiciendis cumque! Adipisci quia aperiam aliquam itaque accusantium accusamus similique sequi, nostrum modi a sed, saepe praesentium quisquam illo voluptates fugit soluta, recusandae repudiandae. Officia. Deserunt voluptatem totam molestias ipsa atque voluptates ex, delectus, corrupti deleniti commodi ea harum eius doloremque possimus rerum quibusdam similique laboriosam consectetur est praesentium. Obcaecati deserunt ipsa dolorem in. Aut!',
  category: 'FREE',
  thumbnailUrl: 'https://placehold.co/600x400',
  author: {
    id: 10,
    nickname: 'mju',
    profileImageUrl: '/images/community/profile4.jpg',
  },
  images: [
    {
      id: 101,
      imageUrl: '/images/community/thumbnail3.jpg',
      sortOrder: 1,
    },
  ],
  likeCount: 12,
  commentCount: 3,
  viewCount: 10,
  isLiked: true,
  createdAt: new Date('2026-01-12T16:00:00+09:00'),
  updatedAt: new Date('2026-01-12T16:10:00+09:00'),
  comments: [
    {
      id: 501,
      postId: 1,
      author: {
        id: 20,
        nickname: 'hana1',
        profileImageUrl: '/images/community/profile2.png',
      },
      content: '댓글 내용1입니다. @mju 태그가 포함될 수 있어요.',
      taggedNicknames: ['mju'],
      createdAt: new Date('2026-01-12T16:10:00+09:00'),
    },
    {
      id: 502,
      postId: 1,
      author: {
        id: 20,
        nickname: 'hana2',
        profileImageUrl: '/images/community/profile4.jpg',
      },
      content: '댓글 내용2입니다. @mju 태그가 포함 가능.',
      taggedNicknames: ['mju'],
      createdAt: new Date('2026-01-12T16:10:00+09:00'),
    },
    {
      id: 503,
      postId: 1,
      author: {
        id: 20,
        nickname: 'hana3',
        profileImageUrl: '/images/community/profile2.png',
      },
      content: '댓글 내용3입니다. @mju 태그가 포함.',
      taggedNicknames: ['mju'],
      createdAt: new Date('2026-01-12T16:10:00+09:00'),
    },
  ],
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  console.log(id)

  return (
    <>
      {/* 게시글 */}
      <CommunityPost post={post} />

      {/* 댓글 */}
      <CommunityComments comments={post.comments} />
    </>
  )
}
