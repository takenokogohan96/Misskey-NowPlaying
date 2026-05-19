function doGet(e) {
  var { song, external_urls, artist, artist_2, device } = generate_sharelink();

  if (song == undefined) {
    return showNoSongPage();
  } else {
    song = song.replace("&", '&amp;').replace("'", "&#39;").replace('"', '&#34;');
    artist = artist.replace("&", '&amp;').replace("'", "&#39;").replace('"', '&#34;');

    var text;
    var plaintext;

    if (artist_2 == "") {
      text = "🎵%20[" + song + "](" + external_urls + ")%0A🎤%20" + artist + "%0A%23nowplaying%3Csmall%3E%20|%20" + device + "%3C/small%3E";
      plaintext = "🎵 [" + song + "](" + external_urls + ")<br>🎤 " + artist + "<br>#nowplaying&lt;small&gt; | " + device + "&lt;/small&gt;";
    } else {
      artist_2 = artist_2.replace("&", '&amp;').replace("'", "&#39;").replace('"', '&#34;');
      text = "🎵%20[" + song + "](" + external_urls + ")%0A🎤%20" + artist + "%0A🎤%20" + artist_2 + "%0A%23nowplaying%3Csmall%3E%20|%20" + device + "%3C/small%3E";
      plaintext = "🎵 [" + song + "](" + external_urls + ")<br>🎤 " + artist + "<br>🎤 " + artist_2 + "<br>#nowplaying&lt;small&gt; | " + device + "&lt;/small&gt;";
    }

    var misskeyUrl = "https://misskey.io/share?text=" + text;
    return showSharePage(misskeyUrl, plaintext);
  }
}

