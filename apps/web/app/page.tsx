import {prisma} from '@repo/db/db'

export default async function Home() {
  if (process.env.SKIP_BUILD_DB === "true") {
    return { props: { users: [] } } // return empty placeholder
  }
  const user=await prisma.user.findMany()
  console.log(user)
  if(user){
     return <div>
    the users are:
    {JSON.stringify(user)}
  </div>
  }
 
}


//export const dynamic = 'force-dynamic'
//export const revalidate=60