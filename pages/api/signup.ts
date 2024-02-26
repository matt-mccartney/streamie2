import { NextApiRequest, NextApiResponse } from 'next';
import { UserCredential, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/library/firebaseConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userData: UserCredential["user"] = userCredential.user;
    return res.status(200).json({ success: true, user: userData.toJSON() });
  } catch (error: any) {
    console.error('Error signing up:', error.message);
    return res.status(500).json({ "error": error.message });
  }
}
