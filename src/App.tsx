import { useEffect, useState } from "react";
import "./App.css";

const colors = ["red", "blue", "green", "yellow", "black"];

function App() {
	const [inputValue, setInputValue] = useState<string | null>(null);
	const [unlocked, setUnlocked] = useState(false);
	const [colorCombination, setColorCombination] = useState<string[]>([]);
	const [showFinalCode, setShowFinalCode] = useState(false);
	const [gameIsLocked, setGameIsLocked] = useState(false);
	const [count, setCount] = useState(5);

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		if (inputValue === "kruso") {
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
			colorCombination[0] === "red" &&
			colorCombination[1] === "blue" &&
			colorCombination[2] === "yellow"
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
						Hope you payed attention to the order of the colored clues. Enter
						the right color sequence:
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
					<button onClick={() => setColorCombination([])}>Start over</button>
				</div>
			)}
			{showFinalCode && <div>You made it!</div>}
		</div>
	);
}

export default App;
