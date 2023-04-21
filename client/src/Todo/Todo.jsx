import { useEffect, useState } from "react";
import axios from "axios";
function Todo() {
  const [addtodo, setaddtodo] = useState();
  const [progress, setprogress] = useState();
  const [from, setfrom] = useState();
  const [to, setto] = useState();
  const [Id, setId] = useState();

  async function addtoTodo(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/server/addtodo",
        { addtodo, progress: "todo" }
      );
      if (response.status === 200) {
        getlist();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getlist() {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/server/addtodo"
      );
      setprogress(response.data.list);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteitem(id) {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/server/addtodo/${id}`
      );
      if (response.status === 200) {
        getlist();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updateItem() {
    if (to !== from) {
      try {
        const response = await axios.patch(
          `http://localhost:4000/api/server/addtodo/${Id}/${to}`
        );
        if (response.status === 200) {
          getlist();
          setId(undefined);
          setto(undefined);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function updateStrike(e, id) {
    let check = e.target.checked;
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/server/update/${id}/${check}`
      );
      if (response.status === 200) {
        getlist();
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getlist();
  }, []);

  const dragstarted = (e, id) => {
    e.dataTransfer.setData("todoId", id);
  };

  const dragginover = (e) => {
    e.preventDefault();
  };

  const dragdropped = (e) => {
    setId(e.dataTransfer.getData("todoId"));
  };
  useEffect(() => {
    if (Id && to) {
      updateItem();
    }
    // eslint-disable-next-line
  }, [Id, to]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center text-5xl py-8">
          <h1>TODO LIST</h1>
        </div>
        <div className="flex justify-center items-center">
          <form
            onSubmit={(e) => addtoTodo(e)}
            className="py-6 my-4 border-black border-2 px-6 flex gap-4 "
          >
            <label htmlFor="todo">Add Task</label>
            <input
              className="border-black border-2 px-2"
              onChange={(e) => setaddtodo(e.target.value)}
              type="text"
              name="todo"
              id="todo"
            />
            <div className="cursor-pointer">
            <input type="submit"></input></div>
          </form>
        </div>
        <div className="flex gap-8 py-14 mx-4">
          <div
            className="h-auto flex-1 border border-black"
            data-droppable
            onDragOver={(e) => dragginover(e)}
            onDrop={(e) => {
              setto("todo");
              dragdropped(e);
            }}
          >
            <h1 className="text-3xl flex justify-center pt-3">Todo</h1>
            <div className="h-auto w-full flex flex-col gap-4 px-4 py-6">
              {progress
                ? progress.map((item, index) => {
                    if (item.progress === "todo") {
                      return (
                        <div
                          data-attri="todo"
                          style={
                            item.check
                              ? { textDecoration: "line-through" }
                              : { textDecoration: "none" }
                          }
                          draggable
                          onDragStart={(e) => {
                            dragstarted(e, item._id);
                            setfrom(e.target.getAttribute("data-attri"));
                          }}
                          className="p-4 border border-red-500 flex flex-row justify-between"
                          key={index}
                        >
                          <h2>{item.message}</h2>
                          <div className="flex flex-row gap-2 items-center justify-center">
                            <button onClick={(e) => deleteitem(item._id)}>
                              Delete
                            </button>
                            <input
                              type="checkbox"
                              checked={item.check}
                              onChange={(e) => {
                                updateStrike(e, item._id);
                                const itemIndex = progress.findIndex(
                                  (pro) => pro._id === item._id
                                );
                                progress[itemIndex].check =
                                  !progress[itemIndex].check;
                                setprogress([...progress]);
                              }}
                            />
                          </div>
                        </div>
                      );
                    }
                    return null; // Render nothing if progress.progress is not "todo"
                  })
                : ""}
            </div>
          </div>
          <div
            data-droppable
            onDragOver={(e) => dragginover(e)}
            onDrop={(e) => {
              setto("doing");
              dragdropped(e);
            }}
            className="h-auto flex-1 border border-black"
          >
            <h1 className="text-3xl flex justify-center pt-3">Ongoing</h1>
            <div className="h-auto w-full flex flex-col gap-4 px-4 py-6">
              {progress
                ? progress.map((item, index) => {
                    if (item.progress === "doing") {
                      return (
                        <div
                          data-attri="doing"
                          style={
                            item.check
                              ? { textDecoration: "line-through" }
                              : { textDecoration: "none" }
                          }
                          draggable
                          onDragStart={(e) => {
                            dragstarted(e, item._id);
                            setfrom(e.target.getAttribute("data-attri"));
                          }}
                          className="p-4 border border-red-500 flex flex-row justify-between"
                          key={index}
                        >
                          <h2 className="flex flex-row gap-2 items-center justify-center">
                            {item.message}
                          </h2>{" "}
                          <div>
                          <button onClick={(e) => deleteitem(item._id)}>
                            Delete
                          </button>{" "}
                          <input
                            type="checkbox"
                            checked={item.check}
                            onChange={(e) => {
                              updateStrike(e, item._id);
                              const itemIndex = progress.findIndex(
                                (pro) => pro._id === item._id
                              );
                              progress[itemIndex].check =
                                !progress[itemIndex].check;
                              setprogress([...progress]);
                            }}
                          />
                          </div>
                        </div>
                      );
                    }
                    return null; // Render nothing if progress.progress is not "doning"
                  })
                : ""}
            </div>
          </div>
          <div
            data-droppable
            onDragOver={(e) => dragginover(e)}
            onDrop={(e) => {
              setto("done");
              dragdropped(e);
            }}
            className="h-auto flex-1 border border-black"
          >
            <h1 className="text-3xl flex justify-center pt-3">Completed</h1>
            <div className="h-auto w-full flex flex-col gap-4 px-4 py-6">
              {progress
                ? progress.map((item, index) => {
                    if (item.progress === "done") {
                      return (
                        <div
                          data-attri="done"
                          style={
                            item.check
                              ? { textDecoration: "line-through" }
                              : { textDecoration: "none" }
                          }
                          draggable
                          onDragStart={(e) => {
                            dragstarted(e, item._id);
                            setfrom(e.target.getAttribute("data-attri"));
                          }}
                          className="p-4 border border-red-500 flex flex-row justify-between"
                          key={index}
                        >
                          <h2 className="flex flex-row gap-2 items-center justify-center">
                            {item.message}
                          </h2>
                          <div>
                            <button onClick={(e) => deleteitem(item._id)}>
                              Delete
                            </button>
                            <input
                              type="checkbox"
                              checked={item.check}
                              onChange={(e) => {
                                updateStrike(e, item._id);
                                const itemIndex = progress.findIndex(
                                  (pro) => pro._id === item._id
                                );
                                progress[itemIndex].check =
                                  !progress[itemIndex].check;
                                setprogress([...progress]);
                              }}
                            />
                          </div>
                        </div>
                      );
                    }
                    return null; // Render nothing if progress.progress is not "done"
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
