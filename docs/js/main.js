const DOMContentLoaded = awaitDOMContentLoaded();
initApp();

const TITLE = 'CSS day - data visualization';

async function initApp() {
	setErrorState(false);
	setLoadingState(true);
	const splash = new Promise((resolve) => setTimeout(resolve, 3600));

	try {
		const countries = fetchCountries();
		const data = await fetchData();
		if (!data) throw new Error('No data');

		await DOMContentLoaded;

		initTimeline(data);
		initChart(data);
		initSections(data, await countries);
		initFireworks();
		await splash;
	} catch (e) {
		setErrorState(true);
		console.error(e);
	}

	setLoadingState(false);
}

function setLoadingState(enable = false) {
	document.body.classList.toggle('loading', enable);
}

function setErrorState(enable = false) {
	document.body.classList.toggle('error', enable);
	const header = document.querySelector('main');
	if (enable && !header.querySelector('main > button')) {
		const button = document.createElement('button');
		button.textContent = 'Retry';
		button.addEventListener('click', initApp);
		header.prepend(button);
	} else if (!enable) {
		const button = header.querySelector('button');
		if (button) button.remove();
	}
}

async function awaitDOMContentLoaded() {
	return new Promise((resolve) => {
		document.addEventListener('DOMContentLoaded', resolve);
	});
}
