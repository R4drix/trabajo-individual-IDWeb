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

        // Botón de subir fotos
        document.querySelectorAll('.upload-btn, .upload-btn-header').forEach(btn => {
            btn.addEventListener('click', function() {
                alert('Función de subir fotos - Aquí se abriría el selector de archivos');
            });
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

        // Función para renderizar fotos
        function renderPhotos(section) {
            const contentArea = document.getElementById('content-area');
            const photos = photosData[section];
            const title = document.getElementById('section-title');
            
            title.textContent = sectionTitles[section];

            if (photos.length === 0) {
                contentArea.innerHTML = `
                    <div class="empty-state">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 17l3.5-4.5 2.5 3.01L14.5 11l4.5 6H5z"/>
                        </svg>
                        <h3>No hay fotos aquí</h3>
                        <p>${section === 'nueva-coleccion' ? 'Crea tu primera colección' : 'Aún no tienes fotos en esta sección'}</p>
                    </div>
                `;
                return;
            }

            let html = '<div class="photo-grid">';
            
            photos.forEach(photo => {
                html += `
                    <div class="photo-card">
                        <div class="photo-wrapper">
                            <img src="${photo.img}" alt="${photo.title}">
                            <div class="photo-badge">B</div>
                        </div>
                        <div class="photo-info">
                            <div class="photo-title">${photo.title}</div>
                            <div class="photo-date">${photo.date}</div>
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            
            html += `
                <div class="pagination">
                    <div class="pagination-info">Mostrando ${photos.length} de ${photos.length} fotos</div>
                    <div class="pagination-buttons">
                        <button class="page-btn">←</button>
                        <button class="page-btn active">1</button>
                        <button class="page-btn">2</button>
                        <button class="page-btn">3</button>
                        <button class="page-btn">→</button>
                    </div>
                </div>
            `;
            
            contentArea.innerHTML = html;
        }

        // Event listeners para el menú
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                const section = this.dataset.section;
                renderPhotos(section);
            });
        });

        // Modal de upload
        let selectedFiles = [];

        function openUploadModal() {
            document.getElementById('uploadModal').classList.add('show');
        }

        function closeUploadModal() {
            if (selectedFiles.length > 0) {
                if (confirm('¿Estás seguro de que deseas cerrar? Se perderán los archivos seleccionados.')) {
                    document.getElementById('uploadModal').classList.remove('show');
                    selectedFiles = [];
                    document.getElementById('fileList').innerHTML = '';
                    updateUploadUI();
                }
            } else {
                document.getElementById('uploadModal').classList.remove('show');
            }
        }

        // Drag & Drop
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');

        uploadArea.addEventListener('click', () => fileInput.click());

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#a99bd3';
            uploadArea.style.background = '#f0edff';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '#d0d0d0';
            uploadArea.style.background = '#fafafa';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#d0d0d0';
            uploadArea.style.background = '#fafafa';
            handleFiles(e.dataTransfer.files);
        });

        fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

        function handleFiles(files) {
            const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
            
            newFiles.forEach(file => {
                if (!selectedFiles.find(f => f.name === file.name && f.size === file.size)) {
                    selectedFiles.push(file);
                    addFileToList(file);
                }
            });

            updateUploadUI();
        }

        function addFileToList(file) {
            const fileList = document.getElementById('fileList');
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.dataset.fileName = file.name;

            const reader = new FileReader();
            reader.onload = (e) => {
                fileItem.innerHTML = `
                    <img src="${e.target.result}" class="file-thumbnail">
                    <div class="file-info">
                        <div class="file-name">${file.name}</div>
                        <div class="file-size">${formatFileSize(file.size)}</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 0%"></div>
                        </div>
                    </div>
                    <button class="remove-file-btn" onclick="removeFile('${file.name}')">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                `;
            };
            reader.readAsDataURL(file);

            fileList.appendChild(fileItem);
        }

        function removeFile(fileName) {
            selectedFiles = selectedFiles.filter(f => f.name !== fileName);
            const fileItem = document.querySelector(`[data-file-name="${fileName}"]`);
            if (fileItem) fileItem.remove();
            updateUploadUI();
        }

        function updateUploadUI() {
            const count = selectedFiles.length;
            document.getElementById('selectedCount').textContent = `${count} foto${count !== 1 ? 's' : ''} seleccionada${count !== 1 ? 's' : ''}`;
            document.getElementById('uploadBtn').disabled = count === 0;
        }

        function uploadFiles() {
            if (selectedFiles.length === 0) return;

            selectedFiles.forEach((file, index) => {
                const fileItem = document.querySelector(`[data-file-name="${file.name}"]`);
                const progressFill = fileItem.querySelector('.progress-fill');

                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 30;
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(interval);
                        
                        if (index === selectedFiles.length - 1) {
                            setTimeout(() => {
                                alert('¡Fotos subidas exitosamente!');
                                closeUploadModal();
                            }, 500);
                        }
                    }
                    progressFill.style.width = `${progress}%`;
                }, 200);
            });

            document.getElementById('uploadBtn').disabled = true;
            document.getElementById('uploadBtn').textContent = 'Subiendo...';
        }

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
        }

        // Cerrar modal con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('uploadModal').classList.contains('show')) {
                closeUploadModal();
            }
        });

        // Cargar sección inicial
        renderPhotos('inicio');