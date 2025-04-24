import React from "react";
import Adminpanel from "./components/Adminpanel";
import UserPanel from "./components/UserPanel";

export default function Home() {
  const Message = localStorage.getItem("Message");

  let content;

  if (Message === "admin") {
    content = <Adminpanel />;
  } else if (Message === "user" || Message === "Agent") {
    content = <UserPanel />;
  } else {
    content = <div>Unauthorized or unknown role.</div>;
  }

  return (
    <div>
      {content}
    </div>
  );
}