function showSharePage(misskeyUrl, plaintext) {
  var htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Misskey-NowPlaying</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-color: #0c1210;
      --card-bg: #141a18;
      --text-color: #f3f4f6;
      --text-muted: #9ca3af;
      --accent-color: #1ed760;
      --border-color: #09401c;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      background-color: var(--bg-color);
      color: var(--text-color);
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      overflow: hidden;
    }

    .container {
      position: relative;
      z-index: 10;
      width: 90%;
      max-width: 480px;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      padding: 40px 32px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    @keyframes slide-up {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .music-icon {
      font-size: 40px;
      margin-bottom: 20px;
      display: inline-block;
    }
    
    h1 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 12px;
      color: var(--text-color);
    }
    
    .preview-box {
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 12px;
      padding: 16px;
      text-align: left;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 28px;
      color: #d1d5db;
    }
    
    .btn {
      display: inline-block;
      width: 100%;
      padding: 14px;
      background: var(--accent-color);
      border: none;
      border-radius: 12px;
      color: var(--bg-color);
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition: transform 0.1s ease;
    }
    
    .btn:hover {
      filter: brightness(1.15);
    }
    
    .btn:active {
      transform: scale(0.96);
      filter: brightness(0.95);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="music-icon">🎧</div>
    <h1>Misskey-NowPlaying</h1>
    
    <div class="preview-box">
      ${plaintext}
    </div>
    
    <!-- target="_top" replaces the current GAS tab with the Misskey share page -->
    <a href="${misskeyUrl}" target="_top" class="btn">
      Note to misskey.io
    </a>
  </div>
</body>
</html>
  `;
  return HtmlService.createHtmlOutput(htmlContent)
    .setTitle("Share to Misskey")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function showNoSongPage() {
  var htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Spotify is Idle</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-color: #0c1210;
      --card-bg: #141a18;
      --text-color: #f3f4f6;
      --text-muted: #9ca3af;
      --accent-color: #1ed760;
      --border-color: #09401c;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      background-color: var(--bg-color);
      color: var(--text-color);
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      overflow: hidden;
    }

    .container {
      position: relative;
      z-index: 10;
      width: 90%;
      max-width: 400px;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      padding: 48px 32px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    @keyframes slide-up {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .music-icon {
      font-size: 48px;
      margin-bottom: 24px;
      display: inline-block;
    }
    
    h1 {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 12px;
      color: var(--text-color);
    }
    
    p.subtitle {
      font-size: 14px;
      color: var(--text-muted);
      margin-bottom: 32px;
      line-height: 1.5;
    }
    
    .btn {
      display: inline-block;
      width: 100%;
      padding: 14px;
      background: rgba(180, 233, 0, 0.1);
      border: 1px solid rgba(180, 233, 0, 0.3);
      border-radius: 12px;
      color: var(--accent-color);
      font-size: 15px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      transition: transform 0.1s ease;
    }
    
    .btn:hover {
      background: rgba(180, 233, 0, 0.2);
      border-color: var(--accent-color);
      filter: brightness(1.15);
    }
    
    .btn:active {
      transform: scale(0.96);
      filter: brightness(0.9);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="music-icon">💤</div>
    <h1>Spotify is Currently Idle</h1>
    <p class="subtitle">Not playing</p>
  </div>
</body>
</html>
  `;
  return HtmlService.createHtmlOutput(htmlContent)
    .setTitle("Spotify is Idle")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function generate_sharelink() {

  // 認証情報
  const client_id = PropertiesService.getScriptProperties().getProperty("Client ID");
  const client_secret = PropertiesService.getScriptProperties().getProperty("Client secret");
  const authorization_code = PropertiesService.getScriptProperties().getProperty("Authrization code");
  const basic_authorization = Utilities.base64Encode(client_id + ":" + client_secret);

  // Spotify へのアクセストークンを取得
  const scriptProperties = PropertiesService.getScriptProperties();
  const is_first_access = Object.keys(scriptProperties.getProperties()).length == 0;
  const access_token = is_first_access ? getFirstAccessTokenToSpotify(authorization_code, basic_authorization) : scriptProperties.getProperty('access_token');

  const now_playing = getNowPlaying(access_token, basic_authorization);
  return now_playing
}

function getFirstAccessTokenToSpotify(authorization_code, basic_authorization) {
  const headers = { "Authorization": "Basic " + basic_authorization };
  const payload = {
    "grant_type": "authorization_code",
    "code": authorization_code,
    "redirect_uri": "http://localhost:3000"
  };
  const options = {
    "payload": payload,
    "headers": headers,
  };
  const response = UrlFetchApp.fetch("https://accounts.spotify.com/api/token", options);

  const parsedResponse = JSON.parse(response);
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperties({
    'access_token': parsedResponse.access_token,
    'refresh_token': parsedResponse.refresh_token
  });
  return parsedResponse.access_token;
}

function refreshAccessTokenToSpotify(basic_authorization) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const refresh_token = scriptProperties.getProperty('refresh_token');

  const headers = {
    "Authorization": "Basic " + basic_authorization,
    "Content-Type": "application/x-www-form-urlencoded"
  };
  const payload = {
    "grant_type": "refresh_token",
    "refresh_token": refresh_token
  };
  const options = {
    "payload": payload,
    "headers": headers,
  };
  const response = UrlFetchApp.fetch("https://accounts.spotify.com/api/token", options);

  const parsedResponse = JSON.parse(response);
  scriptProperties.setProperty('access_token', parsedResponse.access_token);
  // refresh_token は毎回発行されるとは限らない
  if (parsedResponse.refresh_token) {
    scriptProperties.setProperty('refresh_token', parsedResponse.refresh_token);
  }
  return parsedResponse.access_token;
}

function getNowPlaying(access_token, basic_authorization) {
  const options = {
    "headers": { "Authorization": "Bearer " + access_token },
    "muteHttpExceptions": true // 401エラーへの対応のため
  };
  const response = UrlFetchApp.fetch("https://api.spotify.com/v1/me/player", options);

  switch (response.getResponseCode()) {
    case 200: // Spotify の曲をセット
      return getArtistAndSongString(response);
    case 204: // 何も聞いていない
      var code = response.getResponseCode();
      return { code, code, code, code, code };
    case 401: // access_token が切れた
      const refreshed_access_token = refreshAccessTokenToSpotify(basic_authorization);
      return getNowPlaying(refreshed_access_token, basic_authorization);
    default:
    // 実行されない想定
  }
}

function getArtistAndSongString(response) {
  const parsedResponse = JSON.parse(response);
  const song = parsedResponse.item.name;
  const external_urls = parsedResponse.item.external_urls.spotify;
  const artist = parsedResponse.item.artists[0].name;

  var artist_2 = ""
  if (parsedResponse.item.artists.length > 1) {
    artist_2 = parsedResponse.item.artists[1].name
  }
  if (parsedResponse.item.artists.length > 2) {
    const other = parsedResponse.item.artists.length - 2
    artist_2 = artist_2 + "、他" + other + "名"
  }

  var device = parsedResponse.device.name;
  const propKey = device.toLowerCase() + "_device";
  const mappedDevice = PropertiesService.getScriptProperties().getProperty(propKey);
  if (mappedDevice) {
    device = mappedDevice;
  }
  return { song, external_urls, artist, artist_2, device };
}