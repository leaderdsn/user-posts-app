export const getUsers = ():Promise<string[]> => {
    return fetch("https://gorest.co.in/public-api/users")
    .then(res => res.json())
}