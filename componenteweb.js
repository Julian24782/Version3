class MyWebComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 10px;
                }
                button {
                    margin-right: 5px;
                }
            </style>
            <div>
                <button id="listar">Listar</button>
                <button id="crear">Crear</button>
                <button id="editar">Editar</button>
                <button id="eliminar">Eliminar</button>
                <button id="otros">...</button>
                <table id="dataTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        `;

        this.dataTable = this.shadowRoot.querySelector('#dataTable tbody');

        this.shadowRoot.querySelector('#listar').addEventListener('click', this.listar.bind(this));
        this.shadowRoot.querySelector('#crear').addEventListener('click', this.crear.bind(this));
        this.shadowRoot.querySelector('#editar').addEventListener('click', this.editar.bind(this));
        this.shadowRoot.querySelector('#eliminar').addEventListener('click', this.eliminar.bind(this));
    }

    async listar() {
        const response = await fetch('/api/accounts');
        const data = await response.json();
        this.renderTable(data);
    }

    async crear() {
        const username = prompt('Ingrese Username:');
        const saldo = parseFloat(prompt('Ingrese Saldo:'));
        const response = await fetch('/api/accounts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, saldo })
        });
        const newData = await response.json();
        console.log('Nuevo objeto creado:', newData);
        this.listar();
    }

    async editar() {
        const id = parseInt(prompt('Ingrese el ID del objeto a editar:'));
        const username = prompt('Ingrese nuevo Username:');
        const saldo = parseFloat(prompt('Ingrese nuevo Saldo:'));
        const response = await fetch(`/api/accounts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, saldo })
        });
        const updatedData = await response.json();
        console.log('Objeto actualizado:', updatedData);
        this.listar();
    }

    async eliminar() {
        const id = parseInt(prompt('Ingrese el ID del objeto a eliminar:'));
        const response = await fetch(`/api/accounts/${id}`, {
            method: 'DELETE'
        });
        const deletedData = await response.json();
        console.log('Objeto eliminado:', deletedData);
        this.listar();
    }

    renderTable(data) {
        this.dataTable.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.username}</td>
                <td>${item.saldo}</td>
            `;
            this.dataTable.appendChild(row);
        });
    }
}

customElements.define('my-webcomponent', MyWebComponent);
