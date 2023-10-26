import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

function Todo() {
  const [addtodo, setaddtodo] = useState("");
  const [progress, setprogress] = useState([]);
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [Id, setId] = useState("");
  const [editText, setEditText] = useState("");

  async function addtoTodo(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/server/addtodo",
        { addtodo, progress: "todo" }
      );
      if (response.status === 200) {
        getlist();
        setaddtodo("");
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
          setId("");
          setto("");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function updateStrike(e, id) {
    const check = e.target.checked;
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

  const editItem = (id, text) => {
    setId(id);
    setEditText(text);
  };

  async function saveEditedItem() {
    if (editText) {
      try {
        const response = await axios.patch(
          `http://localhost:4000/api/server/addtodo/${Id}/${editText}`
        );
        if (response.status === 200) {
          getlist();
          setId("");
          setEditText("");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  useEffect(() => {
    getlist();
  }, []);

  const dragstarted = (e, id) => {
    e.dataTransfer.setData("todoId", id);
  };

  const dragover = (e) => {
    e.preventDefault();
  };

  const dragdropped = (e) => {
    setId(e.dataTransfer.getData("todoId"));
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-4">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-semibold text-center py-8">CRUD APP</h1>

        <div className="bg-gray-800 rounded-lg shadow-md p-4">
          <form
            onSubmit={(e) => addtoTodo(e)}
            className="flex items-center space-x-4"
          >
            <input
              type="text"
              className="flex-1 p-2 rounded border border-gray-400 text-gray-800 focus:outline-none focus:border-blue-500"
              placeholder="Add a new task"
              value={addtodo}
              onChange={(e) => setaddtodo(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 text-gray-200 bg-gray-600 rounded hover:bg-gray-700 transition duration-300"
            >
              Add
            </button>
          </form>

          <div className="mt-8 space-y-4">
            {progress.map((item) => {
              if (item.progress === "todo") {
                return (
                  <div
                    key={item._id}
                    draggable
                    onDragStart={(e) => {
                      dragstarted(e, item._id);
                      setfrom("todo");
                    }}
                    className={`p-4 border border-gray-400 rounded ${
                      item.check ? "line-through" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {Id === item._id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={handleEditChange}
                        />
                      ) : (
                        <h2 className="text-xl text-white">
                          {item.message}
                        </h2>
                      )}
                      <div className="flex items-center space-x-2">
                        {Id === item._id ? (
                          <button
                            onClick={saveEditedItem}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <FontAwesomeIcon icon={faSave} />
                          </button>
                        ) : (
                          <>
                            
                            <button
                              className="text-red-600 hover:text-red-700"
                              onClick={() => deleteitem(item._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button
                              onClick={() => editItem(item._id, item.message)}
                              className="text-blue-500 hover:text-blue-600"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
