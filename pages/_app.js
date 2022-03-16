import '../styles/globals.css'
import { NotificationsProvider } from '@mantine/notifications'

function MyApp({ Component, pageProps }) {
  return (
    <NotificationsProvider>
      <Component {...pageProps} />
    </NotificationsProvider>
  )
}

export default MyApp
