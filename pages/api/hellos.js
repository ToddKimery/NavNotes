export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello from Next.js!' })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
