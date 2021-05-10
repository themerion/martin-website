# Överblick, filer

| Fil          | Syfte                           |
| -----        | -----                           |
| pages/       | Alla enskilda sidor. |
| images/      | Alla bilder.         |
| dist/        | När hemsidan har genererats läggs de färdiga filerna automatiskt här.   |
| sidmall.html | Det som är gemensamt för *alla* sidor. T.ex. meny. |
| style.css    | Teckensnitt, färger, layout...  |
| script.js    | Logik. Används i dagsläget enbart för mobilmenyn. |
| build.js     | Skript som bygger ihop de olika delarna, och placerar dem i ```dist/```-mappen. |


# Installation

1. Ladda hem och installera **nodejs**.
2. Öppna ett kommandofönster i den här mappen (samma mapp som README.md).
	* Man kan hålla inne shift och högerklicka i mappen, så får man alternativet att öppna ett powershell-fönster.
3. Kör kommandot: ```node build.js```
4. Alla filer har genererats till mappen ```dist/```
5. Öppna ```dist/index.html```


# Publicering

Använd lämplig **FTP-klient** (t.ex. FileZilla) för att föra över filerna från mappen "dist" till din server.

(Det är möjlig att automatisera den processen med versionshantering och programmet git)