import express from 'express'
import Bumps from '../Schemas/bumps'
import Casino from '../Schemas/casino'
import Warns from '../Schemas/warns'
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

    app.listen(port, '0.0.0.0', () => {
        console.log(`Backend is running on port ${port}.`)
    })
}

export default startServer