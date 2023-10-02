import React, { useEffect } from 'react';
import { testApi } from '../../api/userApi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Toggle from '../../components/Toggle';
import Range from '../../components/Range';
import Details from '../../components/Details';
import {
	CrossSquareIcon,
	CrossCircleIcon,
	CheckSquareIcon,
	CheckCircleIcon,
	MessageIcon,
	AlertTriangleIcon,
	AlertSquareIcon,
	AlertHexagonIcon,
	AlertCircleIcon,
} from '../../components/Icons';
import showNotification from '../../components/Notification/showNotification';
import TextArea from '../../components/TextArea';

const LOREM_100 =
	'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto placeat modi autem, minima incidunt natus, velit accusamus cum a beatae, adipisci dolorem blanditiis. Nesciunt nemo perspiciatis doloremque qui autem esse expedita voluptatum possimus reprehenderit? A, enim natus, facilis animi quae dolore sequi maxime fuga nisi tempora ullam aspernatur aut dolor ducimus assumenda quam porro quas voluptatum iusto. Tenetur facere nam eos libero fugiat fugit laboriosam illo, pariatur architecto! Velit nobis et sed soluta doloremque explicabo aut labore repellendus minima deserunt atque molestiae praesentium tempore, itaque cumque voluptas sint! Ut nulla atque enim nostrum nesciunt repudiandae at minus alias impedit accusantium.';

const LayoutTestPage: React.FC = () => {
	useEffect(() => {
		testApi()
			.then((response) => console.log('test api', response))
			.catch((error) => console.log('test api', error));
	});

	return (
		<div>
			<h1>Header 1</h1>
			<h2>Header 2</h2>
			<h3>Header 3</h3>
			<h4>Header 4</h4>
			<h5>Header 5</h5>
			<h6>Header 6</h6>
			<hr />

			<p>Sample paragraph</p>
			<p>{LOREM_100}</p>
			<p>
				Text with <mark>highlighted</mark> phrase
			</p>
			<hr />

			<div className="highlight">Just div with highlight</div>
			<div className="highlight">{LOREM_100}</div>
			<hr />

			<Button>Button</Button>
			<Button>Button 2</Button>
			<Button>Button 3</Button>
			<Button disabled>disabled</Button>
			<hr />

			<Button pressable>Pressable</Button>
			<Button pressable>Pressable 2</Button>
			<Button pressable>Pressable 3</Button>
			<Button pressable disabled>
				disabled
			</Button>
			<hr />

			<Input label="Input" value="value" setValue={() => {}} />
			<Input label="lorem 100" value={LOREM_100} setValue={() => {}} />
			<Input label="Input" value="" placeholder="placeholder ..." setValue={() => {}} />
			<Input label="disabled" value="disabled" setValue={() => {}} disabled />
			<hr />

			<TextArea placeholder="placeholder ..." />
			<hr />
			<TextArea placeholder="disabled ..." disabled />
			<hr />
			<TextArea value="disabled ..." disabled />
			<hr />

			<Toggle value={true} onChange={() => {}} />
			<Toggle value={false} onChange={() => {}} />
			<Toggle value={true} onChange={() => {}} disabled />
			<Toggle value={false} onChange={() => {}} disabled />
			<hr />

			<Range min={0} max={10} defaultValue={3} />
			<Range min={0} max={10} defaultValue={3} disabled />
			<hr />

			<Details title="Details">
				<p>Content</p>
				<p>{LOREM_100}</p>
			</Details>
			<Details title="Empty" />
			<hr />

			<div>
				icons
				<CrossSquareIcon />
				<CrossCircleIcon />
				<CheckSquareIcon />
				<CheckCircleIcon />
				<MessageIcon />
				<AlertTriangleIcon />
				<AlertSquareIcon />
				<AlertHexagonIcon />
				<AlertCircleIcon />
			</div>
			<hr />

			<div>
				Notifications
				<Button
					onClick={() => {
						showNotification({ title: 'Title', type: 'error', description: 'Description' }, 5000);
					}}
				>
					Error
				</Button>
				<Button
					onClick={() => {
						showNotification({ title: 'Title', type: 'info', description: 'Description' }, 5000);
					}}
				>
					Info
				</Button>
				<Button
					onClick={() => {
						showNotification({ title: 'Title', type: 'warn', description: 'Description' }, 5000);
					}}
				>
					Warn
				</Button>
				<Button
					onClick={() => {
						showNotification({ title: 'Title', type: 'success', description: 'Description' }, 5000);
					}}
				>
					Success
				</Button>
			</div>
			<hr />
		</div>
	);
};

export default LayoutTestPage;
