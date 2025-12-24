/* ==========================================================
   MODIFICACIONES Y CORRECCIONES:
   1. Se mejoró la selección de botones usando IDs para evitar conflictos.
   2. Se añadió un 'console.log' para depurar la apertura del modal.
   3. Se mantuvo la lógica de carga dinámica desde la base de datos.
   4. Se añadió una validación para cerrar el modal si se hace clic fuera de él.
   ========================================================== */

let photosData = {
    inicio: [],
    favoritos: [],
    albumes: [],
    compartido: [],
    recientes: [],
    papelera: [],
    'nueva-coleccion': []
};

const sectionTitles = {
    inicio: 'Mis Fotos',
    favoritos: 'Mis Favoritos',
    albumes: 'Mis Álbumes',
    compartido: 'Compartido Conmigo',
    recientes: 'Fotos Recientes',
    papelera: 'Papelera',
    'nueva-coleccion': 'Nueva Colección'
};

const sectionMap = {
    'Inicio': 'inicio',
    'Favoritos': 'favoritos',
    'Álbumes': 'albumes',
    'Compartido': 'compartido',
    'Recientes': 'recientes',
    'Papelera': 'papelera',
    'Nueva colección': 'nueva-coleccion'
};

// --- FUNCIONES DE CARGA ---

async function cargarFotosDesdeBD() {
    try {
        const response = await fetch('obtener_fotos.php');
        const fotosReales = await response.json();
        
        photosData.inicio = fotosReales.map(f => ({
            img: f.ruta,
            title: f.titulo,
            date: f.fecha
        }));

        renderPhotos('inicio');
    } catch (error) {
        console.error('Error al cargar fotos:', error);
    }
}

// --- FUNCIONES DEL MODAL ---

function openUploadModal() {
    const uploadOverlay = document.getElementById("uploadOverlay");
    if (uploadOverlay) {
        console.log("Abriendo modal..."); // Mensaje de control en consola
        uploadOverlay.classList.add("show");
    } else {
        console.error("No se encontró el elemento #uploadOverlay");
    }
}

function closeUploadModal() {
    const uploadOverlay = document.getElementById("uploadOverlay");
    if (uploadOverlay) {
        uploadOverlay.classList.remove("show");
    }
}

// Escuchador de mensajes desde el iframe (subir.html)
window.addEventListener("message", (event) => {
    if (event.data === "closeUpload") {
        closeUploadModal();
    }
    if (event.data === "refreshGallery") {
        closeUploadModal();
        cargarFotosDesdeBD(); 
    }
});

// --- RENDERIZADO ---

function renderPhotos(section) {
    const photoGrid = document.querySelector('.photo-grid');
    const pagination = document.querySelector('.pagination');
    const sectionTitle = document.querySelector('.section-header h2');
    
    if (!photoGrid) return;

    sectionTitle.textContent = sectionTitles[section];
    const photos = photosData[section];
    
    if (!photos || photos.length === 0) {
        photoGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #999;">
                <svg width="80" height="80" fill="currentColor" viewBox="0 0 24 24" style="margin-bottom: 20px; color: #ddd;">
                    <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 17l3.5-4.5 2.5 3.01L14.5 11l4.5 6H5z"/>
                </svg>
                <h3>No hay fotos aquí</h3>
                <p>${section === 'nueva-coleccion' ? 'Crea tu primera colección' : 'Aún no tienes fotos'}</p>
            </div>
        `;
        if (pagination) pagination.style.display = 'none';
        return;
    }
    
    if (pagination) pagination.style.display = 'flex';
    
    photoGrid.innerHTML = photos.map(photo => `
        <div class="photo-card">
            <div class="photo-wrapper">
                <img src="${photo.img}" alt="${photo.title}">
                <div class="photo-badge">HD</div>
            </div>
            <div class="photo-info">
                <div class="photo-title">${photo.title}</div>
                <div class="photo-date">${photo.date}</div>
            </div>
        </div>
    `).join('');

    const paginationInfo = document.querySelector('.pagination-info');
    if (paginationInfo) {
        paginationInfo.textContent = `Mostrando ${photos.length} de ${photos.length} fotos`;
    }
}

// --- EVENTOS AL CARGAR LA PÁGINA ---

document.addEventListener('DOMContentLoaded', () => {
    cargarFotosDesdeBD();

    // Selección por ID (Asegúrate de que en tu HTML tengan estos IDs)
    const btnSubirSidebar = document.getElementById('btnSidebarSubir') || document.querySelector('.upload-btn');
    const btnSubirHeader = document.getElementById('btnHeaderSubir') || document.querySelector('.upload-btn-header');
    const overlay = document.getElementById("uploadOverlay");

    if (btnSubirSidebar) {
        btnSubirSidebar.onclick = (e) => {
            e.preventDefault();
            openUploadModal();
        };
    }

    // En fotos.js
    if (btnSubirHeader) {
        btnSubirHeader.onclick = (e) => {
            e.preventDefault();  // Detiene la recarga de página
            e.stopPropagation(); // Detiene que el clic llegue al fondo y lo cierre
            console.log("Abriendo desde Header...");
            openUploadModal();
        };
    }

    // Cerrar el modal al hacer clic en el fondo oscuro
    if (overlay) {
        overlay.onclick = (e) => {
            if (e.target === overlay) closeUploadModal();
        };
    }

    // Menú lateral
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            const section = sectionMap[this.querySelector('span').textContent];
            if (section) renderPhotos(section);
        });
    });
});