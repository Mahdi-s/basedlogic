export default async function CreateUser(credentials){

      console.log(credentials);
      const response = await fetch('/api/register',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
          }),
      });

      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        const errorData = await response.text();
        console.error(errorData);
        return null;
      }
      return response;
}