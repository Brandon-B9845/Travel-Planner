export default async function handler(req: any, res: any) {
  const data = await fetch(process.env.NEXT_PUBLIC_AWS_API_SIGNUP_LINK as any)
  console.log('right here')
  console.log(await data.json())
  await res.status(200).send(JSON.stringify(data))
}
