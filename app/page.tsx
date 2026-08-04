import { redirect } from 'next/navigation';

export default function Home() {
  // App load hote hi user ko seedha dashboard par bhej dega
  redirect('/dashboard');
}