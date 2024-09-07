let URL = 'https://randomuser.me/api/?results=1';

fetch(URL)
    .then(response => response.json())
    .then(data => {
        const user = data.results[0];

        const fullName = `${user.name.first} ${user.name.last}`;
        const email = user.email;
        const birthday = new Date(user.dob.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.country}`;
        const phone = user.phone;
        const password = user.login.password;

        // Actualizar la imagen del usuario
        document.getElementById('user-image').src = user.picture.large;

        // Actualizar los datos de los action-item
        const actionItems = document.querySelectorAll('.action-item');
        actionItems.forEach((item, index) => {
            const infoType = item.getAttribute('data-info');
            const dataValue = {
                'Name: ': fullName,
                'Email: ': email,
                'Birthday: ': birthday,
                'Location: ': address,
                'Phone: ': phone,
                'Password: ': password
            }[infoType];

            item.setAttribute('data-value', dataValue);
        });

        let currentIndex = null;

        actionItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {

                const infoType = item.getAttribute('data-info');
                const infoValue = item.getAttribute('data-value');
                document.getElementById('info-display').innerText = `${infoType}`;
                document.getElementById('info-display').innerText = `${infoValue}`;

                const img = item.querySelector('img');
                
                img.style.clipPath = 'inset(0 0 0 0)'; // Muestra la imagen completa
                img.style.transform = 'translateY(0)'; // Muestra la imagen sin desplazamiento

                if (currentIndex !== null) {
                    const prevItem = actionItems[currentIndex];
                    const prevImg = prevItem.querySelector('img');
                    prevImg.style.clipPath = 'inset(0 50% 0 50%)'; // Muestra el lado opuesto
                    prevImg.style.transform = 'translateY(100%)'; // Desplaza la imagen hacia abajo
                }

                currentIndex = index;
            });
        });
    })
    .catch(error => console.error('Error fetching data', error));