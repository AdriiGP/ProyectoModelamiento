// app/services/authService.ts
// 1. Definimos cómo se ve un objeto Usuario usando TypeScript
interface User {
  id: number
  name: string
  email: string
  password: string // En un proyecto real, esto sería un hash, no texto plano.
  role: "cliente" | "tecnico" | "operador" // Usamos tipos literales para evitar errores
}

// Actualizar los datos de usuario para incluir a Carlos:
const fakeUsers: User[] = [
  {
    id: 1,
    name: "Katherine Mendez",
    email: "cliente@test.com",
    password: "123",
    role: "cliente",
  },
  {
    id: 2,
    name: "Amy Baque",
    email: "tecnico@test.com",
    password: "123",
    role: "tecnico",
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    email: "carlos@test.com",
    password: "123",
    role: "tecnico",
  },
  {
    id: 4,
    name: "Adrián Gavilanes",
    email: "operador@test.com",
    password: "123",
    role: "operador",
  },
]

// 3. Creamos las funciones que simulan la interacción con el backend
export const authService = {
  // Función para simular el inicio de sesión
  login(email: string, password: string): Promise<User> {
    console.log(`Intentando iniciar sesión con: ${email}`)

    // Buscamos al usuario en nuestra lista falsa
    const user = fakeUsers.find((u) => u.email === email && u.password === password)

    // Simulamos el retraso de una llamada a la red
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user) {
          console.log("Usuario encontrado:", user)
          // Si lo encontramos, guardamos sus datos en el localStorage del navegador
          localStorage.setItem("user", JSON.stringify(user))
          resolve(user) // Devolvemos el usuario si el login es exitoso
        } else {
          console.error("Credenciales incorrectas")
          reject(new Error("Correo o contraseña incorrectos")) // Devolvemos un error si falla
        }
      }, 50) // 50ms de retraso
    })
  },

  // Función para cerrar sesión
  logout(): void {
    // Simplemente borramos los datos del usuario del localStorage
    localStorage.removeItem("user")
    console.log("Sesión cerrada")
  },

  // Función para obtener el usuario actualmente "logueado"
  getCurrentUser(): User | null {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user")
      if (userStr) {
        // Usamos JSON.parse para convertir el texto de vuelta a un objeto
        return JSON.parse(userStr)
      }
    }
    return null
  },
}
