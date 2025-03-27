document.addEventListener('DOMContentLoaded', function(){

    document.getElementById('hamburger-menu').addEventListener('click', function(){
        document.getElementById('menu-overlay').style.display = 'flex';
    });

    document.getElementById('close-menu').addEventListener('click', function(){
        document.getElementById('menu-overlay').style.display = 'none';
    });


    document.getElementById('KommenAktiv').addEventListener('click', function (){
        // Zeige den "time-tracking"-Container an
        document.getElementById('time-tracking').style.display = 'flex';
        document.getElementById('GehenAktiv').style.display = 'flex';
        document.getElementById('FeierabendAktiv').style.display = 'flex';

        // setze die aktuelle Uhrzeit und das Datum
        const now = new Date();
        document.getElementById('current-time').textContent = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        document.getElementById('current-date').textContent = now.toLocaleDateString('de-DE');

        // Tausche die Icons aus
        this.disabled = true;
        this.querySelector('img').src = 'assets/icons/KommenInaktivMitText.svg';

        const feierabendButton = document.getElementById('FeierabendInaktiv');
        feierabendButton.disabled = false;
        feierabendButton.querySelector('img').src = 'assets/icons/FeierabendAktivMitText.svg';

        const gehenButton = document.getElementById('GehenInaktiv');
        gehenButton.disabled = false;
        gehenButton.querySelector('img').src = 'assets/icons/GehenAktivMitText.svg';

    });

    document.getElementById('GehenAktiv').addEventListener('click', function(){
        document.getElementById('time-tracking').style.display = 'flex';
        document.getElementById('FeierabendAktiv').style.display = 'flex';
        document.getElementById('KommenAktiv').style.display = 'flex';

        // setze die aktuelle Uhrzeit und das Datum
        const now = new Date();
        document.getElementById('current-time').textContent = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        document.getElementById('current-date').textContent = now.toLocaleDateString('de-DE');

        // Tausche die Icons aus
        this.disabled = true;
        this.querySelector('img').src = 'assets/icons/GehenInaktivMitText.svg';

        const feierabendButton = document.getElementById('FeierabendInaktiv');
        feierabendButton.disabled = false;
        feierabendButton.querySelector('img').src = 'assets/icons/FeierabendAktivMitText.svg';

        const kommenButton = document.getElementById('KommenInaktiv');
        kommenButton.disabled = true;
        kommenButton.querySelector('img').src = 'assets/icons/KommenAktivMitText.svg';
    });

    document.getElementById('FeierabendAktiv').addEventListener('click', function(){
        // Kontrollprompt anzeigen
        const note = prompt('Sie sind dabei ihren Arbeitstag zu beenden. Dieser Schritt kann nicht ruckgängig gemacht werden. \nOptional: Möchten Sie eine Notiz an den Projektleiter senden?');
        if (note !== null){
            alert('Ihr Arbeitstag wurde beendet. Schönen Feierabend! \n' + (note || ' Keine Notiz'));
        }
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
    });

});