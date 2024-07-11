import Main from "pages/main/Main";
import { TableProvider } from "providers/tableProvider";

import "./styles/style.sass";

function App() {
  return (
    <div className="App">
      <TableProvider>
        <Main />
      </TableProvider>
    </div>
  );
}

export default App;
