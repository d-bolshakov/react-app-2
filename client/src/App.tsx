import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { BoardPage } from "./pages/BoardPage";
import { ModalProvider } from "./context/modal/ModalContextProvider";
import { MobileContextProvider } from "./context/mobile/MobileContextProvider";

function App() {
  return (
    <MobileContextProvider>
      <ModalProvider>
        <BoardPage />
      </ModalProvider>
    </MobileContextProvider>
  );
}

export default App;
