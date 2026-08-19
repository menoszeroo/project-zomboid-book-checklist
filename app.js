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
    { titulo: "Puntería", imagen: "book2.png" },
    { titulo: "Cuidado de animales", imagen: "book3.png" },
    { titulo: "Carnicería", imagen: "book4.png" },
    { titulo: "Carpintería", imagen: "book5.png" },
    { titulo: "Tallar", imagen: "book6.png" },
    { titulo: "Cocina", imagen: "book7.png" },
    { titulo: "Electrónica", imagen: "book8.png" },
    { titulo: "Primeros auxilios", imagen: "book9.png" },
    { titulo: "Pesca", imagen: "book10.png" },
    { titulo: "Rebuscar", imagen: "book11.png" },
    { titulo: "Cristalería", imagen: "book12.png" },
    { titulo: "Labrar piedra", imagen: "book13.png" },
    { titulo: "Mantenimiento", imagen: "book14.png" },
    { titulo: "Albañilería", imagen: "book15.png" },
    { titulo: "Mecánica", imagen: "book16.png" },
    { titulo: "Herrería", imagen: "book17.png" },
    { titulo: "Recarga", imagen: "book18.png" },
    { titulo: "Sastrería", imagen: "book19.png" },
    { titulo: "Rastreo", imagen: "book20.png" },
    { titulo: "Trampas", imagen: "book21.png" },
    { titulo: "Metalistería", imagen: "book22.png" },
    { titulo: "Alfarería", imagen: "book23.png" },
    { titulo: "Hoja larga", imagen: "book24.png" }
];
const MAX_EDICIONES = 5;

const ul = document.getElementById('listaLibros');

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