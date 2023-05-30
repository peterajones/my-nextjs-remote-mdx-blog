import React from 'react';
import { getPostsMeta, getPostByName } from '../../../../lib/posts';
import { notFound } from 'next/navigation';
import getFormattedDate from '../../../../lib/getFormattedDate';
import 'highlight.js/styles/tomorrow-night-blue.css';
import Link from 'next/link';

export const revalidate = process.env.REVALIDATE_TIME;

type PropsType = {
	params: {
		postId: string;
	};
};

export async function generateStaticParams() {
	const posts = await getPostsMeta(); // deduped!

	if (!posts) {
		return [];
	}

	return posts.map(post => ({
		postId: post.id
	}));
}

export async function generateMetadata({ params: { postId } }: PropsType) {
	const post = await getPostByName(`${postId}.mdx`); // deduped!

	if (!post) {
		return {
			title: 'Post Not Found'
		};
	}

	return {
		title: post.meta.title
	};
}

export default async function Post({ params: { postId } }: PropsType) {
	const post = await getPostByName(`${postId}.mdx`); // deduped!

	if (!post) notFound();

	const { meta, content } = post;

	const pubDate = getFormattedDate(meta.date);

	const tags = meta.tags.map((tag, i) => (
		<Link key={i} href={`/tags/${tag}`}>
			{tag}
		</Link>
	));

	return (
		<>
			<h2 className='text-3xl mt-4 mb-0'>{meta.title}</h2>
			<p className='mt-0 text-sm text-white/1'>{pubDate}</p>
			<article>{content}</article>
			<section>
				<h3>Related:</h3>
				<div className='flex flex-grow gap-4'>{tags}</div>
			</section>
			<p className='mb-10'>
				⬅️ <Link href='/'>Back To Home</Link>
			</p>
		</>
	);
}
