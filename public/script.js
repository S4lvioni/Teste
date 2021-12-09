let namesfront;
let nameString;
let password;
let nomes;
let id;

apagar = document.getElementById('apagar')

async function gerarLista() {
    let response = await fetch("http://localhost:3035/listarusuario", {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

    })
    let json = await response.json();
    namesfront = json
    console.log(namesfront)
}

gerarLista();


function listaTabela() {
    let tbody = document.getElementById('tbody');

    for (let i = 0; i < namesfront.length; i++) {
        let tr = tbody.insertRow();

        let td_name = tr.insertCell();

        td_name.innerText = namesfront[i].name

    }
}

setTimeout(function () {
    listaTabela();
}, 100);

async function apagarUsuario(id) {
    let response = await fetch("http://localhost:3035/apagarusuario", {
        method: 'POST',
        headers: {
            Accept: 'text/html',
            'Content-Type': 'text/html'
        },
        body: {
            id: id
        }
    })

}

apagar.addEventListener('click', function () {
    apagarUsuario(id);
})