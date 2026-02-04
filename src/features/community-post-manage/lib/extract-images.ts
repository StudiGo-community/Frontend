import { JSONContent } from '@tiptap/react'
import { PostCreateForm } from '../model/post-create.schema'

// 이미지 URL만 추출해서 스키마에 맞게 배열로 변환
export const extractImagesUrl = (
  data: PostCreateForm
): PostCreateForm['images'] => {
  const jsonContent = JSON.parse(data.content)
  const images: PostCreateForm['images'] =
    jsonContent.content
      ?.filter((node: JSONContent) => node.type === 'image')
      .map((node: JSONContent, index: number) => ({
        url: node.attrs?.src,
        order: index + 1,
      })) || []

  return images
}
