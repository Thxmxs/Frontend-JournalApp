import { AppRouter } from "./router/AppRouter";
import { store } from "./store/store";
import { AppTheme } from "./theme/AppTheme";
import { Provider } from 'react-redux'
export const JournalApp = () => {
  return (
    <AppTheme>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </AppTheme>
  );
};
