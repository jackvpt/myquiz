// 📁 CSS imports
import "./styles/_index.scss"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import App from "./App.jsx"
import { Provider } from "react-redux"
import { persistor, store } from "./store/store.js"
import { BrowserRouter } from "react-router-dom"
import { NotificationProvider } from "./hooks/useNotification.jsx"
import { PersistGate } from "redux-persist/integration/react"

/**
 * Initializes a new QueryClient instance for React Query.
 *
 * This client manages all queries and mutations in the app.
 * - `refetchOnWindowFocus`: Automatically refetch queries when the window is focused.
 * - `refetchOnReconnect`: Refetch when the network reconnects.
 * - `refetchOnMount`: Refetch queries when a component mounts.
 * - `staleTime`: Time in milliseconds before cached data is considered stale (1 minute here).
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
      staleTime: 600000, // Data is fresh for 10 minute
    },
  },
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NotificationProvider autoHideDuration={4000}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </NotificationProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
