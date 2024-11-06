import styles from './Options.module.css';

const Button = ({ btnType = 'button', handleClick, children }) => {
	return (
		<button
			onClick={() => handleClick(children.toLowerCase())}
			type={btnType}
			aria-label={`button ${children}`}
		>
			{children}
		</button>
	);
};

const Options = ({ updateFeedback, isVisible }) => {
	return (
		<div className={styles.container}>
			<Button handleClick={updateFeedback}>Good</Button>
			<Button handleClick={updateFeedback}>Neutral</Button>
			<Button handleClick={updateFeedback}>Bad</Button>
			{isVisible && <Button handleClick={updateFeedback}>Reset</Button>}
		</div>
	);
};

export default Options;