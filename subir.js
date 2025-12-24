
        let selectedFiles = [];

        // Referencias a elementos
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const fileList = document.getElementById('fileList');
        const emptyState = document.getElementById('emptyState');
        const selectedCount = document.getElementById('selectedCount');
        const uploadBtn = document.getElementById('uploadBtn');

        // Click en el área de subida
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        // Selección de archivos
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });

        // Drag & Drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            handleFiles(e.dataTransfer.files);
        });

        // Procesar archivos
        function handleFiles(files) {
            const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
            
            newFiles.forEach(file => {
                // Evitar duplicados
                if (!selectedFiles.find(f => f.name === file.name && f.size === file.size)) {
                    selectedFiles.push(file);
                    addFileToList(file);
                }
            });

            updateUI();
        }

        // Agregar archivo a la lista
        function addFileToList(file) {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.dataset.fileName = file.name;

            const reader = new FileReader();
            reader.onload = (e) => {
                fileItem.innerHTML = `
                    <img src="${e.target.result}" alt="${file.name}" class="file-thumbnail">
                    <div class="file-info">
                        <div class="file-name">${file.name}</div>
                        <div class="file-size">${formatFileSize(file.size)}</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 0%"></div>
                        </div>
                    </div>
                    <button class="remove-file-btn" onclick="removeFile('${file.name}')">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                `;
            };
            reader.readAsDataURL(file);

            fileList.appendChild(fileItem);
        }

        // Remover archivo
        function removeFile(fileName) {
            selectedFiles = selectedFiles.filter(f => f.name !== fileName);
            const fileItem = document.querySelector(`[data-file-name="${fileName}"]`);
            if (fileItem) {
                fileItem.remove();
            }
            updateUI();
        }

        // Actualizar UI
        function updateUI() {
            const count = selectedFiles.length;
            selectedCount.textContent = `${count} foto${count !== 1 ? 's' : ''} seleccionada${count !== 1 ? 's' : ''}`;
            uploadBtn.disabled = count === 0;

            if (count === 0) {
                emptyState.classList.add('show');
            } else {
                emptyState.classList.remove('show');
            }
        }

        // Subir archivos
        function uploadFiles() {
            if (selectedFiles.length === 0) return;

            // Simular carga de archivos
            selectedFiles.forEach((file, index) => {
                const fileItem = document.querySelector(`[data-file-name="${file.name}"]`);
                const progressFill = fileItem.querySelector('.progress-fill');

                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 30;
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(interval);
                        
                        // Si es el último archivo, mostrar mensaje
                        if (index === selectedFiles.length - 1) {
                            setTimeout(() => {
                                alert('¡Fotos subidas exitosamente!');
                                closeModal();
                            }, 500);
                        }
                    }
                    progressFill.style.width = `${progress}%`;
                }, 200);
            });

            uploadBtn.disabled = true;
            uploadBtn.textContent = 'Subiendo...';
        }

        // Cerrar modal
        function closeModal() {
            document
            .getElementById("uploadOverlay")
            .classList.remove("show");
        }

        // Formatear tamaño de archivo
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
        }

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
