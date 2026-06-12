import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '@/app/store/index.ts'

async function enableMocking() {
  if (import.meta.env.MODE !== "development") return;
  const { worker } = await import("./mocks/browser");
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
});