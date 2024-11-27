'use client';

import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  function handleClick(){
    router.push('/dashboard')
  }
  
  return (
    <div style={{textAlign:'center', paddingTop:'50px', background:'#FFEBCD', height:'100vh'}}>
      <h1 >Welcome to My Application!</h1>
      <button style={{backgroundColor: 'black',color: 'white',borderRadius: '0.5rem', marginTop: '2rem', padding: '0.75rem 1rem', transition: 'background-color 0.2s'}} 
              onClick={handleClick}>View Dashboard</button>
   </div>
  );
}
