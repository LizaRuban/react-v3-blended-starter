import { fetchPosts } from '@/lib/api';
import PostsClient from './Posts.client';
import { Post } from '@/types/post';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function PostsPage({ params }: Props) {
  const { slug } = await params;
  const userId = slug[0];

  const res: { posts: Post[]; totalCount: number } = await fetchPosts({
    searchText: '',
    page: 1,
    ...(userId !== 'All' && { userId }),
  });

  return <PostsClient userId={userId} initialData={res} />;
}
