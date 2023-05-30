import Link from 'next/link';
import getFormattedDate from '../../../lib/getFormattedDate';

type PropsType = {
	post: MetaType;
};

export default function ListItem({ post }: PropsType) {
	const { id, title, date } = post;
	const formattedDate = getFormattedDate(date);

	return (
		<li className='mt-4 text-2xl text-white/90'>
			<Link
				className='underline text-white/90 hover:text-white'
				href={`/posts/${id}`}
			>
				{title}
			</Link>
			<br />
			<p className='text-sm mt-1'>{formattedDate}</p>
		</li>
	);
}
