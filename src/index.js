window.onload = () => {
	const startButton = document.querySelector('.play');
	const initContainer = document.getElementById('init-container');

	startButton.onclick = (e) => {
		initContainer.classList.add('hidden');

		Game.init();
	};
};
