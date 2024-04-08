import { useContext } from "react";
import { useGetActivityByBoardIdQuery } from "../../api/api";
import { ActivityList } from "../activity/ActivityList";
import { Aside } from "../ui/Aside";
import { HistoryContext } from "../../context/history/HistoryContext";
import { Sidebar } from "../ui/Sidebar";
import { MobileContext } from "../../context/mobile/MobileContext";

type Props = {
  boardId: number;
};

export const BoardHistory = ({ boardId }: Props) => {
  const { isMobile } = useContext(MobileContext);
  const { visible, closeHistory } = useContext(HistoryContext);
  const { data: activity } = useGetActivityByBoardIdQuery(boardId, {
    skip: !visible,
  });
  return (
    <>
      {visible ? (
        isMobile ? (
          <Sidebar onClose={closeHistory} visible={visible} title="History">
            <ActivityList activity={activity!} />
          </Sidebar>
        ) : (
          <Aside
            onClose={closeHistory}
            visible={visible}
            title="History"
            className="min-h-screen h-full"
          >
            <ActivityList activity={activity!} />
          </Aside>
        )
      ) : null}
    </>
  );
};
