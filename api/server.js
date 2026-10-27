import express from 'express'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const app = express()
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data')
const CONTACT_FILE = path.join(DATA_DIR, 'messages.json')
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json')

app.use(express.json({ limit: '32kb' }))

async function appendRecord(file, record) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  let rows = []
  try {
    rows = JSON.parse(await fs.readFile(file, 'utf8'))
  } catch {
    rows = []
  }
  rows.push(record)
  await fs.writeFile(file, JSON.stringify(rows, null, 2))
  return rows.length
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

app.get('/health', (_req, res) => res.json({ ok: true }))

app.post('/api/contact', async (req, res) => {
  const name = String(req.body?.name ?? '').trim()
  const email = String(req.body?.email ?? '').trim()
  const service = String(req.body?.service ?? '').trim()
  const message = String(req.body?.message ?? '').trim()

  const errors = {}
  if (name.length < 2) errors.name = 'نام را کامل وارد کنید.'
  if (!EMAIL_RE.test(email)) errors.email = 'ایمیل معتبر نیست.'
  if (message.length < 10) errors.message = 'توضیحات باید حداقل ۱۰ کاراکتر باشد.'
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ ok: false, errors })
  }

  try {
    await appendRecord(CONTACT_FILE, {
      name,
      email,
      service,
      message,
      createdAt: new Date().toISOString(),
    })
    return res.status(201).json({ ok: true })
  } catch (error) {
    console.error('contact save failed', error)
    return res.status(500).json({ ok: false, error: 'ذخیره درخواست ممکن نشد.' })
  }
})

app.post('/api/subscribe', async (req, res) => {
  const email = String(req.body?.email ?? '').trim()
  if (!EMAIL_RE.test(email)) {
    return res.status(422).json({ ok: false, errors: { email: 'ایمیل معتبر نیست.' } })
  }
  try {
    await appendRecord(SUBSCRIBERS_FILE, { email, createdAt: new Date().toISOString() })
    return res.status(201).json({ ok: true })
  } catch (error) {
    console.error('subscribe save failed', error)
    return res.status(500).json({ ok: false, error: 'ثبت ایمیل ممکن نشد.' })
  }
})

const PORT = Number(process.env.PORT) || 8080
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Lumyla API listening on ${PORT}`)
})
