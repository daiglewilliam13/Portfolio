console.log('connected');

const findButton = document.getElementById('find-team');
const resWrap = document.getElementById('response-wrapper');
const boxScoreWrap = document.getElementById('box-score-wrapper');
const leaderWrap = document.getElementById('leader-wrapper');
const dateOptions = {
	day: '2-digit',
	weekday: 'short',
	year: '2-digit',
	month: 'short',
};
let team = document.getElementById('team-select');
let season = document.getElementById('season-select');
let tr, table, th, tabCell1, tabCell2, tabCell3, tabCell4, tabCell5;

const displayGames = async (e) => {
	e.preventDefault();
	resWrap.style.display = 'block';
	resWrap.innerHTML = "<div class='loader'>Loading...</div>";
	let teamName = team.options[team.selectedIndex].text;
	const gameOptions = {
		method: 'POST',
		url: 'https://www.daigleportfolio.me/samples/basketball/games',
		data: { season: `${season.value}`, team: `${team.value}` },
	};
	let gamesArr = await axios
		.request(gameOptions)
		.then(function (response) {
			let foundGames = response.data.api.games.filter((el) => el.seasonYear == season.value);
			return foundGames;
		})
		.catch(function (error) {
			console.error(error);
		});
	const colHeaders = ['VS', 'DATE', 'OUTCOME'];
	table = document.createElement('table');
	createColHeaders(colHeaders);
	gamesArr.forEach((game) => {
		//get data and create table--
		let homeScore = game.hTeam.score.points;
		let awayScore = game.vTeam.score.points;
		let homeTeam = game.hTeam.fullName;
		let awayTeam = game.vTeam.fullName;
		let winner = homeScore > awayScore ? homeTeam : awayTeam;
		let date = new Date(game.startTimeUTC);
		tr = table.insertRow(-1);
		if (team.value == game.vTeam.teamId) {
			tabCell1 = tr.insertCell(-1);
			tabCell1.innerHTML = homeTeam;
		} else {
			tabCell1 = tr.insertCell(-1);
			tabCell1.innerHTML = awayTeam;
		}
		tabCell2 = tr.insertCell(-1);
		tabCell3 = tr.insertCell(-1);
		tabCell4 = tr.insertCell(-1);
		tabCell2.innerHTML = date.toLocaleDateString(dateOptions);
		tabCell3.innerHTML = winner == teamName ? 'WIN' : 'LOSS';
		tabCell4.innerHTML = game.gameId;
		tabCell4.classList.add('id');
	});
	resWrap.innerHTML = '';
	resWrap.appendChild(table);
	let rows = document.querySelectorAll('tbody tr');
	rows.forEach((row) => {
		row.addEventListener('click', setActive);
		row.addEventListener('click', getGameStats);
	});
};

const setActive = (el) => {
	let rows = document.querySelectorAll('tbody tr');
	rows.forEach((row) => {
		row.classList.remove('active');
	});
	el.target.parentNode.classList.add('active');
};
const getGameStats = async (e) => {
	const parent = e.target.parentNode;
	const id = parent.lastChild.innerText;
	const statOptions = {
		method: 'get',
		url: 'https://www.daigleportfolio.me/samples/basketball/games/stats/' + id,
	};
	let stats = await axios.request(statOptions).then((response) => {
		const gameDetails = response.data.details.api.game[0];
		const playerStats = response.data.stats.api.statistics;
		const teamId = {
			[gameDetails.hTeam.teamId]: gameDetails.hTeam.shortName,
			[gameDetails.vTeam.teamId]: gameDetails.vTeam.shortName,
		};
		displayGameDetails(gameDetails);
		displayPlayerStats(playerStats, teamId);
	});
};
const displayPlayerStats = (stats, teamId) => {
	table = document.createElement('table');
	const statWrap = document.getElementById('stat-table');
	let statNames = stats[0];
	const colHeaders = [];
	statWrap.innerHTML = '';
	for (key of Object.keys(statNames)) {
		colHeaders.unshift(key);
	}
	createColHeaders(colHeaders);
	stats.forEach((player) => {
		tr = table.insertRow(-1);
		for ([key,value] of Object.entries(player)) {
			tabCell1 = tr.insertCell(0);
			tabCell1.classList.add(`${key}`);
			tabCell1.setAttribute('colspan', '1');
			value ? (tabCell1.textContent = value) : (tabCell1.textContent = 'N/A');
		}
	}); 
	statWrap.appendChild(table);
	//change teamId to shortName
	const teams = Array.from(document.getElementsByClassName('teamId'));  
	teams.forEach((cell)=>{ 
		const name = getValue(cell, teamId);
		cell.textContent=name;
	})
	const players = Array.from(document.getElementsByClassName('playerId'));
	players.forEach((cell)=>{
		cell.addEventListener('click', replacePlayerName)
	})
};

