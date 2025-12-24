
        document.getElementById('uploadForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);

            fetch('subir.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'success') {
                    alert('¡Foto subida!');
                    window.parent.postMessage('refreshGallery', '*');
                } else {
                    alert('Error: ' + data.message);
                }
            });
        });
