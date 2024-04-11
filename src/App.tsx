import { useEffect, useState } from "react";
import "./App.css";

const colors = ["red", "blue", "green", "gold", "black"];

function App() {
	const [inputValue, setInputValue] = useState<string | null>(null);
	const [unlocked, setUnlocked] = useState(false);
	const [colorCombination, setColorCombination] = useState<string[]>([]);
	const [showFinalCode, setShowFinalCode] = useState(false);
	const [gameIsLocked, setGameIsLocked] = useState(false);
	const [count, setCount] = useState(5);

	console.log("env:", import.meta.env.VITE_CODE);

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		if (inputValue === import.meta.env.VITE_CODE) {
			setUnlocked(true);
		} else {
			lockGame();
		}
	}

	function handleColorClick(color: string) {
		setColorCombination([...colorCombination, color]);
	}

	function lockGame() {
		setGameIsLocked(true);

		setTimeout(() => {
			setGameIsLocked(false);
		}, 5000);

		const interval = setInterval(() => {
			setCount(prev => prev - 1);
		}, 1000);

		if (count <= 0) {
			clearInterval(interval);
			setCount(5);
		}
	}

	useEffect(() => {
		if (
			colorCombination[0] === import.meta.env.VITE_COLOR_ONE &&
			colorCombination[1] === import.meta.env.VITE_COLOR_TWO &&
			colorCombination[2] === import.meta.env.VITE_COLOR_THREE &&
			colorCombination[3] === import.meta.env.VITE_COLOR_FOUR
		) {
			setShowFinalCode(true);
		}
		console.log("combination", colorCombination);
	}, [colorCombination]);

	return (
		<div className="game">
			{gameIsLocked && <h2 className="counter">{count}</h2>}
			{!unlocked && !gameIsLocked && (
				<form onSubmit={(event: React.FormEvent) => handleSubmit(event)}>
					<label>
						{" "}
						Enter your code:
						<input
							type="text"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								setInputValue(event?.target.value)
							}
						/>
					</label>
					<button type="submit">Try your luck</button>
				</form>
			)}
			{unlocked && !showFinalCode && (
				<div className="color-section-wrapper">
					<h2>
						Hope you payed attention to the order of the colored envelopes.
						Enter the right color sequence:
					</h2>
					<div className="color-boxes">
						{colors.map(color => (
							<button
								className="color-box"
								style={{ backgroundColor: color }}
								key={color}
								onClick={() => handleColorClick(color)}
							></button>
						))}
					</div>
					<button onClick={() => setColorCombination([])}>Reset</button>
				</div>
			)}
			{showFinalCode && (
				<>
					<div>
						<h3>You made it to the last part! </h3>
						<p>
							Unlock the last treasure chest before someone else does. Need the
							code? Find it..{" "}
						</p>
						<p className="hint">
							Hint: I'm close yet far away. In pure eyesight I am visible, but
							only during the night, not the day. A toggle would do, but today I
							am not so generous 🔦
						</p>
					</div>
					<span className="snow">{import.meta.env.VITE_LAST_CODE}</span>
				</>
			)}
		</div>
	);
}

export default App;
