// Based on Tuna browser script by @univrsal
'use strict';

const PORT = 1608;
const URL = `http://localhost:${PORT}/`;
const REFRESH_RATE_MS = 500;
const COOLDOWN_MS = 10000;
const HOSTNAME = 'music.youtube.com'

module.exports = (win) => {
    win.once('ready-to-show', () => {
        const failure_count = 0;

        function post(data) {
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(JSON.stringify({
                    data,
                    hostname: HOSTNAME,
                    date: Date.now()
                })),
            }).then(function(response) {
                if (!response.ok) {
                    failure_count++;
                }
            })
        }
        // i can just catch for error instead of .then
        function seconds_to_milliseconds(seconds) {
            return seconds * 1000 || 0;
        }

        function StartFunction() {
            setInterval(() => {
                if (failure_count > 3) {
                    console.log('Failed to connect multiple times, waiting a few seconds');
                    cooldown = cooldown_ms;
                    failure_count = 0;
                }

                if (cooldown > 0) {
                    cooldown -= refresh_rate_ms;
                    return;
                }

                const status = songInfo.isPaused ? "playing" : "stopped";
                const cover_url = songInfo.imageSrc
                const title = songInfo.title
                const artists = [songInfo.artist];
                const duration = seconds_to_milliseconds(songInfo.songDuration);
                const list_param = new URLSearchParams(songInfo.url).get('list');
                const album_url = `${HOSTNAME}/playlist?list=${list_param}`


                if (title !== null) {
                    post({
                        cover_url,
                        title,
                        artists,
                        status,
                        duration,
                        album_url
                    });
                }
            }, 500);
        }

        StartFunction();
    })
}