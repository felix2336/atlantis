import express from 'express'
import Bumps from '../Schemas/bumps'
import Casino from '../Schemas/casino'
import Warns from '../Schemas/warns'
import ytdl from 'ytdl-core'
const port = 2200;
async function startServer() {
    const app = express()
    app.use(express.json())

    app.get('/bumps/:userId', async (req, res) => {
        const userId = req.params.userId
        const User = await Bumps.findOne({ userId: userId })
        if (!User) {
            res.json({ success: false, reason: 'No User in Database' })
        } else {
            res.json({ success: true, user: User })
        }
    })

    app.post('/bumps/create', async (req, res) => {
        const { userId, bumps } = req.body
        const User = await Bumps.create({ userId, bumps })
        res.json({ success: true, user: User })
    })

    app.get('/casino/:userId', async (req, res) => {
        const userId = req.params.userId
        const User = await Casino.findOne({ user: userId })
        if (!User) {
            res.json({ success: false, reason: 'No User in Database' })
        } else {
            res.json({ success: true, user: User })
        }
    })

    app.post('/casino/create', async (req, res) => {
        const { user, wallet, bank, inventory } = req.body
        const User = await Casino.create({ user, wallet, bank, inventory })
        res.json({ success: true, user: User })
    })

    app.get('/warns/:userId', async (req, res) => {
        const userId = req.params.userId
        const User = await Warns.findOne({ userId: userId })
        if (!User) {
            res.json({ success: false, reason: 'No User in Database' })
        } else {
            res.json({ success: true, user: User })
        }
    })

    app.post('/warns/create', async (req, res) => {
        const { userId, warns } = req.body
        const User = await Warns.create({ userId, warns })
        res.json({ success: true, user: User })
    })

    app.get('/api/download/:url', async (req, res) => {
        const url = req.params.url
        if (!url) {
            res.json({ success: false, reason: 'No URL' })
        }
        try {
            const info = await ytdl.getInfo(url)
            const title = info.videoDetails.title

            res.header('Content-Disposition', `attachment; filename="${title}.mp4"`)
            ytdl(url, {quality: 'highest'}).pipe(res)
        } catch(e) {
            console.log('Fehler beim herunterladen:', e.message)
            res.status(500).send(`Error: ${e.message}`)
        }
    })

    app.listen(port, () => {
        console.log(`Backend is running on port ${port}.`)
    })
}

export default startServer