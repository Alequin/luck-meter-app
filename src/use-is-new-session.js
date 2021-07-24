import Constants from "expo-constants";
import { useEffect, useState } from "react";
import * as asyncStorage from "./async-storage";

export const useIsNewSession = () => {
  const [hasLoadedSession, setHasLoadedSession] = useState(false);
  const [sessionId, setSessionId] = useState(false);
  const [isNewSession, setIsNewSession] = useState(false);

  useEffect(() => {
    let hasUnmounted = false;
    asyncStorage.sessionId.read().then((recordedSessionId) => {
      if (hasUnmounted) return;
      const currentSessionId = Constants.sessionId;
      const isNewSession = currentSessionId !== recordedSessionId;

      if (isNewSession) asyncStorage.sessionId.save(currentSessionId);

      setIsNewSession(isNewSession);
      setSessionId(currentSessionId);
      setHasLoadedSession(true);
    });
    return () => (hasUnmounted = true);
  }, []);

  return { sessionId, isNewSession, hasLoadedSession };
};
