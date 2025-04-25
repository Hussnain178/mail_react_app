import React from "react";
import Adminpanel from "./components/Adminpanel";
import UserPanel from "./components/UserPanel";

export default function Home() {
  const Message = localStorage.getItem("Message");

  let content;

  if (Message === "admin") {
    content = <Adminpanel />;
  } else if ( Message === "agent") {
    content = <UserPanel />;
  } else {
    content = <div> unknown role.</div>;
  }

  return (
    <div>
      {content}
    </div>
  );
}
