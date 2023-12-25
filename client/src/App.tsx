import React, { useEffect } from "react";
import PageTitle from "./components/PageTitle";
import style from "./styles/modules/app.module.scss";
import Header from "./components/Header";
import AppContent from "./components/AppContent";
import { Toaster } from "react-hot-toast";

function App() {
  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/todos`);
      const jsonResponse = response.json();
      console.log(jsonResponse);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
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
