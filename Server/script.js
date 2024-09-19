let politicianData=[]
fetch('https://mahawiki.onrender.com/api/politicians')
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data=>{
        politicianData=data;
        renderData(politicianData)
    })
    .catch(err => console.error('Fetch error:', err));
    const renderData=(data)=>{
        const list=document.getElementById('pol');
        list.innerHTML=data.map(politician=>(
            politician.Party.map(party=>(
                `                    <div class="PartyDetails">
                <div class="PartyName">
                    <h1>Party:</h1><p class="Party">${party.Name}</p>
                </div>
                <div class="Leader">
                    <h1>Leader:</h1><p class="partyLeader" >${party.Leader}</p>
                </div> <div class="Leader">
                    <h1>Leader:</h1><p  >${party.Seats}</p>
                </div>
            </div>`

            )).join('')
        )).join('')
    }
    const search=document.getElementById('search')

    search.addEventListener('input', e => {
    const searchValue = e.target.value.toLowerCase();
    const listPol = document.getElementById('pol');
    const p = listPol.getElementsByClassName('partyLeader');
    const partyName=document.getElementsByClassName('Party')
            let found=false;
    for (let i = 0; i < p.length; i++) {
        console.log(p[i])
        const partyLeader = p[i].innerText.toLowerCase();
        const name=partyName[i].innerText.toLowerCase();
        if (partyLeader.toLowerCase().includes(searchValue)||name.toLowerCase().includes(searchValue)) {
            p[i].parentElement.parentElement.style.display = "";
            found=true; 
        }
        
        
        else {
            p[i].parentElement.parentElement.style.display = "none"; 
     
        }
      
    }
    if(!found && searchValue.trim() !=''){
            listPol.innerHTML=` <p>Search not found</p>`
        }

});