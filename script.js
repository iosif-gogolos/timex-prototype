document.addEventListener('DOMContentLoaded', function(){

    let firstStartTime = null;
    let firstEndTime = null;
    let secondStartTime = null;
    let breakDuration = null;

    document.getElementById('hamburger-menu').addEventListener('click', function(){
        document.getElementById('menu-overlay').style.display = 'flex';
    });

    document.getElementById('close-menu').addEventListener('click', function(){
        document.getElementById('menu-overlay').style.display = 'none';
    });

    document.getElementById('KommenAktiv').addEventListener('click', function(){
        const now = new Date();

        if(!firstStartTime){
            // Erstes Einstempeln des Tages
            firstStartTime = now;
            document.getElementById('info-container').style.display = 'none';
            document.getElementById('time-tracking').style.display = 'flex';
            document.getElementById('GehenAktiv').style.display = 'flex';
        } else{
            // Zweites Einstempen des Tages
            secondStartTime = now;
            if (firstEndTime){
                breakDuration = Math.round((secondStartTime - firstEndTime) / (1000 * 60));
                updateInfoContainer();
            }
        }

        //Aktuelle Zeit anzeigen
        document.getElementById('current-time').textContent = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        document.getElementById('current-date').textContent = now.toLocaleDateString('de-DE');

        // Buttons umschalten
        this.disabled = true;
        this.querySelector('img').src = 'assets/icons/KommenInaktivMitText.svg';
        document.getElementById('GehenAktiv').disabled = false;
        document.getElementById('GehenAktiv').querySelector('img').src = 'assets/icons/GehenAktivMitText.svg';
    });

    document.getElementById('GehenAktiv').addEventListener('click', function(){
        const now = new Date();
        firstEndTime = now;

        document.getElementById('FeierabendAktiv').style.display ='flex';

        // Zweiten tracking container erstellen und anzeigen
        if (!document.getElementById('time-tracking-2')){
            const secondContainer = document.getElementById('time-tracking').cloneNode(true);
            secondContainer.id = 'time-tracking-2';
            document.getElementById('time-tracking').after(secondContainer);
        }

        // Zeit im zweiten Container aktualisieren
        const secondContainer = document.getElementById('time-tracking-2');
        secondContainer.querySelector('#time-icon').src = 'assets/icons/GehenAktiv.svg';
        secondContainer.querySelector('#current-time').textContent = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        secondContainer.querySelector('#current-date').textContent = now.toLocaleDateString('de-DE');
        secondContainer.style.display = 'flex';

        // Info Container mit arbeitszeiten anzeigen
        updateInfoContainer();

        // Buttons umschalten
        this.disabled = true;
        this.querySelector('img').src = 'assets/icons/GehenInaktivMitText.svg';
        document.getElementById('KommenAktiv').disabled = false;
        document.getElementById('KommenAktiv').querySelector('img').src = 'assets/icons/KommenAktivMitText.svg';
    });

    function updateInfoContainer() {
        const infoContainer = document.getElementById('info-container');
        infoContainer.style.display = 'flex';
        infoContainer.innerHTML = ''; // Container leeren

        if (firstStartTime && firstEndTime){
            const workDuration = Math.round((firstEndTime - firstStartTime) / (1000 * 60));
            const workHours = Math.floor(workDuration / 60);
            const workMinutes = workDuration % 60;

            const formattedHours = workHours.toString().padStart(2, '0');
            const formattedMinutes = workMinutes.toString().padStart(2, '0');

            const workTimeInfo = document.createElement('p');
            workTimeInfo.textContent = `${formattedHours}:${formattedMinutes} h Arbeitszeit`;
            infoContainer.appendChild(workTimeInfo);

            if(breakDuration){
                const breakHours = Math.floor(breakDuration /60);
                const breakMinutes = breakDuration % 60;

                const formattedBreakHours = breakHours.toString().padStart(2, '0');
                const formattedBreakMinutes = breakMinutes.toString().padStart(2, '0');

                const breakInfo = document.createElement('p');
                breakInfo.textContent = `${formattedBreakHours}:${formattedBreakMinutes} h Pause`;
                infoContainer.appendChild(breakInfo);
            }
        }
    }
    document.getElementById('FeierabendAktiv').addEventListener('click', function(){
        // Kontrollprompt anzeigen
        const note = prompt('Sie sind dabei ihren Arbeitstag zu beenden. Dieser Schritt kann nicht ruckgängig gemacht werden. \nOptional: Möchten Sie eine Notiz an den Projektleiter senden?');
        if (note !== null){
            alert('Ihr Arbeitstag wurde beendet. Schönen Feierabend! \n' + (note || ' Keine Notiz'));
             // Reset der Buttons
            document.getElementById('KommenAktiv').disabled = false;
            document.getElementById('KommenAktiv').querySelector('img').src = 'assets/icons/KommenAktivMitText.svg';

            this.disabled = true;
            this.querySelector('img').src = 'assets/icons/FeierabendInaktivMitText.svg';

            const gehenButton = document.getElementById('GehenInaktiv');
            gehenButton.disabled = true;
            gehenButton.querySelector('img').src = 'assets/icons/GehenInaktivMitText.svg';

            // Verstecke den "time-tracking"-Container
            document.getElementById('time-tracking').style.display = 'none';
        } else {
            alert('Ihr Arbeitstag wurde noch nicht beendet.');
        }
       
    });

});