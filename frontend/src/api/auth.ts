import axios from 'axios'

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
    {
      email,
      password,
    },
  )
  return response.data
}