const replacePlayerName = async (el) =>{
	const playerId = el.target.textContent;
	el.target.textContent = '';
	const loader = setInterval(()=>{
		el.target.textContent += '.';
	},200)
	const playerOptions = {
		method: 'GET',
		url: 'https://www.daigleportfolio.me/samples/basketball/players/' + playerId
	}
	const playerName = await axios.request(playerOptions).then((response)=>{
		const name = response.data.api.players[0].firstName + " " + response.data.api.players[0].lastName;
		return name;
	}).catch((err)=>{
		el.target.textContent=err;
	})
	clearInterval(loader);
	el.target.textContent = playerName;
	el.target.removeEventListener('click', replacePlayerName);
}

const getValue = (el, obj) =>{
	return obj[el.textContent];
} 
const displayGameDetails = (game) => {
	table = document.createElement('table');
	tr = table.insertRow(-1);
	const colHeaders = ['TEAM', 'Q1', 'Q2', 'Q3', 'Q4', 'TOTAL'];
	const vTeamData = [game.vTeam.nickname, ...game.vTeam.score.linescore, game.vTeam.score.points];
	const hTeamData = [game.hTeam.nickname, ...game.hTeam.score.linescore, game.hTeam.score.points];
	const leaders = [
		{ [game.vTeam.nickname]: game.vTeam.leaders },
		{ [game.hTeam.nickname]: game.hTeam.leaders },
	];

	const boxScore = [vTeamData, hTeamData];
	createColHeaders(colHeaders);
	boxScore.forEach((teams) => {
		tr = table.insertRow(-1);
		teams.forEach((teamData) => {
			tabCell1 = tr.insertCell(-1);
			tabCell1.innerHTML = teamData;
		});
	});
	boxScoreWrap.innerHTML = '';
	boxScoreWrap.appendChild(table);
	displayLeaders(leaders);
};

const createColHeaders = (colHeaders) => {
	tr = table.insertRow(-1);
	colHeaders.forEach((col) => {
		th = document.createElement('th');
		th.innerHTML = col;
		tr.appendChild(th);
	});
};

const getStat = (player) => {
	for (const key of Object.keys(player)) {
		if (key != 'name' && key != 'playerId') return key;
	}
};

const getCellId = (stat, index) => {
	const team = {
		0: 'v-team-',
		1: 'h-team-',
	};
	return team[index] + stat;
};

const displayLeaders = (leaders) => {
	//sorry
	let playerNames = Array.from(document.getElementById('player-name-display').childNodes);
	playerNames.forEach((el) => {
		el.innerHTML = '';
	});
	let vTeam = Object.keys(leaders[0])[0];
	let hTeam = Object.keys(leaders[1])[0];
	const vHeader = document.getElementById('v-team');
	const hHeader = document.getElementById('h-team');
	vHeader.innerText = vTeam;
	hHeader.innerText = hTeam;
	leaders.forEach((team, index) => {
		let currentTeam = Object.values(team)[0];
		for (const player of currentTeam) {
			let stat = getStat(player);
			let cellLoc = getCellId(stat, index);
			let cell = document.getElementById(cellLoc);
			cell.innerHTML += player.name + ': ' + player[stat] + '<br>';
		}
	});
};

findButton.addEventListener('click', displayGames);