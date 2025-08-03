const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUVTTS9MeGc4TXhvQWo0aWVTbzkyRW15L3pxaVNhR3cxbGJwdlExd05rYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQkcyZld2QVE4SGxHbFNMSVRSNCtKMVdicE9ub3ZuTXdrSWlNQUpPVGFSST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTRGw3VFZZc1VIQnhkampaNmtpbStWL2gvZjlGTE1jdENXcFlmK1lXbW5BPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaRlBjV0ZXdE1oazNwSTBveENlc0VyRXFqT21CMnVJbW54MUFtWVdFckhRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNGZjhFcmJwaDB5Y0F3V1NIRXFUY0pkZEtNSkY5c3pmS2JkYnR0d2FLSGs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBQeGl5akFEQUEvcGxhaTZHWXkxR2QxTWpxL0xiS0pJSWs3Mk9Wa2pyMzg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1BHOS9LMzNyKzRZNGpTK3U2eG9YN2E1RWtHUmdlSVRMUkJLQ2pOK28xaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVE9abzR5ckpKTkNPakZ4cy94WWdFZzNPaEFoN0NZWTd6d2FDSlpqaDlSYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlYwaGY0OGF0ZVY4UE03TS8rWkpGd3B2WWQwZlBaY0VXZGNQMUNnR3BtYXRTQ01xSnJxazFzY1MySnVod2dKWk40Q1ZROE02aHk5Yk5tekNlcGdSL2l3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzMsImFkdlNlY3JldEtleSI6IlVJVWxNYjcrT1NZd2JJWkVITSs1cmFPWDc4TzlwYlp3OHBLTkE0WmZGQm89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzQ1NDMxNzM0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjE2MzA3QTVEMTlCNjUyQTZFMDU0MEU4RjgxN0UxRTcwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQyMDI5MzB9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc0NTQzMTczNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3NDJGRDZCMTU1QTc1MTZGQzdERDM2N0QwMTE0NkE1RCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU0MjAyOTMwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6ZmFsc2UsImFjY291bnQiOnsiZGV0YWlscyI6IkNJWGM4cXdFRUoyR3ZNUUdHQklnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJiNGJicW1IM1A3czNnV2Jqa1R0M1RISXVZNFBBcWxqL0VVam5ZdjVMM1ZVPSIsImFjY291bnRTaWduYXR1cmUiOiJsd3VBTzYwaE5PdE4reDhJV3RqSUdhSHFkM2Z5ODhJSmF6cU5rc0cyTTNTRXk1OUJEVkhXbEZ0WVJzaUJWV1VXV2d0T25pbU00M0pOYmdKblk1T2xEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRk9OeERtcjBiSVo3RGdFMlk2V2k2WDB5cHRNVGdyMUFnYThCbDlLWjJHUGZOdkl0N3BsTmdPRHRJbVRWbEF0UkYvN3dNc0svTDJRKzBPVlpidm0yamc9PSJ9LCJtZSI6eyJpZCI6IjI1NDc0NTQzMTczNDo2NkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjEzMjc5MjIxODMyNTEzMjo2NkBsaWQiLCJuYW1lIjoiSeG0gOG0jUPKnOG0gMm0yaLhtIDhtKHhtIAifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzQ1NDMxNzM0OjY2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlcrRzI2cGg5eis3TjRGbTQ1RTdkMHh5TG1PRHdLcFkveEZJNTJMK1M5MVYifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1NDIwMjkyMiwibGFzdFByb3BIYXNoIjoiM1I5WjM5IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFIMXQifQ==',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "nuccoAI",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254745431734",
    DEV : process.env.DEV || "NUCCO AI",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT : process.env.AUTO_REACTION || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no",
    AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'no',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    GREET : process.env.GREET_MESSAGE || "yes", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By LUCKY-MD-XFORCE',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    ANTI_BUG : process.env.ANTI_BUG || "no",
    ANTI_MENTION_GROUP : process.env.ANTI_MENTION_GROUP || "no",
    ANTI_TAG : process.env.ANTI_TAG || "no",
    ANTI_BAD : process.env.ANTI_BAD || "no",
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://fredi-ai-site.vercel.app",
    CAPTION : process.env.CAPTION || "changz",
    BOT : process.env.BOT_NAME || 'CHANGZ',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGES || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes', 
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
