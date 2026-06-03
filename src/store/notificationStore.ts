import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface NotificationState {
  unreadCount: number;
}

export const useNotificationStore = create<NotificationState>()(
  devtools(
    (): NotificationState => ({
      unreadCount: 0,
    }),
    { name: "NotificationStore" }
  )
);

/**
 * Notification Actions (Static Reference)
 * 
 * Separates mutating actions from reactive hook selections to prevent infinite re-renders.
 */
export const notificationActions = {
  increment: () =>
    useNotificationStore.setState((state) => ({
      unreadCount: state.unreadCount + 1,
    })),
  reset: () => useNotificationStore.setState({ unreadCount: 0 }),
};

// Custom selector hooks for granular re-rendering performance
export const useUnreadCount = () => useNotificationStore((state) => state.unreadCount);
export const useNotificationActions = () => notificationActions;
