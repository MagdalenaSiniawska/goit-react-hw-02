import { useEffect, useState } from 'react';

import './App.css';
import Description from './components/Description/Description';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notifications/Notifications';

const DefaultFedbackData = {
	good: 0,
	neutral: 0,
	bad: 0,
};

const getLocalStorageFeedbackData = () => {
	return localStorage.getItem('feedback-data') !== null
		? JSON.parse(localStorage.getItem('feedback-data'))
		: DefaultFedbackData;
};

function App() {
	const [feedback, setFeedback] = useState(getLocalStorageFeedbackData);

	useEffect(() => {
		localStorage.setItem('feedback-data', JSON.stringify(feedback));
	}, [feedback]);

	const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
	const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

	const updateFeedback = (feedbackType) => {
		if (feedbackType === 'reset') {
			setFeedback(DefaultFedbackData);
		} else {
			setFeedback({
				...feedback,
				[feedbackType]: feedback[feedbackType] + 1,
			});
		}
	};

	return (
		<>
			<Description />
			<Options updateFeedback={updateFeedback} isVisible={!!totalFeedback} />
			{totalFeedback ? (
				<Feedback
					feedback={feedback}
					totalFeedback={totalFeedback}
					positiveFeedback={positiveFeedback}
				/>
			) : (
				<Notification />
			)}
		</>
	);
}

export default App;