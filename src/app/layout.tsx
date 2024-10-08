"use client";
import { ThemeProvider } from "@emotion/react";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "./../theme";
import Navbar from "./_components/Navbar/page";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Box sx={{ pt: 10 }}>
                <Navbar />
                {children}

                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                  // transition: Bounce: true
                />
              </Box>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
}
