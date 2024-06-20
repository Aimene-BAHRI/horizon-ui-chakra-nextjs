'use client'
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from 'contexts/AuthContext';
import theme from '../theme/theme';
import "styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <ChakraProvider theme={theme}>
    <AuthProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </AuthProvider>
  </ChakraProvider>
      </body>
    </html>
  );
}
