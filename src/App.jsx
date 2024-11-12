import { useEffect, useState } from 'react';

import './App.css';
import Description from './components/Description/Description';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notifications/Notifications';

const DefaultFeedbackData = {
	good: 0,
	neutral: 0,
	bad: 0,
};

// const getLocalStorageFeedbackData = () => {
// 	return localStorage.getItem('feedback-data') !== null
// 		? JSON.parse(localStorage.getItem('feedback-data'))
// 		: DefaultFeedbackData;
// };

const getLocalStorageFeedbackData = () => {
	try {
		const data = localStorage.getItem('feedback-data');
		return data !== null ? JSON.parse(data) : DefaultFeedbackData;
	} catch (error) {
		console.error("Error parsing feedback data from localStorage:", error);
		return DefaultFeedbackData;
	}
};

function App() {
	const [feedback, setFeedback] = useState(getLocalStorageFeedbackData);

	useEffect(() => {
		localStorage.setItem('feedback-data', JSON.stringify(feedback));
	}, [feedback]);

	const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
	const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

	// const updateFeedback = (feedbackType) => {
	// 	if (feedbackType === 'reset') {
	// 		setFeedback(DefaultFeedbackData);
	// 	} else {
	// 		setFeedback({
	// 			...feedback,
	// 			[feedbackType]: feedback[feedbackType] + 1,
	// 		});
	// 	}
	// };

	const updateFeedback = (feedbackType) => {
  switch (feedbackType) {
    case 'reset':
      setFeedback(DefaultFeedbackData);
      break;
    case 'good':
    case 'neutral':
    case 'bad':
      setFeedback({
        ...feedback,
        [feedbackType]: feedback[feedbackType] + 1,
      });
      break;
    default:
      console.warn(`Unknown feedback type: ${feedbackType}`);
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