import { useState } from "react";

import { TableProvider } from "providers/tableProvider";
import Main from "pages/main/Main";
import ColorSelector from "components/color-selector/ColorSelector";

import "./styles/style.sass";

function App() {

  const [value, setValue] = useState("black");

  return (
    <div className="App">
      <TableProvider>
        {/* <Main /> */}
        <ColorSelector
          value={value}
          setValue={setValue}
        />
      </TableProvider>
    </div>
  );
}

export default App;
