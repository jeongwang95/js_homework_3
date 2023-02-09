const getData = async (year, round, type) => {
    let response = await axios.get(`https://ergast.com/api/f1/${year}/${round}/${type}Standings.json`)
    //console.log(response.data)
    return response.data
}

// inserts driver standings info into table
const driverStandings = (postion, first, last, nationality, sponsor, wins, points) => {
    const html = ` <tr>
                        <th scope="row">${postion}</th>
                        <td>${first} ${last}</td>
                        <td>${nationality}</td>
                        <td>${sponsor}</td>
                        <td>${wins}</td>
                        <td>${points}</td>
                    </tr>`;
    document.querySelector('.standings').insertAdjacentHTML('beforeend', html);
};


// inserts constructor standings info into table
const constructorStandings = (postion, name, nationality, wins, points) => {
    const html = ` <tr>
                        <th scope="row">${postion}</th>
                        <td>${name}</td>
                        <td>${nationality}</td>
                        <td>${wins}</td>
                        <td>${points}</td>
                    </tr>`;
    document.querySelector('.standings').insertAdjacentHTML('beforeend', html);
};

const form = document.querySelector('#testDataForm')
// execute function when the user submits the form
form.addEventListener('submit', async (event) => {
    event.preventDefault()

    document.querySelector('thead').innerHTML = '';
    document.querySelector('tbody').innerHTML = '';

    let year = event.target[0].value;
    let round = event.target[1].value;

    let ele = document.getElementsByName('standingsType');
    let type;
    for (i in ele) {
        if (ele[i].checked) {
            type = ele[i].value;
        }
    }

    const data = await getData(year,round,type);

    if (type == 'driver'){
        const html = ` <tr>
                            <th scope="col">Position</th>
                            <td scope="col">Name</td>
                            <td scope="col">Nationality</td>
                            <td scope="col">Sponsor</td>
                            <td scope="col">Wins</td>
                            <td scope="col">Points</td>
                        </tr>`;
        document.querySelector('.standings-header').insertAdjacentHTML('beforeend', html);

        const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        standings.forEach(element => driverStandings(element.position, element.Driver.givenName, element.Driver.familyName, element.Driver.nationality, element.Constructors[0].name, element.wins, element.points));
    } else {
        const html = ` <tr>
                            <th scope="col">Position</th>
                            <td scope="col">Name</td>
                            <td scope="col">Nationality</td>
                            <td scope="col">Wins</td>
                            <td scope="col">Points</td>
                        </tr>`;
        document.querySelector('.standings-header').insertAdjacentHTML('beforeend', html);

        const standings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        standings.forEach(element => constructorStandings(element.position, element.Constructor.name, element.Constructor.nationality, element.wins, element.points));
    }

})

form.addEventListener('reset', () => {
    document.querySelector('thead').innerHTML = '';
    document.querySelector('tbody').innerHTML = '';
})