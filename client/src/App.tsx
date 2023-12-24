import React from "react";
import PageTitle from "./components/PageTitle";
import style from "./styles/modules/app.module.scss";
import Header from "./components/Header";
import AppContent from "./components/AppContent";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <main className="container">
        <PageTitle>Task List</PageTitle>
        <div className={style.app__wrapper}>
          <Header />
          <AppContent />
        </div>
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </>
  );
}

export default App;
