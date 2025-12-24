        // Interactividad del menú
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Efecto hover en las cards
        document.querySelectorAll('.photo-card').forEach(card => {
            card.addEventListener('click', function() {
                console.log('Foto seleccionada:', this.querySelector('.photo-title').textContent);
            });
        });


        const uploadOverlay = document.getElementById("uploadOverlay");

        function openUploadModal() {
        uploadOverlay.classList.add("show");
        }

        function closeUploadModal() {
        uploadOverlay.classList.remove("show");
        }

        window.addEventListener("message", (event) => {
            if (event.data === "closeUpload") {
                document
                .getElementById("uploadOverlay")
                .classList.remove("show");
            }
        });



// Base de datos de fotos por sección
const photosData = {
    inicio: [
        { img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop', title: 'Atardecer en la playa', date: '12 Feb 2023' },
        { img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', title: 'Montañas del Norte', date: '28 Ene 2023' },
        { img: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop', title: 'Ciudad Nocturna', date: '5 Mar 2023' },
        { img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop', title: 'Bosque Encantado', date: '17 Feb 2023' },
        { img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop', title: 'Calles de Barcelona', date: '3 Abr 2023' },
        { img: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400&h=300&fit=crop', title: 'Otoño en el Lago', date: '22 Oct 2022' },
        { img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop', title: 'Desierto Dorado', date: '8 Mar 2023' },
        { img: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop', title: 'Flores Tropicales', date: '15 Feb 2023' }
    ],
    favoritos: [
        { img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop', title: 'Atardecer en la playa', date: '12 Feb 2023' },
        { img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', title: 'Montañas del Norte', date: '28 Ene 2023' },
        { img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop', title: 'Bosque Encantado', date: '17 Feb 2023' },
        { img: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop', title: 'Flores Tropicales', date: '15 Feb 2023' }
    ],
    albumes: [
        { img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', title: 'Álbum Vacaciones 2023', date: 'Creado: 28 Ene 2023' },
        { img: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop', title: 'Ciudades del Mundo', date: 'Creado: 5 Mar 2023' },
        { img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop', title: 'Arquitectura Europea', date: 'Creado: 3 Abr 2023' }
    ],
    compartido: [
        { img: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop', title: 'Ciudad Nocturna', date: 'Compartido hace 2 días' },
        { img: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400&h=300&fit=crop', title: 'Otoño en el Lago', date: 'Compartido hace 1 semana' }
    ],
    recientes: [
        { img: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop', title: 'Flores Tropicales', date: '15 Feb 2023' },
        { img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop', title: 'Bosque Encantado', date: '17 Feb 2023' },
        { img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop', title: 'Atardecer en la playa', date: '12 Feb 2023' }
    ],
    papelera: [
        { img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop', title: 'Desierto Dorado', date: 'Eliminado hace 3 días' }
    ],
    'nueva-coleccion': []
};

// Títulos por sección
const sectionTitles = {
    inicio: 'Mis Fotos',
    favoritos: 'Mis Favoritos',
    albumes: 'Mis Álbumes',
    compartido: 'Compartido Conmigo',
    recientes: 'Fotos Recientes',
    papelera: 'Papelera',
    'nueva-coleccion': 'Nueva Colección'
};

// Mapeo de texto del sidebar a keys de secciones
const sectionMap = {
    'Inicio': 'inicio',
    'Favoritos': 'favoritos',
    'Álbumes': 'albumes',
    'Compartido': 'compartido',
    'Recientes': 'recientes',
    'Papelera': 'papelera',
    'Nueva colección': 'nueva-coleccion'
};

// Función para renderizar fotos
function renderPhotos(section) {
    const photoGrid = document.querySelector('.photo-grid');
    const pagination = document.querySelector('.pagination');
    const sectionTitle = document.querySelector('.section-header h2');
    
    // Cambiar el título
    sectionTitle.textContent = sectionTitles[section];
    
    const photos = photosData[section];
    
    // Si no hay fotos, mostrar mensaje vacío
    if (photos.length === 0) {
        photoGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #999;">
                <svg width="80" height="80" fill="currentColor" viewBox="0 0 24 24" style="margin-bottom: 20px; color: #ddd;">
                    <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 17l3.5-4.5 2.5 3.01L14.5 11l4.5 6H5z"/>
                </svg>
                <h3 style="font-size: 20px; color: #666; margin-bottom: 10px;">No hay fotos aquí</h3>
                <p style="font-size: 14px;">${section === 'nueva-coleccion' ? 'Crea tu primera colección' : 'Aún no tienes fotos en esta sección'}</p>
            </div>
        `;
        pagination.style.display = 'none';
        return;
    }
    
    // Renderizar fotos
    pagination.style.display = 'flex';
    let html = '';
    
    photos.forEach(photo => {
        html += `
            <div class="photo-card">
                <div class="photo-wrapper">
                    <img src="${photo.img}" alt="${photo.title}">
                    <div class="photo-badge">But</div>
                </div>
                <div class="photo-info">
                    <div class="photo-title">${photo.title}</div>
                    <div class="photo-date">${photo.date}</div>
                </div>
            </div>
        `;
    });
    
    photoGrid.innerHTML = html;
    
    // Actualizar info de paginación
    const paginationInfo = document.querySelector('.pagination-info');
    paginationInfo.textContent = `Mostrando ${photos.length} de ${photos.length} fotos`;
}

// Interactividad del menú
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remover clase active de todos
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        
        // Agregar clase active al clickeado
        this.classList.add('active');
        
        // Obtener el texto del span
        const sectionText = this.querySelector('span').textContent;
        
        // Obtener la key de la sección
        const section = sectionMap[sectionText];
        
        // Renderizar las fotos de esa sección
        if (section) {
            renderPhotos(section);
        }
    });
});

// Efecto hover en las cards (delegar eventos porque las cards se crean dinámicamente)
document.querySelector('.photo-grid').addEventListener('click', function(e) {
    const card = e.target.closest('.photo-card');
    if (card) {
        const title = card.querySelector('.photo-title').textContent;
        console.log('Foto seleccionada:', title);
    }
});

