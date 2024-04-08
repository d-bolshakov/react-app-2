import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { BoardPage } from "./pages/BoardPage";
import { ModalProvider } from "./context/modal/ModalContextProvider";
import { SidebarProvider } from "./context/sidebar.tsx/SidebarContextProvide";
import { MobileContextProvider } from "./context/mobile/MobileContextProvider";

function App() {
  // const [boardsListVisible, setBoardsListVisible] = useState(false);
  // const [createBoardModal, setCreateBoardModal] = useState(false);
  // const [boardId, setBoardId] = useState(null);
  // const { data: boards } = useGetBoardsQuery(null);
  return (
    <>
      {/* <Sidebar
        visible={boardsListVisible}
        title="Boards"
        onClickOutside={() => setBoardsListVisible(false)}
      >
        <Menu>
          {boards?.map((board) => (
            <Menu.Item
              onClick={() => setBoardId(board.id)}
              selected={board.id === boardId}
            >
              {board.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sidebar>
      <div>
        <ButtonPrimary
          className="w-full"
          onClick={() => setBoardsListVisible(true)}
        >
          Open boards list
        </ButtonPrimary>
      </div>
      <div className="p-2">
        {boardId ? (
          <TasksPage boardId={boardId} />
        ) : (
          <div className="w-full h-96 flex items-center justify-center">
            <div className="block border-2 rounded-md shadow-md shadow-gray-500  p-2">
              <h1 className="font-medium text-2xl text-center">
                No board selected
              </h1>
              <ButtonDashed
                onClick={() => setCreateBoardModal(true)}
                className="!w-full !border-gray-500 hover:!bg-gray-300 hover:!border-gray-300"
              >
                <i className="fa-solid fa-plus"></i> Create new board
              </ButtonDashed>
            </div>
          </div>
        )}
      </div>
      <Modal
        openModal={createBoardModal}
        closeModal={() => setCreateBoardModal(false)}
      >
        <CreateBoardForm onSubmitted={() => setCreateBoardModal(false)} />
      </Modal> */}
      <MobileContextProvider>
        <SidebarProvider>
          <ModalProvider>
            <BoardPage />
          </ModalProvider>
        </SidebarProvider>
      </MobileContextProvider>
    </>
  );
}

export default App;
