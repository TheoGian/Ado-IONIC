type LoginPayload = { email: string; password: string };

export async function login({ email, password }: LoginPayload) {
  await new Promise((r) => setTimeout(r, 900));

  if (email.toLowerCase() === 'demo@exemplo.com' && password === '123456') {
    return { token: 'fake-jwt-token', name: 'Usuário Demo' };
  }

  throw new Error('Credenciais inválidas');
}

export function saveSession(token: string, name: string) {
  localStorage.setItem('token', token);
  localStorage.setItem('userName', name);
}