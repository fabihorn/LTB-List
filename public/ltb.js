async function fetchLtbList() {
        try {
            const response = await fetch('/.netlify/functions/ltbList'); // Zugriff auf Netlify Function
            const ltbList = await response.json();
            displayLtbList(ltbList);
        } catch (error) {
            document.getElementById('ltb-list').innerText = 'Fehler beim Laden der LTB-Liste.';
            console.error(error);
        }
    }
    
    function displayLtbList(ltbList) {
        const container = document.getElementById('ltb-list');
        container.innerHTML = '';  // Vorherigen Inhalt löschen
        const checkboxStatus = JSON.parse(localStorage.getItem('ltbStatus')) || {};
    
        ltbList.forEach(ltb => {
            const item = document.createElement('div');
            item.className = 'ltb-item';
    
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `ltb-${ltb.nummer}`;
            checkbox.checked = checkboxStatus[ltb.nummer] || false;
            checkbox.addEventListener('change', () => {
                checkboxStatus[ltb.nummer] = checkbox.checked;
                localStorage.setItem('ltbStatus', JSON.stringify(checkboxStatus));
            });
    
            const label = document.createElement('label');
            label.htmlFor = `ltb-${ltb.nummer}`;
            label.textContent = `LTB ${ltb.nummer}: ${ltb.titel}`;
    
            item.appendChild(checkbox);
            item.appendChild(label);
            container.appendChild(item);
        });
    }
    
    document.addEventListener('DOMContentLoaded', fetchLtbList);