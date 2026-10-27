import { useEffect } from 'react'

export default function usePageMeta({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} | لومیلا` : 'لومیلا | استودیو خلاقیت و رشد دیجیتال'

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])
}
