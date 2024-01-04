export const logError = async (error) => {
  return await fetch('https://in.logs.betterstack.com/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 83Vp72fFG7bNogSesePfTw2u`,
    },
    body: JSON.stringify(error),
  })
}

export const logMessage = async (msg) => {
  return await fetch('https://in.logs.betterstack.com/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 83Vp72fFG7bNogSesePfTw2u`,
    },
    body: JSON.stringify({ msg: msg }),
  })
}