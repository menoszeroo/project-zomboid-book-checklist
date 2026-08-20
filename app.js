// Importaciones 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 2. Config FireBase
const firebaseConfig = {
  apiKey: "AIzaSyDZ71SQDhqRWuzPb1vlVEavdDJEiIct7b4",
  authDomain: "check-list-project-zombo-cb010.firebaseapp.com",
  projectId: "check-list-project-zombo-cb010",
  storageBucket: "check-list-project-zombo-cb010.firebasestorage.app",
  messagingSenderId: "566165060633",
  appId: "1:566165060633:web:2c209405fca3bc4ea4fe88",
  measurementId: "G-ZS32BHRTXZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const progresoRef = doc(db, "coleccion", "estado_ediciones");

// Lista
const catalogo = [
    { titulo: "Agricultura", imagen: "Book1.png" },
    { titulo: "Puntería", imagen: "Book2.png" },
    { titulo: "Cuidado de animales", imagen: "Book3.png" },
    { titulo: "Carnicería", imagen: "Book4.png" },
    { titulo: "Carpintería", imagen: "Book5.png" },
    { titulo: "Tallar", imagen: "Book6.png" },
    { titulo: "Cocina", imagen: "Book7.png" },
    { titulo: "Electrónica", imagen: "Book8.png" },
    { titulo: "Primeros auxilios", imagen: "Book9.png" },
    { titulo: "Pesca", imagen: "Book10.png" },
    { titulo: "Rebuscar", imagen: "Book11.png" },
    { titulo: "Cristalería", imagen: "Book12.png" },
    { titulo: "Labrar piedra", imagen: "Book13.png" },
    { titulo: "Mantenimiento", imagen: "Book14.png" },
    { titulo: "Albañilería", imagen: "Book15.png" },
    { titulo: "Mecánica", imagen: "Book16.png" },
    { titulo: "Herrería", imagen: "Book17.png" },
    { titulo: "Recarga", imagen: "Book18.png" },
    { titulo: "Sastrería", imagen: "Book19.png" },
    { titulo: "Rastreo", imagen: "Book20.png" },
    { titulo: "Trampas", imagen: "Book21.png" },
    { titulo: "Metalistería", imagen: "Book22.png" },
    { titulo: "Alfarería", imagen: "Book23.png" },
    { titulo: "Hoja larga", imagen: "Book24.png" }
];
const MAX_EDICIONES = 5;

const ul = document.getElementById('listaLibros');

catalogo.sort((a, b) => a.titulo.localeCompare(b.titulo));

catalogo.forEach((libro, indexLibro) => {
    const li = document.createElement('li');
    
    let checkboxesHTML = '';
    for(let i = 1; i <= MAX_EDICIONES; i++) {
        checkboxesHTML += `
            <label class="edicion-label">
                Vol. ${i}
                <input type="checkbox" id="check-${indexLibro}-${i}">
            </label>
        `;
    }

    li.innerHTML = `
        <div class="libro-info">
            <img src="${libro.imagen}" class="libro-icono" alt="Icono">
            <span class="titulo-libro">${libro.titulo}</span>
        </div>
        <div class="ediciones-container">
            ${checkboxesHTML}
        </div>
    `;
    ul.appendChild(li);

    for(let i = 1; i <= MAX_EDICIONES; i++) {
        const checkbox = document.getElementById(`check-${indexLibro}-${i}`);
        
        checkbox.addEventListener('change', async (evento) => {
            const estaMarcado = evento.target.checked;
            const claveUnica = `${libro.titulo}_ed${i}`;
            
            await setDoc(progresoRef, {
                [claveUnica]: estaMarcado 
            }, { merge: true });
        });
    }
});

// Sincronizacion
onSnapshot(progresoRef, (docSnap) => {
    if (docSnap.exists()) {
        const estadoActual = docSnap.data();
        
        catalogo.forEach((libro, indexLibro) => {
            for(let i = 1; i <= MAX_EDICIONES; i++) {
                const checkbox = document.getElementById(`check-${indexLibro}-${i}`);
                const claveUnica = `${libro.titulo}_ed${i}`;
                
                checkbox.checked = estadoActual[claveUnica] || false;
            }
        });
    }
});
