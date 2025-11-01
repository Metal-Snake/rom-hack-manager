import { UnlistenFn, listen } from "@tauri-apps/api/event";
import { useEffect } from "react";

const useListenEvent = (name: string, onEvent: (payload: unknown) => void) => {
  useEffect(() => {
    const unlistenRef: { current: UnlistenFn } = { current: () => {} };

    listen(name, (event) => {
      onEvent(event.payload);
    }).then((unlisten) => {
      unlistenRef.current = unlisten;
    });

    return () => unlistenRef.current();
  }, [name, onEvent]);
};

export default useListenEvent;
