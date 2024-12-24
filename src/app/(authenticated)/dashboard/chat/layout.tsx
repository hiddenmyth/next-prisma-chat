import ChatLayoutComponent from "@/components/layout/dashboard/chat/ChatLayout";
import { ReactNode } from "react";

export default function ChatLayout(props:{children:ReactNode}) {
  return (
    <ChatLayoutComponent>
      {props.children}
    </ChatLayoutComponent>
  );
}
