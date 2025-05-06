import { Provider } from "react-redux";
import tableStore from "store/tableStore";

import Main from "pages/main/Main";

import "./styles/style.sass";

function App() {

  return (
    <div className="App">
      <Provider store={tableStore}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;
