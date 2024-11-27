import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',  // Permite carregar qualquer imagem do Google
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',  // Domínio do GitHub para imagens de perfil
        pathname: '/**',  // Permite carregar qualquer imagem do GitHub
      },
    ],
  },
};

export default nextConfig;
