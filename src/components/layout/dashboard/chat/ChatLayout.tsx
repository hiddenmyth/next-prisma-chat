'use client'

import { ReactNode, useEffect } from "react";
import ChatSidebarComponent from "./ChatSidebar";
import { useParams } from "next/navigation";
import { useChatStore } from "@/hooks/use-chat";

export default function ChatLayoutComponent (props:{children:ReactNode}) {
  
  const pathParams = useParams();

  const {setCurrentChatId} = useChatStore();

  useEffect(() => {
    if (pathParams.id) {
      setCurrentChatId(pathParams.id as string);
    } else {
      setCurrentChatId(undefined);
    }
  }, [pathParams, setCurrentChatId])

  return (
    <div className="flex flex-1 w-full relative overflow-hidden">
      <ChatSidebarComponent />
      {props.children}
    </div>
  );
}
