const axios = require('axios');
const express = require('express');
const path = require('node:path');
const fs = require('node:fs');
const { getIDVideo, getOriginalUrl, serializeResult } = require(path.join(__dirname, '.','main'));
const app = express();
const a = path.join(__dirname, '.', 'index.ejs')
const ap = path.join(__dirname, '.', 'index1.ejs')
const st = {
         style : fs.readFileSync('./uikit.min.css','utf8'),
         js1 : fs.readFileSync('./uikit.min.js','utf8'),
         js2 : fs.readFileSync('./uikit-icons.min.js','utf8')
}
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
     res.render(a, {
         css : st.style,
         js1 : st.js1,
         js2 : st.js2
         
     });
  })

app.get('/url',async (req, res) => {
    const text = req.query.link
    if(!text) return res.status(404)
    let link = await getOriginalUrl(text)
    let id = getIDVideo(link)
    let { data } = await axios.get(`https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${id}`);
    const result = serializeResult(data);
       res.render(ap, {
         datas : result.video,
         music : result.music,
         title : result.title,
         play : result.play,
         like : result.like,
         comment : result.comment,
         share : result.share,
         css : st.style,
         js1 : st.js1,
         js2 : st.js2
     })
}) 

app.listen(3000, () => console.log('Server started 3000'));
