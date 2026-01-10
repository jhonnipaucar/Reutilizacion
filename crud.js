let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let editandoIndex = -1;

// Mostrar al cargar
document.addEventListener("DOMContentLoaded", listarClientes);

function crearCliente() {
    const id = document.getElementById("id").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const fecha = document.getElementById("fecha").value.trim();

    if (!id || !nombre || !apellido || !fecha) {
        alert("Complete todos los campos");
        return;
    }

    if (editandoIndex !== -1) {
        // Actualizar cliente existente
        clientes[editandoIndex] = new Cliente(id, nombre, apellido, fecha);
        editandoIndex = -1;
        document.querySelector("button[onclick='crearCliente()']").textContent = "Crear";
    } else {
        // Crear nuevo cliente
        const cliente = new Cliente(id, nombre, apellido, fecha);
        clientes.push(cliente);
    }

    localStorage.setItem("clientes", JSON.stringify(clientes));

    limpiarFormulario();
    listarClientes();
}

function listarClientes() {
    const tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";

    if (clientes.length === 0) {
        tabla.innerHTML = `<tr><td colspan="5" style="text-align:center;">No hay clientes registrados</td></tr>`;
        return;
    }

    clientes.forEach((c, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${escapeHtml(c.id)}</td>
            <td>${escapeHtml(c.nombre)}</td>
            <td>${escapeHtml(c.apellido)}</td>
            <td>${escapeHtml(c.fechaNacimiento)}</td>
            <td>
                <button onclick="editarCliente(${index})">Editar</button>
                <button onclick="eliminarCliente(${index})" style="background-color: #ff6b6b;">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

function editarCliente(index) {
    const cliente = clientes[index];
    document.getElementById("id").value = cliente.id;
    document.getElementById("nombre").value = cliente.nombre;
    document.getElementById("apellido").value = cliente.apellido;
    document.getElementById("fecha").value = cliente.fechaNacimiento;
    editandoIndex = index;
    document.querySelector("button[onclick='crearCliente()']").textContent = "Actualizar";
}

function eliminarCliente(index) {
    if (confirm("¿Está seguro de que desea eliminar este cliente?")) {
        clientes.splice(index, 1);
        localStorage.setItem("clientes", JSON.stringify(clientes));
        limpiarFormulario();
        editandoIndex = -1;
        document.querySelector("button[onclick='crearCliente()']").textContent = "Crear";
        listarClientes();
    }
}

function escapeHtml(text) {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}

function limpiarFormulario() {
    document.getElementById("id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("fecha").value = "";
}