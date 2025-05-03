const API = import.meta.env.VITE_BACKEND_URL;

export async function registrarUsuario(usuario) {
  const response = await fetch(`${API}/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });

  if (!response.ok) throw new Error("Error al registrar usuario");

  return await response.json();
}
